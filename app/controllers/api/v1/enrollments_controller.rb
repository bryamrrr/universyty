class Api::V1::EnrollmentsController < Api::V1::BaseController
  def find_by_user
    user = User.find_by(nickname: params[:id])
    enrollments = Enrollment.where(user_id: user[:id])
    percentages = Array.new

    enrollments.each do |enrollment|
      course = enrollment.course
      parts = course.parts.order(number: :asc)
      parts_count = course.parts.count
      current_module = enrollment[:current_module]
      counter = 0
      percentage = 0

      parts.each do |part|
        if part[:id] == current_module
          if parts_count == counter + 1
            if enrollment.grades.last && enrollment.grades.last[:score] >= 14
              counter += 1
            end
          end

          break
        end
        counter += 1
      end

      if parts_count != 0
        percentage = counter * 100 / parts_count
      else
        percentage = 0
      end
      percentages.push percentage
    end

    render :json => { :enrollments => enrollments.as_json(:include => {
      :course => {
        :include => {
          :category => {},
          :professors => {},
          :user => {}
        }
      }
      }), :percentages => percentages
    }
  end

  def find_by_course
    course = Course.find(params[:id])
    enrollment = Enrollment.where(user_id: @current_user.id, course_id: course.id).first
    part = Part.find(enrollment[:current_module]) unless enrollment[:current_module].nil?
    video = Topic.find(enrollment[:current_video]) unless enrollment[:current_video].nil?

    render :json => {
      enrollment: enrollment.as_json(:include => {
        :course => {
          :include => {
            :category => {},
            :professors => {},
            :user => {}
          }
        }
      }),
      part: part,
      video: video,
      grades: enrollment.grades
    }
  end

  def update_grade_course
    enrollment = @current_user.enrollments.find_by(course_id: params[:id])

    if enrollment
      score = enrollment.grades.create(part_id: params[:data][:part], score: params[:data][:grade], user_id: @current_user.id, exam: params[:data][:exam])
      render :json => score.to_json
    end
  end

  def repeat_course
    enrollment = @current_user.enrollments.find_by(course_id: params[:id])

    if enrollment
      enrollment.update_column(:current_module, nil)
      enrollment.update_column(:current_video, nil)
      render :json => { message: "Se ha repetido el curso" }
    end
  end

  def next_module
    enrollment = @current_user.enrollments.find_by(course_id: params[:id])
    parts = Part.where(course_id: params[:id]).order(number: :asc)
    current_part = Part.find(enrollment[:current_module])

    if enrollment
      next_module = parts.where('number > ?', current_part[:number]).first unless parts.where('number > ?', current_part[:number]).nil?
      if next_module
        enrollment.update_column(:current_module, next_module[:id])
        video = Topic.where(part_id: next_module[:id], number: 1).first
        enrollment.update_column(:current_video, video[:id])
        topic = Topic.where(part_id: next_module[:id], number: 1).first
        render :json => topic.to_json
      end
    end
  end

  def update
    puts params[:id]
    enrollment = Enrollment.find(params[:id])
    course = enrollment.course

    partSended = Part.find(params[:data][:part_id])

    if enrollment[:current_module].nil?
      partHere = course.parts.find_by(number: 1)
      enrollment.update_column(:current_module, partHere[:id])
    else
      partHere =  Part.find(enrollment[:current_module])
    end

    if partSended[:number] >= partHere[:number]
      enrollment.update_column(:current_module, params[:data][:part_id])
      if enrollment[:current_video].nil?
        first_topic = partHere.topics.find_by(number: 1)
        enrollment.update_column(:current_video, first_topic[:id])
      else
        if params[:data][:topic_id] > enrollment[:current_video]
          enrollment.update_column(:current_video, params[:data][:topic_id])
        end
      end
    end

    part = Part.find(enrollment[:current_module]) unless enrollment[:current_module].nil?
    video = Topic.find(enrollment[:current_video]) unless enrollment[:current_video].nil?
    render :json => {
      enrollment: enrollment.as_json(:include => {
        :course => {
          :include => {
            :category => {},
            :professors => {},
            :user => {}
          }
        }
      }),
      part: part,
      video: video
    }
  end
end
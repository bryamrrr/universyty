class Api::V1::EnrollmentsController < Api::V1::BaseController
  def find_by_user
    user = User.find_by(nickname: params[:id])
    enrollments = Enrollment.where(user_id: user[:id])
    render :json => enrollments.to_json(:include => {
      :course => {
        :include => {
          :category => {},
          :professors => {},
          :user => {}
        }
      }
      })
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
      video: video
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
        topic = Topic.where(part_id: next_module[:id], number: 1)
        render :json => topic.to_json
      end
    end
  end

  def update
    enrollment = Enrollment.find(params[:id])

    partSended = Part.find(params[:data][:part_id])
    partHere = Part.find(enrollment[:current_module])

    if partSended[:number] >= partHere[:number]
      enrollment.update_column(:current_module, params[:data][:part_id])
      if params[:data][:topic_id] > enrollment[:current_video]
        enrollment.update_column(:current_video, params[:data][:topic_id])
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
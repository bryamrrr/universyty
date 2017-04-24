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

      if parts_count != 0
        percentage = current_module / parts_count
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
    enrollment = Enrollment.find_by(user_id: @current_user.id, course_id: course.id)
    enrollment
    part = course.parts.find_by(number: params[:part])
    video = part.topics.find_by(number: params[:topic])
    count = part.topics.count

    if video[:number] == count
      view_exam = true
    else
      view_exam = false
      enrollment.update_column(:current_video, enrollment[:current_video] + 1)
    end

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
      grades: enrollment.grades,
      view_exam: view_exam
    }
  end

  def find_completed
    enrollments = @current_user.enrollments.where(finished: true).order(created_at: :desc)
    render :json => enrollments.as_json(
      :include => {
        :course => {}
      }
    )
  end

  def update_grade_course
    enrollment = @current_user.enrollments.find_by(course_id: params[:id])

    if enrollment
      part = Part.find(params[:data][:part])
      number = part[:number] + 1

      score = enrollment.grades.create(part_id: params[:data][:part], score: params[:data][:grade], user_id: @current_user.id, exam: params[:data][:exam])

      unless enrollment.course.parts.find_by(number: number)
        enrollment.update_column(:finished, true)
        enrollment.calcGrade()
      end

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

    if enrollment
      next_module = enrollment.course.parts.find_by(number: enrollment[:current_module] + 1)
      if next_module
        enrollment.update_column(:current_module, enrollment[:current_module] + 1)
        enrollment.update_column(:current_video, 1)
        part = enrollment.course.parts.find_by(number: enrollment[:current_module])
        topic = part.topics.find_by(number: 1)
        render :json => {
          part_number: part[:number],
          topic_number: topic[:number]
        }
      end
    end
  end

  # LEGACY METHOD
  def update
    enrollment = Enrollment.find(params[:id])
    course = enrollment.course

    if enrollment[:current_module] == params[:data][:part_id] && enrollment[:current_video] >= params[:data][:topic_id] - 1 && !params[:data][:view_exam]
      enrollment.increment(:current_video)
      puts "SE IMCREMENTÒ EL VIDEO"
      part = course.parts.find_by(number: enrollment[:current_module])
      video = part.topics.find_by(number: enrollment[:current_video])
      count = part.topics.count

      if video[:number] == count
        view_exam = true
      else
        view_exam = false
      end

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
        grades: enrollment.grades,
        view_exam: view_exam
      }
    else
      puts "NO SE INCREMENTÓ EL VIDEO"
      render :json => { :message => "No se realizó ningún cambio" }, status: :ok
    end
  end

  def free
    course = Course.find(params[:id])
    enrollment = Enrollment.find_by(course_id: course[:id], user_id: @current_user[:id])

    if course[:free] && enrollment.nil?
      @current_user.enrollments.create(course_id: params[:id])
      render :json => { message: "Curso agregado a Mis Cursos" }, status: :ok
    else
      render :json => { errors: "Ya tienes este curso" }
    end
  end

  def request_certificate
    enrollment = Enrollment.find(params[:id])
    enrollment.update_column(:certificate_requested, true)
    render :json => { :message => "Pedido realizado" }, status: :ok
  end

  def certificates_requested
    enrollments = Enrollment.where(finished: true, certificate_requested: true).order(created_at: :desc)
    render :json => enrollments.as_json(
      :include => {
        :course => {},
        :user => {}
      }
    )
  end

  def update_certificate
    enrollment = Enrollment.find(params[:id])
    enrollment.update_column(:certificate_url, params[:data][:certificate_url])
    render :json => { :message => "Certificado actualizado" }, status: :ok
  end
end
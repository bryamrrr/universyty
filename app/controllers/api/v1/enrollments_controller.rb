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
    enrollments = Enrollment.where(user_id: @current_user.id, course_id: course.id).first
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
end
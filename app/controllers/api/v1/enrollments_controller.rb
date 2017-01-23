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
end
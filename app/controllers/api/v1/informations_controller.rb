class Api::V1::InformationsController < Api::V1::BaseController
  def show_welcome_image
    data = Information.find_by(title: 'welcome_image')
    courses = Course.where(published: true)
    render :json => {
      :courses => courses,
      :image => data
    }
  end

  def update_welcome_image
    data = Information.find_by(title: 'welcome_image')
    if data.update(information_params)
      render :json => { :message => "Datos actualizados" }
    else
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

  private
  def information_params
    params.require(:data).permit(
      :title,
      :content,
      :background_url,
      :link_url
    )
  end
end
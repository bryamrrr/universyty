class Api::V1::PartsController < Api::V1::BaseController
  def show
    part = Part.find(params[:id])
    render :json => part.to_json(:include => {
      :topics => {}
      })
  end

  def create
    part = Part.new(part_params)

    if part.save
      render :json => { :message => "Módulo creado" }
    else
      render :json => { :message => "No se pudo crear el módulo" }, status: :bad_request
    end
  end

   def destroy
    part = Part.find(params[:id])

    part.destroy
    render :json => { :message => "Módulo eliminado" }
  end

  def topics
    topics = Topic.where(part_id: params[:id]).order(number: :asc)
    part = Part.find(params[:id])
    course = Course.find(part[:course_id])

    render :json => { :topics => topics, :part => part, :course => course }
  end

  def part_params
    params.require(:data).permit(
      :title,
      :number,
      :course_id
    )
  end
end
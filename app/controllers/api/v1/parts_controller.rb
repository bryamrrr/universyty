class Api::V1::PartsController < Api::V1::BaseController
  def show
    part = Part.find(params[:id])
    render :json => part.to_json(:include => {
      :topics => {
        :include => {
          :auditions => {},
          :chats => {},
          :memorizations => {},
          :transcriptions => {}
        }
      }
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

  def questions
    questions = Question.where(part_id: params[:id]).order(created_at: :asc)
    part = Part.find(params[:id])
    course = Course.find(part[:course_id])

    render :json => { :questions => questions, :part => part, :course => course }
  end

  def update
    part = Part.find(params[:id])

    if part.update(part_params)
      render :json => { :message => "Módulo actualizado" }
    else
      render :json => { :message => "No se pudo actualizar el módulo" }, status: :bad_request
    end
  end

  def part_params
    params.require(:data).permit(
      :title,
      :number,
      :course_id
    )
  end
end
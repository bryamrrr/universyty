class Api::V1::TopicsController < Api::V1::BaseController

  def show
    topic = Topic.find(params[:id])
    render :json => topic.to_json()
  end

  def create
    topic = Topic.new(topic_params)

    if topic.save
      render :json => { :message => "Tema creado" }
    else
      render :json => { :message => "No se pudo crear el tema" }, status: :bad_request
    end
  end

  def update
    topic = Topic.find(params[:id])

    if topic.update(topic_params)
      render :json => { :message => "Tema actualizado" }
    else
      render :json => { :message => "No se pudo actualizar el tema" }, status: :bad_request
    end
  end

  def destroy
    topic = Topic.find(params[:id])

    topic.destroy
    render :json => { :message => "Tema eliminado" }
  end

  def topic_params
    params.require(:data).permit(
      :title,
      :video_url,
      :number,
      :part_id
    )
  end
end
class Api::V1::TopicsController < Api::V1::BaseController

  def show
    topic = Topic.find(params[:id])
    render :json => topic.to_json()
  end

  def create
    data = params[:data]
    topic = Topic.new(
      title: data[:title],
      video_url: data[:video_url],
      number: data[:number],
      duration: data[:duration],
      part_id: data[:part_id]
    )

    if topic.save
      if data[:video_url].nil? or data[:video_url] == ""
        topic.auditions.create(
          audio: data[:audition],
          topic_id: topic.id
        )

        chats = data[:chats]
        chats.each do |chat|
          if !chat[:description].nil?
            !chat[:url].nil? and
            !chat[:translate].nil? and
            !chat[:fonetica].nil?
            topic.chats.create(
              description: chat[:description],
              translate: chat[:translate],
              fonetica: chat[:fonetica],
              audio: chat[:url],
              topic_id: topic.id
            )
          end
        end

        memorization = data[:memorization]
        topic.memorizations.create(
          description: memorization[:description],
          translate: memorization[:translate],
          fonetica: memorization[:fonetica],
          audio: memorization[:url],
          topic_id: topic.id
        )

        transcription = data[:transcription]
        topic.transcriptions.create(
          audio: transcription[:url],
          answers: transcription[:answer],
          topic_id: topic.id,
        )
      end

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
      :duration,
      :part_id,
      :audition,
      :chats,
      :memorization,
      :transcription
    )
  end
end
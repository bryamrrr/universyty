class Api::V1::TopicsController < Api::V1::BaseController

  def show
    topic = Topic.find(params[:id])
    auditions = topic.auditions
    chats = topic.chats
    memorizations = topic.memorizations
    transcriptions = topic.transcriptions

    render :json => {
      topic: topic,
      auditions: auditions,
      chats: chats,
      memorizations: memorizations,
      transcriptions: transcriptions,
    }
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

        memorizations = data[:memorizations]
        memorizations.each do |chat|
          if !chat[:description].nil? and
            !chat[:url].nil? and
            !chat[:translate].nil? and
            !chat[:fonetica].nil?
            topic.memorizations.create(
              description: chat[:description],
              translate: chat[:translate],
              fonetica: chat[:fonetica],
              audio: chat[:url],
              topic_id: topic.id
            )
          end
        end

        transcriptions = data[:transcriptions]
        transcriptions.each do |chat|
          if !chat[:url].nil? and
            !chat[:answer].nil?
            topic.transcriptions.create(
              audio: chat[:url],
              answers: chat[:answer],
              topic_id: topic.id,
            )
          end
        end

        # transcription = data[:transcription]
        # topic.transcriptions.create(
        #   audio: transcription[:url],
        #   answers: transcription[:answer],
        #   topic_id: topic.id,
        # )
      end

      render :json => { :message => "Tema creado" }
    else
      render :json => { :message => "No se pudo crear el tema" }, status: :bad_request
    end
  end

  def update
    topic = Topic.find(params[:id])
    data = params[:data]

    if topic.update(
      title: data[:title],
      video_url: data[:video_url],
      number: data[:number],
      duration: data[:duration]
    )
      topic.auditions.destroy_all
      topic.memorizations.destroy_all
      topic.transcriptions.destroy_all

      if data[:video_url].nil? or data[:video_url] == ""
        topic.auditions.create(
          audio: data[:audition],
          topic_id: topic.id
        )

        memorizations = data[:memorizations]
        memorizations.each do |chat|
          if !chat[:description].nil? and
            !chat[:url].nil? and
            !chat[:translate].nil? and
            !chat[:fonetica].nil?
            topic.memorizations.create(
              description: chat[:description],
              translate: chat[:translate],
              fonetica: chat[:fonetica],
              audio: chat[:url],
              topic_id: topic.id
            )
          end
        end

        transcriptions = data[:transcriptions]
        transcriptions.each do |chat|
          if !chat[:url].nil? and
            !chat[:answer].nil?
            topic.transcriptions.create(
              audio: chat[:url],
              answers: chat[:answer],
              topic_id: topic.id,
            )
          end
        end
      end

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
      # :chats,
      :memorizations,
      :transcription
    )
  end
end
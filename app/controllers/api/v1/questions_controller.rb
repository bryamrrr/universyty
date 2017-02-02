class Api::V1::QuestionsController < Api::V1::BaseController

  def show
    question = Question.find(params[:id])
    render :json => question.to_json(
        :include => {
          :alternatives => {}
        }
      )
  end

  def create
    question = Question.new(question_params)

    if question.save
      render :json => { :question => question, :message => "Pregunta creada" }
    else
      render :json => { :message => "No se pudo crear la pregunta" }, status: :bad_request
    end
  end

  def update
    question = Question.find(params[:id])

    if question.update(question_params)
      render :json => { :message => "Datos actualizados" }
    else
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

  def destroy
    question = Question.find(params[:id])

    question.destroy
    render :json => { :message => "Pregunta eliminada" }
  end

  def alternatives
    alternatives = Alternative.where(question_id: params[:id])
    question = Question.find(params[:id])

    render :json => { :alternatives => alternatives, :question => question }
  end

  private
  def question_params
    params.require(:data).permit(
      :content,
      :answers_number,
      :part_id
    )
  end
end
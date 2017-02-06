class Api::V1::QuestionsController < Api::V1::BaseController

  def show
    question = Question.find(params[:id])
    next_question = Question.where('id > ?', question[:id]).where(part_id: question[:part_id]).first
    part = Part.find(question[:part_id])
    enrollment = @current_user.enrollments.find_by(course_id: part[:course_id])

    if (enrollment.grades.last[:exam] == 'Examen')
      next_exam = 'Aplazado'
    elsif (enrollment.grades.last[:exam] == 'Sustitutorio')
      next_exam = 'No hay'
    elsif (enrollment.grades.last[:exam] == 'Aplazado')
      enrollment.grades.all.destroy_all
    end

    render :json => {
        question: question.as_json(
          :include => {
            :alternatives => {}
          }
        ),
        next_question: next_question,
        next_exam: next_exam
    }
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
    question = Questio

    n.find(params[:id])

    render :json => { :alternatives => alternatives, :question => question }
  end

  def check
    question = Question.find(params[:id])

    next_question = Question.where('id > ?', question[:id]).where(part_id: question[:part_id]).first

    render :json => { :next_question => next_question }

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
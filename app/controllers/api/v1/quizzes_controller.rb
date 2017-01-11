class Api::V1::QuizzesController < Api::V1::BaseController
  def show
    quiz = Quiz.find_by(part_id: params[:id])
    part = Part.find(params[:id])
    course = Course.find(part[:course_id])

    render :json => { :quiz => quiz, :part => part, :course => course }
  end

  def update

  end

end
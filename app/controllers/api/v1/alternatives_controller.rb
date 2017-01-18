class Api::V1::AlternativesController < Api::V1::BaseController

  def show
    alternative = Alternative.find(params[:id])
    render :json => alternative
  end

  def create
    alternative = Alternative.new(alternative_params)

    if alternative.save
      render :json => { :alternative => alternative, :message => "Alternativa creada" }
    else
      render :json => { :message => "No se pudo crear la alternativa" }, status: :bad_request
    end
  end

  def update
    alternative = Alternative.find(params[:id])

    if alternative.update(alternative_params)
      render :json => { :message => "Datos actualizados" }
    else
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

  def destroy
    alternative = Alternative.find(params[:id])

    alternative.destroy
    render :json => { :message => "Alternativa eliminada" }
  end

  private
  def alternative_params
    params.require(:data).permit(
      :content,
      :correct_answer,
      :question_id
    )
  end
end
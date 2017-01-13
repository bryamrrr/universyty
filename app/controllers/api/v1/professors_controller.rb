class Api::V1::ProfessorsController < Api::V1::BaseController
  def show
    professor = Professor.find(params[:id])
    render :json => professor
  end

  def create
    professor = Professor.new(professor_params)

    if professor.save
      render :json => { :message => "Profesor agregado" }
    else
      render :json => { :message => "No se pudo agregar el profesor" }, status: :bad_request
    end
  end

  def update
    professor = Professor.find(params[:id])

    if professor.update(professor_params)
      render :json => { :message => "Datos actualizados" }
    else
      puts professor.errors.to_json
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

   def destroy
    professor = Professor.find(params[:id])

    professor.destroy
    render :json => { :message => "Se removió el profesor del curso" }
  end

  def professor_params
    params.require(:data).permit(
      :name,
      :bio,
      :image_url,
      :course_id
    )
  end
end
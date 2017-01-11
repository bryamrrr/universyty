class Api::V1::CoursesController < Api::V1::BaseController
  skip_before_action :authenticate

  def index
    @courses = Course.all.order(created_at: :desc)

    render :json => @courses.to_json(:include => {
      :category => {}
      })
  end

  def show
    @course = Course.find(params[:id])

    render :json => @course
  end

  def find_by_slug
    category = Category.find_by(slug: params[:slug])
    courses = category.courses

    render :json => { :courses => courses, :category => category }
  end

  def create
    course = Course.new(course_params)

    if course.save
      render :json => { :course => course, :message => "Curso creado" }
    else
      render :json => { :message => "No se pudo crear el curso" }, status: :bad_request
    end
  end

  # PUT /api/v1/courses/{id}
  def update
    course = Course.find(params[:id])

    if course.update(course_params)
      render :json => { :message => "Datos actualizados" }
    else
      puts course.errors.to_json
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

  def destroy
    course = Course.find(params[:id])

    course.destroy
    render :json => { :message => "Curso eliminado" }
  end

  def modules
    parts = Part.where(course_id: params[:id]).order(number: :asc)
    course = Course.find(params[:id])

    render :json => { :parts => parts, :course => course }
  end

  def change_state
    course = Course.find(params[:id])

    if course.published
      course.update_column(:published, false)
    else
      course.update_column(:published, true)
    end

    render :json => { :message => "Curso actualizado" }
  end

  private
  def course_params
    params.require(:data).permit(
      :category_id,
      :title,
      :description,
      :goal,
      :certificate_info,
      :starred,
      :free,
      :pricetag,
      :discount,
      :duration,
      :background_url,
      :video_url,
      :priority,
      :level,
      :classes
    )
  end
end
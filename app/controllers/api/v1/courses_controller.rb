class Api::V1::CoursesController < Api::V1::BaseController
  skip_before_action :authenticate

  def index
    @courses = Course.all.order(created_at: :desc)

    render :json => @courses.to_json(:include => {
      :category => {},
      :professors => {},
      :user => {},
      :enrollments => {}
      })
  end

  def show_starred
    @courses = Course.where(starred: true, published: true).order(priority: :asc)

    render :json => @courses.to_json(:include => {
      :category => {},
      :professors => {},
      :user => {}
      })
  end

  def show
    @course = Course.find(params[:id])
    parts = @course.parts.order(number: :asc)

    render :json => {
      :course => @course.as_json(:include => {
        :professors => {},
        :user => {}
      }),
      :parts => parts.as_json(
        :include => {
          :topics => {}
        }
      )}
  end

  def find_by_slug
    category = Category.find_by(slug: params[:slug])
    courses = category.courses.where(published: true)

    render :json => { :courses => courses.as_json(:include => {
        :professors => {}
        }
      ), :category => category }
  end

  def find_by_category
    courses = Course.where(category_id: params[:id], published: true)
    render :json => courses.to_json(:include => {
      :category => {},
      :professors => {},
      :user => {}
    })
  end

  def find_by_text
    @courses = Course.where(published: true).where('lower(title) LIKE ?', '%' + params[:text].downcase + '%')
    @courses = @courses.as_json(:include => {
      :category => {},
      :professors => {},
      :user => {}
    })
    professors = Professor.where('lower(name) LIKE ?', '%' + params[:text].downcase + '%')

    professors.each do |professor|
      more_course = professor.course
      if !@courses.any?{|a| a["id"] == more_course["id"]}
        @courses << more_course.as_json(:include => {
          :category => {},
          :professors => {},
          :user => {}
        })
      end
    end

    render :json => @courses
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

  def professors
    professors = Professor.where(course_id: params[:id])
    course = Course.find(params[:id])

    render :json => { :professors => professors, :course => course }
  end

  def change_state
    course = Course.find(params[:id])

    if course.published
      course.update_attribute(:published, false)
    else
      course.update_attribute(:published, true)
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
      :bono,
      :net,
      :duration,
      :background_url,
      :video_url,
      :priority,
      :level,
      :classes,
      :user_id
    )
  end
end
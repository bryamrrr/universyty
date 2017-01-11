class Api::V1::CategoriesController < Api::V1::BaseController
  def index
    @categories = Category.all
    render :json => @categories
  end

  def show
    @category = Category.find(params[:id])
    render :json => @category
  end

  def create
    category = Category.new(category_params)

    if category.save
      render :json => { :category => category, :message => "Categoría creada" }
    else
      render :json => { :message => "No se pudo crear la categoría" }, status: :bad_request
    end
  end

  # PUT /api/v1/categories/{id}
  def update
    category = Category.find(params[:id])

    if category.update(category_params)
      render :json => { :message => "Datos actualizados" }
    else
      puts category.errors.to_json
      render :json => { :message => "No se pudo actualizar" }, status: :bad_request
    end
  end

  def destroy
    category = Category.find(params[:id])

    category.destroy
    render :json => { :message => "Categoría eliminada" }
  end

  private
  def category_params
    params.require(:data).permit(
      :name,
      :logo_url,
      :slug
    )
  end
end
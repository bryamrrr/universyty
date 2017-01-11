class Api::V1::ProvincesController < Api::V1::BaseController
  def index
    @provinces = Province.all
    render :json => @provinces
  end
end
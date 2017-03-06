class Api::V1::BonosController < Api::V1::BaseController

  def index
    bonos = @current_user.bonos
    render :json => bonos.to_json
  end
end
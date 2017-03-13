class Api::V1::BonosController < Api::V1::BaseController

  def index
    bonos = @current_user.bonos.order(created_at: :desc).limit(15)
    render :json => bonos.to_json
  end
end
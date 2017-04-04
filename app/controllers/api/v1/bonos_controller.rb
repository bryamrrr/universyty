class Api::V1::BonosController < Api::V1::BaseController

  def index
    bonos = @current_user.bonos.order(created_at: :desc).limit(15)
    render :json => bonos.to_json
  end

  def contingency_list
    injects = Bono.where(name: "Inyección de saldo")
    extracts = Bono.where(name: "Extracción de saldo")

    render :json => {
      injects: injects.as_json(:include => {
        :user => {}
      }),
      extracts: extracts.as_json(:include => {
        :user => {}
      })
    }
  end

  def contingency_change
    user = User.find_by(nickname: params[:data][:user])

    if params[:data][:type] == "Inyección"
      user.bonos.create(
        name: "Inyección de saldo",
        description: "Inyección de saldo",
        value: params[:data][:amount].to_i
      )
      user.update_column(:balance, user[:balance] + params[:data][:amount].to_i)
      user.update_column(:historical_balance, user[:historical_balance] + params[:data][:amount].to_i)
    elsif params[:data][:type] == "Extracción"
      user.bonos.create(
        name: "Extracción de saldo",
        description: "Extracción de saldo",
        value: -params[:data][:amount].to_i
      )
      user.update_column(:balance, user[:balance] - params[:data][:amount].to_i)
    end
  end
end
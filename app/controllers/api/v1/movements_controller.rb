class Api::V1::MovementsController < Api::V1::BaseController
  def payment
    paymethod = params[:paymethod]
    cart = params[:data][:cart]
    nickname = params[:data][:nickname]
    if paymethod == '2' || paymethod == '3'
      manualPayment(paymethod, cart, nickname)
    end
  end

  def manualPayment(paymethod, cart, nickname)
    user = User.find_by(nickname: nickname)

    if paymethod == '1'
      paymethod = Paymethod.find_by(name: "Tarjeta")
    elsif paymethod == '2'
      paymethod = Paymethod.find_by(name: "Depósito")
    elsif paymethod == '3'
      paymethod = Paymethod.find_by(name: "Puntos")
    end

    movement = Movement.new(
      user_id: user.id,
      paymethod_id: paymethod.id,
      type_id: 2,
      status: "No pagado",
      total: cart[:total]
    )

    if movement.save
      cart[:items].each do |item|
        movement.products.create(
          course_id: item[:id],
          name: item[:title],
          pricetag: item[:pricetag]
        )
      end
      render :json => { :message => "Pedido realizado" }
    else
      render :json => { :message => "No se pudo realizar el pedido", :dev_message => movement.errors.full_message.to_json }
    end
  end

  def payments
    user = User.find_by(nickname: params[:nickname])
    movements = Movement.where(user_id: user[:id], type: 2).order(created_at: :desc)

    if @current_user == user || @current_user.role[:name] == "Admin"
      render :json => movements.to_json(:include => {
          :type => {},
          :paymethod => {},
          :products => {}
        })
    else
      render :json => { :message => "No se encontraron movimientos" }, status: :not_found
    end
  end

  def destroy
    movement = Movement.find(params[:id])

    movement.destroy
    render :json => { :message => "Movimiento eliminado" }
  end
end
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

  def payments_pending
    movements = Movement.where(status: "No pagado").order(updated_at: :desc)
    render :json => movements.to_json(:include => {
          :type => {},
          :paymethod => {},
          :user => {},
          :products => {}
        })
  end

  def payments_paid
    movements = Movement.where(status: "Pagado").order(updated_at: :desc)
    render :json => movements.to_json(:include => {
          :type => {},
          :paymethod => {},
          :user => {},
          :products => {}
        })
  end

  def change_activate
    movement = Movement.find(params[:id])

    if @current_user.role[:name] == "Admin"
      if movement[:status] == "No pagado"
        activate_movement(movement)
        render :json => { :message => "Se cambió el estado del pago correctamente" }
      elsif movement[:status] == "Pagado"
        puts "Desactivar pago/movimiento"
        render :json => { :message => "Se cambió el estado del pago correctamente" }
      end
    else
      render :json => { :message => "Acceso denegado" }, status: :forbidden
    end
  end

  def activate_movement(movement)
    movement.update_column(:status, "Pagado")
    if movement.products.count > 0
      puts "Es un pago de cursos"
      movement.products.each do |product|
        Enrollment.create(user_id: movement[:user_id], course_id: product.course_id)
      end
    else
      puts "Es un pago de embajador"
      user = User.find(movement[:user_id])
      if user[:paydate] < Time.today
        puts "Ya pasó a fecha de pago, se actualizará para que pague dentro de un mes exactamente"
        user.update_column(:paydate, Time.today + 1.month)
      else
        puts "Aun no es la fecha de pago, se le sumará un mes más a la fecha de pago ya existente"
        user.update_column(:paydate, user[:paydate] + 1.month)
      end
      user.update_column(:ambassador, true)
      user.update_column(:ambassador_active, true)
    end
  end

  def destroy
    movement = Movement.find(params[:id])

    movement.destroy
    render :json => { :message => "Movimiento eliminado" }
  end
end
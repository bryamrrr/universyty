class Api::V1::MovementsController < Api::V1::BaseController
  def index
    if @current_user[:role_id] != 1
      movements = Movement.where(user_id: @current_user[:id], status: "Pagado")
      render :json => movements.to_json
    end
  end

  def payment
    paymethod = params[:paymethod]
    cart = params[:data][:cart]
    nickname = params[:data][:nickname]
    if paymethod == '2' || paymethod == '3'
      manualPayment(paymethod, cart, nickname)
    end
  end

  def ambassador
    paymethod = params[:paymethod]
    nickname = params[:data][:nickname]
    if paymethod == '2' || paymethod == '3'
      manualAmbassadorPayment(paymethod, nickname)
    end
  end

  def manualAmbassadorPayment(paymethod, nickname)
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
      total: 29,
      ambassador: true
    )

    if movement.save
      render :json => { :message => "Pedido realizado" }
    else
      render :json => { :message => "No se pudo realizar el pedido", :dev_message => movement.errors.full_message.to_json }
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
      if cart[:total] > @current_user[:balance]
        render :json => { :errors => "Saldo insuficiente" } and return
      end
    end

    if user[:ambassador] == false
      discount = false
      discount_value = 0.2
    else
      discount = true
      discount_value = 0
    end

    movement = Movement.new(
      user_id: user.id,
      paymethod_id: paymethod.id,
      type_id: 2,
      status: "No pagado",
      total: cart[:total],
      discount: discount,
      discount_value: discount_value
    )

    if movement.save
      cart[:items].each do |item|
        movement.products.create(
          course_id: item[:id],
          name: item[:title],
          pricetag: item[:pricetag]
        )
      end

      if paymethod[:name] == 'Puntos'
        movement.products.each do |product|
          enrollment = Enrollment.find_by(user_id: movement[:user_id], course_id: product.course_id)

          if enrollment
            movement.destroy
            render :json => { :errors => "Ya te encuentras suscrito a un curso. Por favor quítalo del carrito e intentalo de nuevo." } and return
          end
        end

        movement.products.each do |product|
          Enrollment.create(user_id: movement[:user_id], course_id: product.course_id)

          course = Course.find(product.course_id)

          @current_user.increase_balance_ambassador('COMMEND', course)
          course.increase_balance_instructor(user)
        end

        @current_user.update_column(:balance, @current_user[:balance] - cart[:total].to_d.round)
        movement.update_column(:status, "Pagado")
        @current_user.bonos.create(
          name: "Pago de cursos",
          description: "Pago de cursos",
          value: cart[:total].to_d.round
        )
        render :json => { :message => "Pago realizado con éxito" }
      elsif paymethod[:name] == 'Depósito'
        render :json => { :message => "Pedido realizado" }
      end
    else
      render :json => { :message => "No se pudo realizar el pedido", :dev_message => movement.errors.full_message.to_json }
    end
  end

  def transfer
    if params[:data][:amount]
      if @current_user[:balance] < params[:data][:amount].to_d
        render :json => { :errors => "Saldo insuficiente" } and return
      end
    else
      render :json => { :errors => "Falta definir el monto" } and return
    end

    user = User.find_by(nickname: params[:data][:user])

    if user
      user.update_column(:balance, user[:balance] + params[:data][:amount].to_d.round - 1)
      user.update_column(:historical_balance, user[:historical_balance] + params[:data][:amount].to_d.round - 1)
      user.bonos.create(
        name: "Puntos recibidos",
        description: "Transferencia - Puntos Recibidos (#{@current_user[:nickname]})",
        value: params[:data][:amount].to_d.round - 1
      )

      @current_user.update_column(:balance, (@current_user[:balance] - params[:data][:amount].to_d).round)
      @current_user.bonos.create(
        name: "Puntos enviados",
        description: "Transferencia - Puntos enviados (#{params[:data][:user]})",
        value: -params[:data][:amount].to_d.round
      )

      render :json => { :message => "Transferencia realizada con éxito" }
    else
      render :json => { :errors => "No existe el usuario" }
    end
  end

  def pay
    if params[:data][:amount]
      if @current_user[:balance] < params[:data][:amount].to_d
        render :json => { :errors => "Saldo insuficiente" }
      else
        user = User.find_by(nickname: params[:data][:user])

        if user
          movements = user.movements.where(status: "No pagado")
          if movements
            activate_movement(movements.last)
            @current_user.bonos.create(
              name: "Pago a otro usuario",
              description: "Pago a otro usuario (#{user[:nickname]})",
              value: -Movement.last[:total]
            )
            @current_user.update_column(:balance, @current_user[:balance] - Movement.last[:total])
          else
            render :json => { :errors => "El usuario no tiene pagos pendientes" }
          end
        else
          render :json => { :errors => "No existe el usuario" }
        end
      end
    else
      render :json => { :errors => "Falta definir el monto" }
    end
  end

  def debt
    if params[:data][:user]
      user = User.find_by(nickname: params[:data][:user])
      if user
        movements = user.movements.where(status: "No pagado")
        if movements
          render :json => movements.last.to_json
        else
          render :json => { :errors => "El usuario no tiene pagos pendientes" }
        end
      else
        render :json => { :errors => "No existe el usuario" }
      end
    else
      render :json => { :errors => "Falta definir el monto" }
    end
  end

  def payments
    user = User.find_by(nickname: params[:nickname])
    movements = Movement.where(user_id: user[:id], type: 2, ambassador: false).order(created_at: :desc)

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

  def ambassador_payments
    user = User.find_by(nickname: params[:nickname])
    movements = Movement.where(user_id: user[:id], type: 2, ambassador: true).order(created_at: :desc)

    if @current_user == user || @current_user.role[:name] == "Admin"
      render :json => movements.to_json(:include => {
          :type => {},
          :paymethod => {}
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
      elsif movement[:status] == "Pagado"
        puts "FIXME Desactivar pago/movimiento"
        render :json => { :message => "Se cambió el estado del pago correctamente" }
      end
    else
      render :json => { :message => "Acceso denegado" }, status: :forbidden
    end
  end

  def activate_movement(movement)
    user = User.find(movement[:user_id])

    movement.products.each do |product|
      enrollment = Enrollment.find_by(user_id: movement[:user_id], course_id: product.course_id)

      if enrollment
        render :json => { :errors => "Ya se encuentra suscrito a un curso. No es posible realizar el movimiento" } and return
      end
    end

    if movement.products.count > 0
      puts "Es un pago de cursos"
      movement.products.each do |product|
        Enrollment.create(user_id: movement[:user_id], course_id: product.course_id)

        course = Course.find(product.course_id)

        if !@current_user[:ambassador]
          user.increase_balance_ambassador('COMMEND', course)
        end
        course.increase_balance_instructor(user)
      end
    else
      update_teams(user, 1)

      if user[:paydate]
        if user[:paydate] < Date.today
          user.update_column(:paydate, Date.today + 1.month)
        else
          user.update_column(:paydate, user[:paydate] + 1.month)
        end
      else
        user.update_column(:paydate, Date.today + 1.month)
      end

      if user.is_ambassador?
        puts "<===== El usuario SI es embajador =====>"
        user.increase_balance_ambassador('MONTHLY_PAY')
      else
        puts "<===== El usuario NO es embajador AUN =====>"
        user.increase_balance_ambassador('NEW_AMBASSADOR')
      end

      user.update_column(:ambassador, true)
      user.update_column(:ambassador_active, true)
    end
    movement.update_column(:status, "Pagado")
    render :json => { :message => "Pago realizado con éxito" } and return
  end

  def update_teams(user, level, father = nil)
    if user[:sponsor] != ""
      if father
        father = User.where(nickname: father[:sponsor]).first
      else
        father = User.where(nickname: user[:sponsor]).first
      end

      if father && father[:ambassador]
        if level == 1
          team = father.teams.where(sponsored: user[:nickname], level: 1).first
          team.update_attribute(:type_team, 'Embajador')
          team.update_attribute(:new, true)
        else
          father.teams.create(
            sponsored: user[:nickname],
            level: level,
            type_team: "Embajador"
          )
        end
        level += 1
        update_teams(user, level, father) unless father[:sponsor] == ""
      else
        puts "El usuario sponsor no es embajador"
      end
    end
  end

  def destroy
    movement = Movement.find(params[:id])

    movement.destroy
    render :json => { :message => "Movimiento eliminado" }
  end
end
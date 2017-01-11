class Api::V1::UsersController < Api::V1::BaseController
  skip_before_action :authenticate, :only => [:login]

  def index
    @users = User.all.order(created_at: :desc)

    render :json => @users.to_json(:include => {
      :province => {}
      })
  end

  # POST /api/v1/users/login
  def login
    data = {nickname: params[:nickname], password: params[:password]}

    user = User.authenticate(data)

    if user
      if user.block
        render :json => { :errors => "Usuario bloqueado" }, status: :forbidden
      else
        token = user.tokens.create
        render :json => { :token => token.token, :nickname => user.nickname, :role => user.role[:name], :first_entry => user.first_entry }
        if user.first_entry === false
          user.update_column(:first_entry, true)
        end
      end
    else
      render :json => { :errors => "Credenciales incorrectas" }, status: :unauthorized
    end
  end

  # POST /api/v1/users/logout
  def logout
    token = Token.find_by(token: bearer_token)

    if token.delete
      render :json => { :message => "El token ha expirado" }
    else
      render :json => { :errors => token.errors.full_messages }
    end
  end

  def create
    puts params[:data].to_json
    user = User.new(user_params)

    if user.save
      render :json => { :message => "Usuario creado" }
    else
      puts user.errors.to_json
      render :json => { :message => "No se pudo crear el usuario" }, status: :bad_request
    end
  end

  # GET /api/v1/users/{nickname}
  def show
    user = User.find_by(nickname: params[:id])
    if @current_user == user
      render :json => user.to_json(
        :except => [:created_at, :updated_at, :encrypted_password, :salt],
        :include => [:province => { }]
      )
    else
      render :json => { :message => "Usuario no encontrado" }
    end
  end

  # PUT /api/v1/users/{nickname}/change_password
  def change_password
    user = User.find_by(nickname: params[:nickname])
    if (user)
      encrypted_password = BCrypt::Engine.hash_secret(params[:data][:old_password], user[:salt])
      if user[:encrypted_password] == encrypted_password
        new_encrypted_password = BCrypt::Engine.hash_secret(params[:data][:new_password], user[:salt])
        user.update_attribute(:encrypted_password, new_encrypted_password)
        render :json => { :message => "Cambio de contraseña correcto" }
      else
        render :json => { :message => "No se pudo cambiar la contraseña" }, status: :bad_request
      end
    else
      render :json => { :message => "No se pudo cambiar la contraseña" }, status: :not_found
    end
  end

  # PUT /api/v1/users/{nickname}
  def update
    user = User.find_by(nickname: params[:id])

    if user.update(update_params)
      render :json => { :message => "Datos actualizados" }
    else
      puts user.errors.to_json
      render :json => { :message => "No se pudo cambiar la contraseña" }, status: :bad_request
    end
  end

  def block
    user = User.find(params[:id])

    if user.block
      user.update_column(:block, false)
    else
      user.update_column(:block, true)
    end

    render :json => { :message => "Usuario bloqueado" }
  end

  def destroy
    user = User.find(params[:id])

    user.destroy
    render :json => { :message => "Usuario eliminado" }
  end

  def update_params
    params.require(:data).permit(
      :fullname,
      :email,
      :phone,
      :dni,
      :address,
      :province_id,
      :gender
    )
  end

  def user_params
    params.require(:data).permit(
      :nickname,
      :fullname,
      :email,
      :phone,
      :dni,
      :address,
      :province_id,
      :gender,
      :password
      ).merge(
        role_id: 1
        )
  end

end
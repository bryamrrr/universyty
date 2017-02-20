class PasswordsController < ApplicationController
  before_action :get_user,   only: [:edit, :update]
  before_action :check_expiration_and_exists, only: [:edit, :update]

  def create
    user = User.find_by(email: params[:password][:email].downcase)
    if user
      user.create_reset_digest
      user.send_password_reset_email
      flash[:info] = "Se envió un correo con las instrucciones para recuperar la contraseña"
      redirect_to "/"
    else
      flash.now[:danger] = "No se encontró usuario con ese correo"
      render 'new'
    end
  end

  def update
    if @user.change_with_token(params[:user][:password])
      flash[:success] = "La contraseña ha sido actualizada"
      redirect_to "/login"
    else
      render 'edit'
    end
  end

  private

    def get_user
      @user = User.find_by(email: params[:email])
    end

    def check_expiration_and_exists
      if @user.password_reset_expired?
        flash[:danger] = "La recuperación de la contraseña ha expirado"
        redirect_to new_password_url
      elsif !@user.password_reset_exists?(params[:id])
        flash[:danger] = "El token no existe"
        redirect_to new_password_url
      end
    end
end
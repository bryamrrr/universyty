class PasswordsController < ApplicationController
  def create
    user = User.find_by(email: params[:password][:email].downcase)
    if user
      user.create_reset_digest
      user.send_password_reset_email
      flash[:info] = "Se envió un correo con las instrucciones para recuperar la contraseña"
      redirect_to root_url
    else
      flash.now[:danger] = "No se encontró usuario con ese correo"
      render 'new'
    end
  end
end
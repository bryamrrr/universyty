class PublicController < ApplicationController

  def home
    @courses = Course.where(starred: true, published: true).limit(9).order(priority: :asc)
  end

  def money
  end

  def certificates
  end

  def instructor
  end

  def register
    if params[:nickname]
      raw_data = User.find_by(nickname: params[:nickname], ambassador: true)
      if raw_data
        @data = raw_data[:nickname]
      end
    end
  end

  def welcome
  end

  def login
    if params[:user]
      user = User.find_by(nickname: params[:user])

      if user
        if user.unblock_expired?
          redirect_to "/login", alert: "La activación de la cuentaha expirado"
        elsif !user.unblock_exists?(params[:token])
          redirect_to "/login", alert: "El token no existe"
        else
          user.update_column(:login_attempts, 0)
          user.update_column(:block, false)
        end
      end
    end
  end
end

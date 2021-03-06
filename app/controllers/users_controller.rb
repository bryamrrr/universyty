class UsersController < ApplicationController
  def create
    if user_params[:role_id] === "2"
      if user_params[:sponsor] != "" && !User.find_by(nickname: user_params[:sponsor])
        redirect_to "/registro", alert: "¡El usuario '#{user_params[:sponsor]}' no existe!" and return
      else
        user = User.new(user_params)
      end

      if user.save
        update_teams(user, 1) unless user.instructor === true

        begin
          MailchimpWrapper.subscribe(user)
        rescue Mailchimp::Error => e
          logger.error "ERROR mailchimp #{e.message} #{params.inspect}"
        end
        redirect_to "/login", notice: 'Registro realizado con éxito.'
      else
        puts user.errors.to_json
        if user.errors[:nickname].length > 0
          alert = "El nombre de usuario ya existe"
        elsif user.errors[:email].length > 0
          alert = "El correo ya ha sido utilizado"
        end

        redirect_to "/registro", alert: alert
        puts user.errors.to_json
      end
    else
      puts "Falló porque mandó otro role"
    end
  end

  def update_teams(user, level)
    if user[:sponsor] != "" && level <= 10
      father = User.where(nickname: user[:sponsor]).first

      if father && father[:ambassador]
        father.teams.create(
          sponsored: user[:nickname],
          level: level,
          type_team: "Alumno"
        )
      else
        puts "El usuario sponsor no es embajador"
      end
    end
  end

  def user_params
    params.require(:user).permit(:nickname, :fullname, :email, :password, :role_id, :sponsor, :city, :instructor)
  end
end
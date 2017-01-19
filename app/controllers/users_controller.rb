class UsersController < ApplicationController
  def create

    if user_params[:role_id] === "2"
      user = User.new(user_params)

      if user.save
        update_teams(user, 1) unless user.instructor === true
        begin
          MailchimpWrapper.subscribe(user)
        rescue Mailchimp::Error => e
          logger.error "ERROR mailchimp #{e.message} #{params.inspect}"
        end
        redirect_to "/login"
      else
        puts "Falló"
        puts user.errors.to_json
      end
    else
      puts "Falló porque mandó otro role"
    end
  end

  def update_teams(user, level)
    if user[:sponsor] != ""
      father = User.where(nickname: user[:sponsor]).first

      if father
        father.teams.create(
          sponsored: user[:nickname],
          level: level
        )

        level = level + 1

        update_teams(father, level) unless father[:sponsor] == nil || level > 5
      else
        puts "No entró, NO ha creado TEAMS"
      end
    end
  end

  def user_params
    params.require(:user).permit(:nickname, :fullname, :email, :password, :role_id, :sponsor, :city, :instructor)
  end
end
class UsersController < ApplicationController
  def create

    if user_params[:role_id] === "2"
      user = User.new(user_params)

      if user.save
        update_teams(user, 1) unless user.instructor === true
        MailchimpWrapper.subscribe(user)
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
    puts "ENTRO a UPDATE_TEAMS"
    if user[:sponsor] != ""
      father = User.where(nickname: user[:sponsor]).first

      father.teams.create(
        sponsored: user[:nickname],
        level: level
      )

      level = level + 1

      update_teams(father, level) unless father[:sponsor] == nil || level > 5
    end
  end

  def user_params
    params.require(:user).permit(:nickname, :fullname, :email, :password, :role_id, :sponsor, :city, :instructor)
  end
end
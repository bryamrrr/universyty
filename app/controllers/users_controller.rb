class UsersController < ApplicationController
  def create
    province = Province.find(user_params[:province])
    role = Role.find(2)

    @user = User.new(
        nickname: user_params["nickname"],
        fullname: user_params["fullname"],
        role: role,
        province: province,
        email: user_params["email"],
        password: user_params["password"],
        dni: user_params["dni"],
        sponsor: user_params["sponsor"]
      )

    if @user.save
      update_teams(@user, 1)
      MailchimpWrapper.subscribe(@user)
      redirect_to "/login"
    else
      puts "Falló"
      puts @user.errors.to_json
    end
  end

  def update_teams(user, level)
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
    params.require(:user).permit(:nickname, :fullname, :email, :password, :role, :province, :dni, :sponsor)
  end
end
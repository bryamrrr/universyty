class Api::V1::TeamsController < Api::V1::BaseController
  def students
    user = User.find_by(nickname: params[:nickname])

    teams = user.teams.order(created_at: :desc)
    my_students = Array.new

    if teams.count > 0
      teams.each do |team|
        my_user = User.find_by(nickname: team[:sponsored])
        if !my_user[:ambassador]
          my_students.push(my_user)
        end
      end
      render :json => my_students.to_json()
    else
      render :json => []
    end

  end

  def ambassadors
    user = User.find_by(nickname: params[:nickname])
    teams = user.teams.order(created_at: :desc)

    data = {
      total_sum: 0,
      total_active_sum: 0,
      total: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total_active: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    if teams.count > 0
      teams.each do |team|
        my_user = User.find_by(nickname: team[:sponsored])
        level = team[:level] - 1
        if my_user[:ambassador_active]
          data[:total_active][level] += 1
          data[:total][level] += 1
          data[:total_sum] += 1
          data[:total_active_sum] += 1
        elsif my_user[:ambassador]
          data[:total][level] += 1
          data[:total_sum] += 1
        end
      end
    end

    render :json => data
  end

  def ambassadors_by_level
    level = params[:level]
    user = User.find_by(nickname: params[:nickname])
    teams = user.teams.order(created_at: :desc)

    my_ambassadors = Array.new

    if teams.count > 0
      teams.each do |team|
        my_user = User.find_by(nickname: team[:sponsored])

        if team[:level] == Integer(level) && my_user[:ambassador]
          my_ambassadors.push(my_user)
        end
      end
    end

    render :json => my_ambassadors.to_json()
  end

  def search
    user = User.find_by(nickname: params[:text], ambassador: true)
    user = User.find_by(fullname: params[:text], ambassador: true) unless user

    if user
      nickname = user[:nickname]
      team = @current_user.teams.find_by(sponsored: nickname)

      if team
        render :json => {
          nickname: nickname,
          level: team[:level],
          active: user[:ambassador_active]
        }
      else
        render :json => { message: "Usuario no encontrado" }, status: :unprocessable_entity
      end
    else
      render :json => { message: "Usuario no encontrado" }, status: :unprocessable_entity
    end
  end

  def index
    teams = @current_user.teams.where('updated_at BETWEEN ? AND ?', Date.current.beginning_of_month, Date.current.end_of_month).order(updated_at: :desc)
    count = @current_user.teams.where('updated_at BETWEEN ? AND ?', Date.current.beginning_of_month, Date.current.end_of_month).where(new: true).count

    render :json => {
      teams: teams,
      count: count
    }
  end

  def view_teams
    teams = @current_user.teams.where('updated_at > ?', Date.today - 1.month)

    teams.each do |team|
      team.update_attribute(:new, false)
    end
  end
end
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
  end
end

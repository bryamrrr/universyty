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
  end

  def welcome
  end

  def login
  end
end

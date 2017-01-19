class CoursesController < ApplicationController
  def index
    @courses_starred = Course.where(starred: true, published: true).order(priority: :asc)
  end

  def show
    @course = Course.find(params[:id])
  end
end

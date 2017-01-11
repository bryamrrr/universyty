class CoursesController < ApplicationController
  def index
    @courses_starred = Course.where(starred: true, published: true).order(priority: :asc)
    @courses_marketing = Category.find(1).courses.where(published: true)
    @courses_development = Category.find(2).courses.where(published: true)
    @courses_personal = Category.find(3).courses.where(published: true)
  end

  def show
    @course = Course.find(params[:id])
  end
end

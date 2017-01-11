module ApplicationHelper
  def is_active(controller, action)
    params[:action] == action && params[:controller] == controller ? "active" : nil
  end
end

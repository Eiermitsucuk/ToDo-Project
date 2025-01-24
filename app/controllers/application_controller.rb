class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  include Pundit

  rescue_from Pundit::NotAuthorizedError do |exception|
    redirect_to root_path, alert: "You are not authorized to perform this action."
  end
end

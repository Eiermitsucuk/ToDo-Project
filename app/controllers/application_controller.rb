class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  include Pundit

  rescue_from Pundit::NotAuthorizedError do |exception|
    redirect_to root_path, alert: "You are not authorized to perform this action."
  end
end
           
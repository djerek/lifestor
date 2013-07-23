class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
  before_filter :configure_permitted_parameters, if: :devise_controller?
  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email) }
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:latitude, :longitude, :email, :password, :password_confirmation, :address) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:latitude, :longitude, :email, :password, :password_confirmation, :current_password, :address) }
  end

end

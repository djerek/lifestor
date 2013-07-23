class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :set_user_time_zone

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

private

  def set_user_time_zone
    Time.zone = current_user.time_zone if user_signed_in? 
    # || lifestor::Application.config.time_zone
  end

  # def user_time_zone(&block) 
  #   Time.use_zone(current_user.time_zone, &block) 
  # end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:email) }
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:latitude, :longitude, :email, :password, :password_confirmation, :address) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:latitude, :longitude, :email, :password, :password_confirmation, :current_password, :address) }
  end

end


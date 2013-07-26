class RegistrationsController < Devise::RegistrationsController
  skip_around_filter :set_user_time_zone
  before_filter :authenticate_user!

  protected

  def after_sign_up_path_for(resource)
    'cover/welcome'
  end
end

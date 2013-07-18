class User < ActiveRecord::Base
  has_many :entries, dependent: :destroy
  has_many :locations
  has_many :tags

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  require "#{Rails.root}/app/mailers/user_mailer" 

  def full_name
    first_name + " " + last_name
  end

  def reflection_mailer
    @user = user.find(2)
    UserMailer.reflection_email(@user).deliver
  end
end

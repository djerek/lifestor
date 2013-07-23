class User < ActiveRecord::Base
  has_many :entries, dependent: :destroy
  has_many :locations
  has_many :tags
has_many :answers

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :send_welcome_email

  #require "#{Rails.root}/app/mailers/user_mailer" 

  def full_name
    first_name + " " + last_name
  end

  private

    def send_welcome_email
      UserMailer.welcome_email(self).deliver
    end
end

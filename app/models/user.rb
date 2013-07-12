class User < ActiveRecord::Base
  has_many :entries, dependent: :destroy
  has_many :locations

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end

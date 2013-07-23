class User < ActiveRecord::Base
  has_many :entries, dependent: :destroy
  has_many :locations, dependent: :destroy
  has_many :tags

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

end

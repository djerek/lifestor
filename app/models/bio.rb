class Bio < ActiveRecord::Base
  belongs_to :user
  has_many :answers
end

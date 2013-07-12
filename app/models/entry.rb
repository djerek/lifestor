class Entry < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  has_and_belongs_to_many :locations
end

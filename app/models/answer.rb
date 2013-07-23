class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :entry
  belongs_to :question
  before_save :set_user

  def set_user
    self.user = entry.user
  end
  
end
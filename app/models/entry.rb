class Entry < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  has_and_belongs_to_many :locations


	def self.search(search)
		if search
			find(:all, :conditions => ['title LIKE ?', "%#{search}%"])
		else
			find(:all)
		end
	end
end
class Entry < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  belongs_to :location


	def self.search(search)
		if search
			find(:all, :conditions => ['title LIKE ?', "%#{search}%"])
		else
			find(:all)
		end
	end
end
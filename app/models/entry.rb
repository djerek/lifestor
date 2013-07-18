class Entry < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :locations
  acts_as_taggable_on :tags

  attr_reader :tag_list

	def self.search(search)
		if search
			find(:all, :conditions => ['title LIKE ?', "%#{search}%"])
		else
			find(:all)
		end
	end

  # def tag_list=(ids)
  #   # binding.pry
  #   self.tag_ids = ids.split(",")
  # end
end
class Entry < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  belongs_to :location
  # has_one :location
  attr_reader :location_tokens

  def location_tokens=(tokens)
    self.location_id = Location.ids_from_tokens(tokens)
  end

	def self.search(search)
		if search
			find(:all, :conditions => ['title LIKE ?', "%#{search}%"])
		else
			find(:all)
		end
	end
end
class Entry < ActiveRecord::Base
  belongs_to :user
  has_many :answers
  accepts_nested_attributes_for :answers
  has_many :tags
  belongs_to :location

  acts_as_taggable_on :tags
  mount_uploader :image, ImageUploader

  attr_reader :location_tokens
  attr_reader :tag_list

  

  def location_tokens=(tokens)
    self.location_id = Location.ids_from_tokens(tokens)
  end

	def self.titlesearch(titlesearch)
		if titlesearch
			Entry.where('title LIKE ?', "%#{titlesearch}%").order(:title)
		else
			Entry.order(:title)
		end
	end

  def self.messagesearch(messagesearch)
      Entry.where('message LIKE ?', "%#{messagesearch}%").order(:title)
  end

  def self.writtenonsearch(writtenonsearch)
      Entry.where('written_on LIKE ?', "%#{writtenonsearch}%").order(:written_on)
  end

  def self.datesearch(datesearch)
      Entry.where('written_on LIKE ?', "%#{date.day}%").order(:written_on)
  end

  def self.tagssearch(tagssearch)
      Entry.select('distinct entries.*').joins("LEFT JOIN taggings on entries.id = taggings.taggable_id").joins("LEFT JOIN tags on tags.id = taggings.tag_id").where('tags.name LIKE ?', "%#{tagssearch}%").order(:title)
  end



  # def tag_list=(ids)
  #   # binding.pry
  #   self.tag_ids = ids.split(",")
  # end
end
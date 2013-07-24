class Location < ActiveRecord::Base
  belongs_to :user
  has_many :tags
  has_many :entries

  def self.tokens(query)
    locations = where("title like ?", "%#{query}%")
    if locations.empty?
      [{id: "<<<#{query}>>>", title: "New: \"#{query}\""}]
    else
      locations
    end
  end

  def self.ids_from_tokens(tokens)
    tokens.gsub!(/<<<(.+?)>>>/) { create!(title: $1).id }
    tokens.split(',')
  end

end

class AddPlaceToEntries < ActiveRecord::Migration
  def change
  	add_column :entries, :place, :string
  end
end

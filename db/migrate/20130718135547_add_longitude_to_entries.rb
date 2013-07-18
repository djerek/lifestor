class AddLongitudeToEntries < ActiveRecord::Migration
  def change
  	add_column :entries, :longitude, :float
  end
end

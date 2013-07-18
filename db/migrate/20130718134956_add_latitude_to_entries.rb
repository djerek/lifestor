class AddLatitudeToEntries < ActiveRecord::Migration
  def change
  	add_column :entries, :latitude, :float
  end
end

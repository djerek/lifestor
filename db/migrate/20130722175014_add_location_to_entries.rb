class AddLocationToEntries < ActiveRecord::Migration
  def change
    add_reference :entries, :location, index: true
  end
end

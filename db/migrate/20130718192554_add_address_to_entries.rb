class AddAddressToEntries < ActiveRecord::Migration
  def change
  	add_column :entries, :address, :string
  end
end

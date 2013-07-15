class AddMessageTypeToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :message_type, :string
  end
end

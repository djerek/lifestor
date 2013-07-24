class IndexEntriesOnUserId < ActiveRecord::Migration
  def change
  	add_column :entries, :user_id, :integer
  	add_index "entries", ["user_id"], name: "index_entries_on_user_id"
  end
end

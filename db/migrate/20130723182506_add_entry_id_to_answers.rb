class AddEntryIdToAnswers < ActiveRecord::Migration
  def change
    add_column :answers, :entry_id, :integer
  end
end

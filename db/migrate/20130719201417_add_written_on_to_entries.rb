class AddWrittenOnToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :written_on, :string
  end
end

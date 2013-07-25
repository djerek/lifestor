class CreateBios < ActiveRecord::Migration
  def change
    create_table :bios do |t|
      t.string :image
      t.text :story

      t.timestamps
    end
  end
end

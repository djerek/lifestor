class IndexBiosOnUserId < ActiveRecord::Migration
  def change
    add_reference :bios, :user, index: true
  end
end

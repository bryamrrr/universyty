class AddInstructorToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :instructor, :boolean
  end
end

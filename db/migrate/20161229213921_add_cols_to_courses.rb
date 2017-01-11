class AddColsToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :level, :string
    add_column :courses, :classes, :string
  end
end

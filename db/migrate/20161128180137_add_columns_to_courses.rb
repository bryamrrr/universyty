class AddColumnsToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :priority, :integer
    add_column :courses, :discount, :decimal
    add_column :courses, :published, :boolean
    add_column :courses, :free, :boolean
  end
end

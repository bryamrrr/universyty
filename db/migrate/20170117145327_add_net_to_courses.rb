class AddNetToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :net, :decimal
  end
end

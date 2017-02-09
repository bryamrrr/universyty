class AddBonoToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :bono, :decimal
  end
end

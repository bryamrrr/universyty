class AddTypeToGrades < ActiveRecord::Migration[5.0]
  def change
    add_column :grades, :type, :string
  end
end

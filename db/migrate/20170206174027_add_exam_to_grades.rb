class AddExamToGrades < ActiveRecord::Migration[5.0]
  def change
    add_column :grades, :exam, :string
  end
end

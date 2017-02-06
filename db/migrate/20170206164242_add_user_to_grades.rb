class AddUserToGrades < ActiveRecord::Migration[5.0]
  def change
    add_reference :grades, :user, foreign_key: true
  end
end

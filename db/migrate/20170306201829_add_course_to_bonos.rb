class AddCourseToBonos < ActiveRecord::Migration[5.0]
  def change
    add_reference :bonos, :course, foreign_key: true
  end
end

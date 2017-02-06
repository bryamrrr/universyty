class CreateGrades < ActiveRecord::Migration[5.0]
  def change
    create_table :grades do |t|
      t.references :enrollment, foreign_key: true
      t.references :part, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end

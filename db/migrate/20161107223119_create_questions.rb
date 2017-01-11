class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.references :quiz, foreign_key: true
      t.text :content
      t.integer :answers_number

      t.timestamps
    end
  end
end

class CreateAlternatives < ActiveRecord::Migration[5.0]
  def change
    create_table :alternatives do |t|
      t.references :question, foreign_key: true
      t.text :content
      t.boolean :correct_answer

      t.timestamps
    end
  end
end

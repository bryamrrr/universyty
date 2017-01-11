class CreateProfessors < ActiveRecord::Migration[5.0]
  def change
    create_table :professors do |t|
      t.references :course, foreign_key: true
      t.string :name
      t.text :bio
      t.string :image_url

      t.timestamps
    end
  end
end

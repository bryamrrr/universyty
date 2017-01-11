class CreateTopics < ActiveRecord::Migration[5.0]
  def change
    create_table :topics do |t|
      t.references :part, foreign_key: true
      t.string :title
      t.string :video_url
      t.integer :number

      t.timestamps
    end
  end
end

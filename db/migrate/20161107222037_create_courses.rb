class CreateCourses < ActiveRecord::Migration[5.0]
  def change
    create_table :courses do |t|
      t.references :category, foreign_key: true
      t.string :title
      t.text :description
      t.text :goal
      t.boolean :starred
      t.decimal :pricetag
      t.string :duration
      t.string :background_url
      t.string :video_url

      t.timestamps
    end
  end
end

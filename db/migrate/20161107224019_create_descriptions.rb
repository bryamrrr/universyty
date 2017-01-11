class CreateDescriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :descriptions do |t|
      t.references :information, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end

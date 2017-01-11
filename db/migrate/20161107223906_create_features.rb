class CreateFeatures < ActiveRecord::Migration[5.0]
  def change
    create_table :features do |t|
      t.references :plan, foreign_key: true
      t.text :description

      t.timestamps
    end
  end
end

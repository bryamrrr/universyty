class CreateProvinces < ActiveRecord::Migration[5.0]
  def change
    create_table :provinces do |t|
      t.string :name
      t.references :department, foreign_key: true

      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.references :movement, foreign_key: true
      t.references :course, foreign_key: true
      t.references :plan, foreign_key: true
      t.string :name
      t.decimal :pricetag

      t.timestamps
    end
  end
end

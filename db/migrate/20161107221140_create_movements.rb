class CreateMovements < ActiveRecord::Migration[5.0]
  def change
    create_table :movements do |t|
      t.references :bono, foreign_key: true
      t.references :type, foreign_key: true
      t.references :paymethod, foreign_key: true
      t.references :user, foreign_key: true
      t.integer :transferred_user
      t.integer :transferred_level
      t.string :status
      t.decimal :total

      t.timestamps
    end
  end
end

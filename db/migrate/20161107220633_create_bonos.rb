class CreateBonos < ActiveRecord::Migration[5.0]
  def change
    create_table :bonos do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end

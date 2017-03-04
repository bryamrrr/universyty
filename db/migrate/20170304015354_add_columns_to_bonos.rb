class AddColumnsToBonos < ActiveRecord::Migration[5.0]
  def change
    add_reference :bonos, :user, foreign_key: true
    add_column :bonos, :value, :decimal
  end
end

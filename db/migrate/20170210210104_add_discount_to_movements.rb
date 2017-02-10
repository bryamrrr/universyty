class AddDiscountToMovements < ActiveRecord::Migration[5.0]
  def change
    add_column :movements, :discount, :boolean, :default => false
  end
end

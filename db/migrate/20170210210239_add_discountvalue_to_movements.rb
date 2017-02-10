class AddDiscountvalueToMovements < ActiveRecord::Migration[5.0]
  def change
    add_column :movements, :discount_value, :decimal
  end
end

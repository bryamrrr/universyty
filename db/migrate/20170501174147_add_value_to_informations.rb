class AddValueToInformations < ActiveRecord::Migration[5.0]
  def change
    add_column :information, :value, :integer
  end
end

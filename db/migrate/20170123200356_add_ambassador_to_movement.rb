class AddAmbassadorToMovement < ActiveRecord::Migration[5.0]
  def change
    add_column :movements, :ambassador, :boolean, :default => false
    add_column :movements, :monthly, :boolean, :default => false
  end
end

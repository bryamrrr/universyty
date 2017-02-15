class AddReasonToMovements < ActiveRecord::Migration[5.0]
  def change
    add_column :movements, :reason, :string
  end
end

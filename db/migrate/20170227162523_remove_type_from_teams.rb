class RemoveTypeFromTeams < ActiveRecord::Migration[5.0]
  def change
    remove_column :teams, :type, :string
  end
end

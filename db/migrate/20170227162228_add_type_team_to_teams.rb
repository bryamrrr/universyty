class AddTypeTeamToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :type_team, :string
  end
end

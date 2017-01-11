class AddLevelToTeams < ActiveRecord::Migration[5.0]
  def change
    add_column :teams, :level, :int
  end
end

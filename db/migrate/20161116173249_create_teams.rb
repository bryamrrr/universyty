class CreateTeams < ActiveRecord::Migration[5.0]
  def change
    create_table :teams do |t|
      t.references :user, foreign_key: true
      t.string :sponsored
      t.string :type
      t.boolean :new

      t.timestamps
    end
  end
end

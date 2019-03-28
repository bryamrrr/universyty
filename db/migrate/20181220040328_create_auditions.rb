class CreateAuditions < ActiveRecord::Migration[5.0]
  def change
    create_table :auditions do |t|
      t.string :title
      t.string :audio
      t.string :description

      t.timestamps
    end
  end
end

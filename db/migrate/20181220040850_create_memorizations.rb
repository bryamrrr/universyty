class CreateMemorizations < ActiveRecord::Migration[5.0]
  def change
    create_table :memorizations do |t|
      t.string :translate
      t.string :audio
      t.string :description
      t.string :fonetica

      t.timestamps
    end
  end
end

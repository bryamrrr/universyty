class CreateTranscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :transcriptions do |t|
      t.string :audio
      t.string :answers

      t.timestamps
    end
  end
end

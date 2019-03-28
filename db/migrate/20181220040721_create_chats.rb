class CreateChats < ActiveRecord::Migration[5.0]
  def change
    create_table :chats do |t|
      t.string :translate
      t.string :audio
      t.string :description
      t.string :fonetica

      t.timestamps
    end
  end
end

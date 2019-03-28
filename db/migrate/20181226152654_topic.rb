class Topic < ActiveRecord::Migration[5.0]
  def change
    add_reference :auditions, :topic, foreign_key: true
    add_reference :chats, :topic, foreign_key: true
    add_reference :memorizations, :topic, foreign_key: true
    add_reference :transcriptions, :topic, foreign_key: true
  end
end

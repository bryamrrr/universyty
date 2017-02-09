class AddDurationToTopics < ActiveRecord::Migration[5.0]
  def change
    add_column :topics, :duration, :string
  end
end

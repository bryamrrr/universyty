class AddTypeToTopics < ActiveRecord::Migration[5.0]
  def change
    add_column :topics, :type, :string
  end
end

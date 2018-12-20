class AddOrderToTopics < ActiveRecord::Migration[5.0]
  def change
    add_column :topics, :order, :integer
  end
end

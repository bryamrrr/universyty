class AddPartToQuestion < ActiveRecord::Migration[5.0]
  def change
    add_reference :questions, :part, foreign_key: true
  end
end

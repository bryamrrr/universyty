class AddMinibioToProfessors < ActiveRecord::Migration[5.0]
  def change
    add_column :professors, :minibio, :string
  end
end

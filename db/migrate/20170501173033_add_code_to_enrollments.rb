class AddCodeToEnrollments < ActiveRecord::Migration[5.0]
  def change
    add_column :enrollments, :code, :string
  end
end

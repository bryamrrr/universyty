class AddInteractiveStepToEnrollments < ActiveRecord::Migration[5.0]
  def change
    add_column :enrollments, :type, :integer
  end
end

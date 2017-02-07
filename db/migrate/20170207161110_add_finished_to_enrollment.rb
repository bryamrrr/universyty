class AddFinishedToEnrollment < ActiveRecord::Migration[5.0]
  def change
    add_column :enrollments, :finished, :boolean, :default => false
  end
end

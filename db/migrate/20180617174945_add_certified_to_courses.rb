class AddCertifiedToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :certified, :boolean
  end
end

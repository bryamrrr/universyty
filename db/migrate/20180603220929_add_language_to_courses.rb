class AddLanguageToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :language, :string
  end
end
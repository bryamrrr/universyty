class AddCertificateInfoToCourses < ActiveRecord::Migration[5.0]
  def change
    add_column :courses, :certificate_info, :string
  end
end

class CreateEnrollments < ActiveRecord::Migration[5.0]
  def change
    create_table :enrollments do |t|
      t.references :user, foreign_key: true
      t.references :course, foreign_key: true
      t.integer :first_score
      t.integer :second_score
      t.integer :third_score
      t.integer :current_module
      t.integer :current_video
      t.boolean :certificate_requested
      t.string :certificate_url

      t.timestamps
    end
  end
end

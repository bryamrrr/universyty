class CreateInformation < ActiveRecord::Migration[5.0]
  def change
    create_table :information do |t|
      t.string :title
      t.text :content
      t.string :background_url
      t.string :link_url

      t.timestamps
    end
  end
end

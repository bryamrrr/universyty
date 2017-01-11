class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.references :role, foreign_key: true
      t.references :province, foreign_key: true
      t.integer :sponsor_id
      t.string :nickname
      t.string :fullname
      t.string :email
      t.string :encrypted_password
      t.string :salt
      t.string :dni
      t.string :address
      t.string :gender
      t.string :phone
      t.string :first_name
      t.string :last_name
      t.boolean :first_entry
      t.decimal :balance
      t.decimal :historical_balance
      t.boolean :preferencial
      t.boolean :ambassador
      t.boolean :ambassador_active
      t.boolean :ambassador_start
      t.integer :login_attempts
      t.boolean :block
      t.date :paydate
      t.boolean :paydate_expire

      t.timestamps
    end
  end
end

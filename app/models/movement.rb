class Movement < ApplicationRecord
  belongs_to :bono, optional: true
  belongs_to :type
  belongs_to :paymethod, optional: true
  belongs_to :user

  has_many :products, :dependent => :destroy

  def self.generate_monthly_payments
    users = User.where(ambassador: true, instructor: false)

    users.each do |user|
      if user[:paydate] && Date.today >= user[:paydate] - 3.days && user.movements.where(ambassador: true) && user.movements.where(ambassador: true).last && user.movements.where(ambassador: true).last[:status] != "No pagado" && user.movements.where(ambassador: true).last[:created_at] <= Date.today - 1.month
        puts "Si pasó el usuario con id: #{user[:id]}"
        movement = Movement.new(
          user_id: user.id,
          type_id: 2,
          status: "No pagado",
          total: 29,
          ambassador: true,
          monthly: true
        )
        if movement.save
          if user[:paydate] < Date.today
            user.update_column(:ambassador_active, false)
          end
        else
          puts movement.errors.to_json
        end
      else
        puts "No pasó el usuario con id: #{user[:id]}"
      end
    end
  end
end

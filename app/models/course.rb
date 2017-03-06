class Course < ApplicationRecord
  belongs_to :category
  belongs_to :user, optional: true

  has_many :parts
  has_many :professors
  has_many :enrollments

  before_save :default_values

  def increase_balance_instructor(user)
    if self.user_id
      instructor = User.find(self.user_id)

      if self.bono
        puts "El curso #{self.title} tiene de bono: #{self.bono}"
        value = self.bono.round

        instructor.update_attribute(:balance, instructor[:balance] + value)
        instructor.update_attribute(:historical_balance, instructor[:historical_balance] + value)

        instructor.bonos.create(
          name: 'Bono de Regalías',
          description: "Bono de Regalías (#{user[:nickname]})",
          value: value,
          course_id: self.id
        )
      end
    end
  end

  private
  def default_values
    self.published ||= false
  end
end

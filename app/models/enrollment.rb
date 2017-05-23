class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  has_many :grades, :dependent => :destroy

  before_save :default_values

  def calcGrade
    sum = 0
    counter = 0
    self.grades.each do |grade|
      if grade[:score] >= 14
        sum += grade[:score]
        counter += 1
      end
    end

    total = sum / counter
    self.update_column(:first_score, total)
  end

  def generate_certificate_code
    info = Information.find_by(title: "code")
    code = info[:content] + info[:value].to_s
    zeros = 7 - code.length
    zeros.times do
      code.insert(3, "0")
    end
    self.update_column(:code, code)
    info.update_column(:value, info[:value] + 1)
  end

  private
    def default_values
      self.current_module ||= 1;
      self.current_video ||= 1;
    end
end

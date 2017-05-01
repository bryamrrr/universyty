class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  has_many :grades, :dependent => :destroy

  before_save :default_values

  def calcGrade
    grades = self.grades
    notes = Array.new(1)
    counter = 0
    minCounter = 0
    sum = 0
    grades.each do |grade|
      notes[counter] = 0 if notes[counter].nil?
      notes[counter] += grade[:score]
      minCounter += 1
      if grade[:score] >= 14
        notes[counter] = notes[counter] / minCounter
        minCounter = 0
        counter += 1
      end
    end

    notes.map { |item|
      sum += item
    }

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
  end

  private
    def default_values
      self.current_module ||= 1;
      self.current_video ||= 1;
    end
end

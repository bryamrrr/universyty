class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course

  has_many :grades, :dependent => :destroy

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
end

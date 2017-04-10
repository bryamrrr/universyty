class Part < ApplicationRecord
  belongs_to :course

  has_many :topics, -> { order 'number asc' }
  has_many :questions
  has_many :grades
end

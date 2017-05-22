class Part < ApplicationRecord
  belongs_to :course

  has_many :topics, -> { order 'number asc' },  dependent: :destroy
  has_many :questions,  dependent: :destroy
  has_many :grades,  dependent: :destroy
end

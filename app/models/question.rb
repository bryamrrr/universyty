class Question < ApplicationRecord
  belongs_to :part

  has_many :alternatives,  dependent: :destroy
end

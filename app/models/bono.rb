class Bono < ApplicationRecord
  belongs_to :user
  belongs_to :course, optional: true
end

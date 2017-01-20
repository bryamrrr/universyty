class Product < ApplicationRecord
  belongs_to :movement
  belongs_to :course, optional: true
  belongs_to :plan, optional: true
end

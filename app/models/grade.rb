class Grade < ApplicationRecord
  belongs_to :enrollment
  belongs_to :part
end

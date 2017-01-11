class Department < ApplicationRecord
  belongs_to :country

  has_many :provinces
end

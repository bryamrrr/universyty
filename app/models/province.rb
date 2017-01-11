class Province < ApplicationRecord
  belongs_to :department

  has_many :users
end

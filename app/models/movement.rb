class Movement < ApplicationRecord
  belongs_to :bono, optional: true
  belongs_to :type
  belongs_to :paymethod
  belongs_to :user

  has_many :products
end

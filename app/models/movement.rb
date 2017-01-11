class Movement < ApplicationRecord
  belongs_to :bono
  belongs_to :type
  belongs_to :paymethod
  belongs_to :user
end

class Team < ApplicationRecord
  belongs_to :user

  before_save :default_values

  private
  def default_values
    self.new = true
  end
end

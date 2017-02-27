class Team < ApplicationRecord
  belongs_to :user

  before_save :default_values

  private
  def default_values
    if self.new.nil?
      self.new ||= true
    end
  end
end

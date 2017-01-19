class Course < ApplicationRecord
  belongs_to :category
  belongs_to :user, optional: true

  has_many :parts
  has_many :professors

  before_save :default_values

  private
  def default_values
    self.published ||= false
  end
end

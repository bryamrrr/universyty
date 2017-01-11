class Course < ApplicationRecord
  belongs_to :category

  has_many :parts

  before_save :default_values

  private
  def default_values
    self.published ||= false
  end
end

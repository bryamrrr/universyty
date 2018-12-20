class Topic < ApplicationRecord
  belongs_to :part
  has_many :auditions
  has_many :chats
  has_many :memorizations
  has_many :transcriptions
end

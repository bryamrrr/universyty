class User < ApplicationRecord
  attr_accessor :password

  belongs_to :role
  belongs_to :province

  has_many :tokens, :dependent => :destroy
  has_many :enrollments
  has_many :movements
  has_many :teams

  validates :nickname, presence: true, uniqueness: true
  validates_length_of :nickname, :in => 2..15
  validates :email, presence: true, email: true
  validates :role, presence: true
  validates :province, presence: true
  validates :password, presence: true, on: :create
  validates :dni, presence: true, uniqueness: true
  validates_format_of :password, :with => /\A(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*\z/, on: :create

  before_create :encrypt_password
  before_save :default_values

  private
  def default_values
    self.first_entry ||= false
    self.balance ||= 0
    self.historical_balance ||= 0
    self.preferencial ||= false
    self.ambassador ||= false
    self.ambassador_active ||= false
    self.ambassador_start ||= false
    self.login_attempts ||= 0
    self.block ||= false
    self.paydate_expire ||= false
  end

  private
  def encrypt_password
    self.salt = BCrypt::Engine.generate_salt
    self.encrypted_password= BCrypt::Engine.hash_secret(password, salt)
  end

  def self.authenticate(data)
    user = User.find_by(nickname: data[:nickname])
    if (user)
      encrypted_password = BCrypt::Engine.hash_secret(data[:password], user[:salt])
      if user[:encrypted_password] == encrypted_password
        return user
      else
        return false
      end
    else
      return false
    end
  end

  def self.change(old_password, new_password, nickname)
    user = User.find_by(nickname: nickname)
    if (user)
      encrypted_password = BCrypt::Engine.hash_secret(old_password, user[:salt])
      if user[:encrypted_password] == encrypted_password
        new_encrypted_password = BCrypt::Engine.hash_secret(new_password, user[:salt])
        user.update(encrypted_password: new_encrypted_password)
      else
        return false
      end
    else
      return false
    end
  end
end

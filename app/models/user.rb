class User < ApplicationRecord
  attr_accessor :password, :reset_token

  belongs_to :role
  belongs_to :province, optional: true

  has_many :tokens, :dependent => :destroy
  has_many :enrollments
  has_many :movements
  has_many :teams
  has_many :courses
  has_many :grades

  validates :nickname, presence: true, uniqueness: true
  validates_length_of :nickname, :in => 2..15
  validates :email, presence: true, email: true
  validates :role_id, presence: true
  validates :password, presence: true, on: :create
  validates_format_of :password, :with => /\A(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*\z/, on: :create

  before_create :encrypt_password
  before_save :default_values

  def create_reset_digest
    self.reset_token = User.new_token
    update_attribute(:reset_digest,  User.digest(reset_token, salt))
    update_attribute(:reset_sent_at, Time.zone.now)
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  def password_reset_exists?(token)
    BCrypt::Engine.hash_secret(token, salt) == reset_digest
  end

  def change_with_token(new_password)
    encrypted_password = BCrypt::Engine.hash_secret(new_password, salt)
    update_attribute(:encrypted_password, encrypted_password)
  end

  private
    def default_values
      self.first_entry ||= false
      self.balance ||= 0
      self.historical_balance ||= 0
      self.preferencial ||= false

      if self.instructor
        self.ambassador = true
        self.ambassador_active = true
        self.ambassador_start = true
      else
        self.ambassador ||= false
        self.ambassador_active ||= false
        self.ambassador_start ||= false
      end

      self.login_attempts ||= 0
      self.block ||= false
      self.paydate_expire ||= false
    end

    def encrypt_password
      self.salt = BCrypt::Engine.generate_salt
      self.encrypted_password= BCrypt::Engine.hash_secret(password, salt)
    end

    def self.new_token
      SecureRandom.urlsafe_base64
    end

    def self.digest(string, salt)
      BCrypt::Engine.hash_secret(string, salt)
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
end

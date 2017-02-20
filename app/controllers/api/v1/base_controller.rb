class Api::V1::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token, :if => Proc.new { |c| c.request.format == 'application/json' }

  before_action :authenticate
  before_action :set_headers

  def authenticate
    @token_str = bearer_token
    token = Token.find_by(token: @token_str)

    if token.nil? || !token.is_valid?
      render :json => { :error => "Token inválido" }, status: :unauthorized
    else
      @current_user = token.user
    end
  end

  def bearer_token
    pattern = /^Bearer /
    header  = request.headers["Authorization"]
    header.gsub(pattern, '') if header && header.match(pattern)
  end

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end
end
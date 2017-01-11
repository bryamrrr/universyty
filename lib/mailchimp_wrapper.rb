module MailchimpWrapper

  def self.subscribe(user)
    mailchimp = Mailchimp::API.new(ENV['MAILCHIMP_API_KEY'])
    merge_vars = merge_vars_hash(user)
    mailchimp.lists.subscribe(
      ENV['MAILCHIMP_LIST_ID'],
      { email: user[:email] },
      merge_vars,
      'html',
      false,
      true,
      false,
      false
      )
  end

  def self.merge_vars_hash(user)
    province = Province.find(user[:province_id])

    merge_vars = {}
    merge_vars[:nickname] = user[:nickname]
    merge_vars[:fullname] = user[:fullname]
    merge_vars[:province] = province[:name]
    merge_vars[:email] = user[:email]
    merge_vars[:dni] = user[:dni]
    merge_vars[:sponsor] = user[:sponsor] unless user[:sponsor].blank?
    merge_vars

  end

end
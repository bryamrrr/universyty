namespace :scheduler do
  task :monthly_payments => :environment do
    Movement.generate_monthly_payments
  end
end
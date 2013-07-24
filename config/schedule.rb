# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

set :output, "#{path}/log/cron.log"

Time.zone = "US/Eastern"

every 1.day, at: "11:50 AM" do
  runner "UserMailer.reflection_email(User.find(1)).deliver"
end

every 1.day, at: "4:50 PM" do
  runner "UserMailer.reflection_email(User.find(1)).deliver"
end

every 1.day, at: "7:50 AM" do
  runner "UserMailer.reflection_email(User.find(1)).deliver"
end

# every 1.day, :at => Time.zone.parse('11:36am').utc do
#   runner "UserMailer.reflection_email(User.find(1)).deliver"
# end

every 15.minutes do 
  runner "User.find(1).entries.build(message: 'scheduled entry right here')"
  runner "User.find(1).save"
end
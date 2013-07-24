desc "This is a reflection email, sent once per day by default"
task :reflection_email => :environment do
    User.all.each do |u|
      puts "Sending reflection email to" + u.email
      UserMailer.reflection_email(u).deliver
      puts "Reflection email sent to" + u.email
    end
  end
end


# every 1.day, at: "11:50 AM" do
#   runner "UserMailer.reflection_email(User.find(1)).deliver"
# end

# every 1.day, at: "4:50 PM" do
#   runner "UserMailer.reflection_email(User.find(1)).deliver"
# end

# every 1.day, at: "7:50 AM" do
#   runner "UserMailer.reflection_email(User.find(1)).deliver"
# end

# # every 1.day, :at => Time.zone.parse('11:36am').utc do
# #   runner "UserMailer.reflection_email(User.find(1)).deliver"
# # end

# every 15.minutes do 
#   runner "User.find(1).entries.build(message: 'scheduled entry right here')"
#   runner "User.find(1).save"
# end
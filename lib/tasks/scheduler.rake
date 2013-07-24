desc "This is a reflection email, sent once per day by default"
task :reflection_email => :environment do
  User.all.each do |u|
    puts "Sending reflection email to " + u.email
    UserMailer.reflection_email(u).deliver
    puts "Reflection email sent to " + u.email
  end
end

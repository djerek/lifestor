namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do

      40.times do |n|
        name = Faker::Name.name
        email = "example" + "#{n+1}" + "@example.org"
        password = "example"
        User.create!(
          first_name: name,
          email: email, 
          password: password, 
          password_confirmation: password
          )
      end

      40.times do |n|
        name = (0...5).map{(65+rand(26)).chr}.join
        ActsAsTaggableOn::Tag.create!(name: name)
      end
  end
end
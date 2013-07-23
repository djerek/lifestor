class UserMailer < ActionMailer::Base
  default from: "aaron@lifestor.com"

  def welcome_email(user)
    @user = user
    @url  = 'http://lifestor.com/login'
    mail(to: @user.email, subject: 'Welcome to Lifestor!')
  end

  def reflection_email(user)

    # Should we be looking for current_user here?

    @user = user
    @url = 'http://localhost:3000/entries/new?message_type=reflection'
    mail(to: @user.email, subject: 'Pause and Reflect')
  end
end

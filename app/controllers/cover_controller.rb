class CoverController < ApplicationController
  before_filter :authenticate_user!, except: [:home, :help]

  def home
  end

  def help
  end

  def welcome
  end

  def snapshot
  end

  def happening
  end

  def reflection
  end

  def concept
  end

  def tagging
  end

  def sampleday
  end

end

require 'spec_helper'

describe "Cover" do

  describe "Home" do

    it "should have a custom page title" do
      visit '/home'
      expect(page).to have_title("Welcome to Lifestor")
    end

  end
end
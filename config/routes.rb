Project2::Application.routes.draw do  
  
  as :user do
    get "login" => "devise/sessions#new", :as => :new_user_session
    post 'login' => 'devise/sessions#create', :as => :user_session
    match "logout" => "devise/sessions#destroy", :as => :destroy_user_session, via: [:get, :post]
      # :via => Devise.mappings[:user].sign_out_via
  end

  resources :entries
  resources :locations
  devise_for :users, :skip => [:sessions], :controllers => { :registrations => "registrations" }
  resources :users

  root :to => "users#index"

  get 'welcome' => 'cover#welcome'
  get 'home' => 'cover#home'
  # get "entries/tags" => "entries#tags", :as => :tags
  get "locations/showmap"
end

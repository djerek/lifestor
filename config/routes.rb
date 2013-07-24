Project2::Application.routes.draw do  
  get "cover/home"
  get "cover/help"
  get "cover/welcome"
  get "static_pages/home"
  get "static_pages/help"
  get "locations/showmap"
  get "locations/current_location"
  resources :questions
  resources :entries
  resources :locations
  devise_for :users, :skip => [:sessions]
  resources :users

  root :to => "locations#showmap"

  as :user do
    get "login" => "devise/sessions#new", :as => :new_user_session
    post 'login' => 'devise/sessions#create', :as => :user_session
    match "logout" => "devise/sessions#destroy", :as => :destroy_user_session, via: [:get, :post]
  end
end

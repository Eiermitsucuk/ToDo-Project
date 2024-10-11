Rails.application.routes.draw do
  devise_for :users
  resources :to_dos do
    member do
      patch :update_status  # Adds a route for updating the status via PATCH
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "to_dos#index"
end

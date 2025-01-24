Rails.application.routes.draw do
  # Setup for user authentication with Devise
  devise_for :users

  # Root path setup to direct to the ToDos index action
  root "to_dos#index"

  delete '/to_dos/:id', to: 'to_dos#destroy'

  # Resourceful routes for ToDos, ensuring all RESTful actions are included
  resources :to_dos do
    # Custom member route for updating the status of a ToDo item via PATCH
    member do
      patch :update_status
    end
  end

  # Simple health check route that returns 200 if the app is running without exceptions
  get "up" => "rails/health#show", as: :rails_health_check
end

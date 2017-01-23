Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/", to: "public#home"

  get 'campus/*path' => 'campus#index'
  get 'admin/*path' => 'admin#index'

  get "/certificados", to: "public#certificates"
  get "/embajadores", to: "public#money"
  get "/login", to: "public#login"
  get "/registro", to: "public#register"
  get "/bienvenido", to: "public#welcome"
  get "/instructores", to: "public#instructor"

  get "/cursos", to: "courses#index"
  get "/cursos/:id", to: "courses#show", as: 'course'

  post "/registro", to: "users#create"

  namespace :api, defaults: { format: "json" } do
    namespace :v1 do
      resources :users, except: [:new, :edit]
      post 'users/login', to: 'users#login'
      post 'users/logout', to: 'users#logout'
      put 'users/:nickname/change_password', to: 'users#change_password'
      put 'users/:id/block', to: 'users#block'
      get 'users/:id/courses', to: 'users#courses'
      get 'users/students/all', to: 'users#students'
      get 'users/instructors/all', to: 'users#instructors'
      get 'users/admins/all', to: 'users#admins'

      resources :provinces, only: [:index]
      resources :categories, except: [:new, :edit]

      resources :courses, except: [:new, :edit]
      get 'courses/:id/modules', to: 'courses#modules'
      get 'courses/:id/professors', to: 'courses#professors'
      get 'courses/:id/change_state', to: 'courses#change_state'
      get 'courses/categories/:slug', to: 'courses#find_by_slug'
      get 'courses/categories-id/:id', to: 'courses#find_by_category'
      get 'courses/text/:text', to: 'courses#find_by_text'

      resources :parts, only: [:show, :destroy, :create]
      get 'parts/:id/topics', to: 'parts#topics'
      get 'parts/:id/questions', to: 'parts#questions'

      resources :topics, only: [:show, :destroy, :create, :update]

      resources :questions, except: [:index, :new, :edit]
      get 'questions/:id/alternatives', to: 'questions#alternatives'

      resources :alternatives, except: [:index, :new, :edit]

      resources :professors, except: [:new, :edit]

      resources :movements, only: [:destroy]
      post 'movements/payment/:paymethod', to: 'movements#payment'
      get 'movements/:nickname/payments', to: 'movements#payments'
      get 'movements/pendings', to: 'movements#payments_pending'
      get 'movements/paids', to: 'movements#payments_paid'
      get 'movements/:id/change_activate', to: 'movements#change_activate'
    end
  end
end

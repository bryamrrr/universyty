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

      resources :provinces, only: [:index]
      resources :categories, except: [:new, :edit]

      resources :courses, except: [:new, :edit]
      get 'courses/:id/modules', to: 'courses#modules'
      get 'courses/:id/change_state', to: 'courses#change_state'
      get 'courses/categories/:slug', to: 'courses#find_by_slug'

      resources :parts, only: [:show, :destroy, :create]
      get 'parts/:id/topics', to: 'parts#topics'
      get 'parts/:id/quiz', to: 'parts#quiz'

      resources :topics, only: [:show, :destroy, :create, :update]

      resources :quizzes, only: [:show, :update]
    end
  end
end

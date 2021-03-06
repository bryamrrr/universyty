Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get "/", to: "public#home"

  get 'campus/*path' => 'campus#index'
  get 'admin/*path' => 'admin#index'

  get "/certificados", to: "public#certificates"
  get "/embajadores", to: "public#money"
  get "/login", to: "public#login"
  get "/registro", to: "public#register"
  get "/registro/:nickname", to: "public#register"
  get "/bienvenido", to: "public#welcome"
  get "/instructores", to: "public#instructor"

  get "/cursos", to: "courses#index"
  get "/cursos/:id", to: "courses#show", as: 'course'

  post "/registro/:nickname", to: "users#create"
  post "/registro", to: "users#create"

  resources :passwords, only: [:new, :create, :edit, :update]

  namespace :api, defaults: { format: "json" } do
    namespace :v1 do
      resources :users, except: [:new, :edit]
      post 'users/login', to: 'users#login'
      post 'users/logout', to: 'users#logout'
      post 'users/confirm_password', to: 'users#confirm_password'
      put 'users/:nickname/change_password', to: 'users#change_password'
      put 'users/:nickname/change_bank', to: 'users#change_bank'
      put 'users/:id/block', to: 'users#block'
      get 'users/:id/courses', to: 'users#courses'
      get 'users/students/all', to: 'users#students'
      get 'users/instructors/all', to: 'users#instructors'
      get 'users/admins/all', to: 'users#admins'
      get 'users/ambassadors/all', to: 'users#ambassadors'
      get 'users/totals/all', to: 'users#totals'

      resources :provinces, only: [:index]
      resources :categories, except: [:new, :edit]

      resources :courses, except: [:new, :edit]
      get 'courses_starred', to: 'courses#show_starred'
      get 'courses/:id/modules', to: 'courses#modules'
      get 'courses/:id/professors', to: 'courses#professors'
      get 'courses/:id/change_state', to: 'courses#change_state'
      get 'courses/categories/:slug', to: 'courses#find_by_slug'
      get 'courses/categories-id/:id', to: 'courses#find_by_category'
      get 'courses/text/:text', to: 'courses#find_by_text'

      resources :parts, only: [:show, :update, :destroy, :create]
      get 'parts/:id/topics', to: 'parts#topics'
      get 'parts/:id/questions', to: 'parts#questions'

      resources :topics, only: [:show, :destroy, :create, :update]

      resources :questions, except: [:index, :new, :edit]
      get 'questions/:id/alternatives', to: 'questions#alternatives'
      get 'questions/:id/check/:alternative_id', to: 'questions#check'

      resources :alternatives, except: [:index, :new, :edit]

      resources :professors, except: [:new, :edit]

      resources :movements, only: [:index, :destroy]
      post 'movements/payment/:paymethod', to: 'movements#payment'
      post 'movements/ambassador/:paymethod', to: 'movements#ambassador'
      get 'movements/:nickname/payments', to: 'movements#payments'
      get 'movements/:nickname/ambassador_payments', to: 'movements#ambassador_payments'
      get 'movements/pendings', to: 'movements#payments_pending'
      get 'movements/paids', to: 'movements#payments_paid'
      get 'movements/:id/change_activate', to: 'movements#change_activate'

      post 'movements/transfer', to: 'movements#transfer'
      post 'movements/pay', to: 'movements#pay'
      post 'movements/debt', to: 'movements#debt'
      post 'movements/withdraw', to: 'movements#withdraw'

      post 'movements/culqi', to: 'movements#culqi'

      get 'movements/:id/finish_retire', to: 'movements#finish_retire'
      get 'movements/:id/cancel_retire', to: 'movements#cancel_retire'

      get 'movements/outcomes', to: 'movements#outcomes'

      resources :enrollments, only: [:destroy, :update]
      get 'enrollments/free/:id', to: 'enrollments#free'
      get 'enrollments/users/:id', to: 'enrollments#find_by_user'
      get 'enrollments/courses/:id/:part/:topic', to: 'enrollments#find_by_course'
      post 'enrollments/update_grade_course/:id', to: 'enrollments#update_grade_course'
      get 'enrollments/repeat_course/:id', to: 'enrollments#repeat_course'
      get 'enrollments/next_module/:id', to: 'enrollments#next_module'
      get 'enrollments/find_completed', to: 'enrollments#find_completed'
      get 'enrollments/:id/request_certificate', to: 'enrollments#request_certificate'
      get 'enrollments/certificates_requested', to: 'enrollments#certificates_requested'
      put 'enrollments/:id/update_certificate', to: 'enrollments#update_certificate'
      get 'enrollments/:code/verificate', to: 'enrollments#verificate'

      resources :teams, only: [:index]
      get 'teams/:nickname/students', to: 'teams#students'
      get 'teams/:nickname/ambassadors', to: 'teams#ambassadors'
      get 'teams/:nickname/ambassadors/:level', to: 'teams#ambassadors_by_level'
      get 'teams/view_teams', to: 'teams#view_teams'
      get 'teams/search/:text', to: 'teams#search'
      get 'teams/search/:text/:nickname', to: 'teams#search_by_user'

      # Information
      get 'informations/show_welcome_image', to: 'informations#show_welcome_image'
      put 'informations/update_welcome_image', to: 'informations#update_welcome_image'

      resources :bonos, only: [:index]
      get 'bonos/contingency', to: 'bonos#contingency_list'
      post 'bonos/contingency', to: 'bonos#contingency_change'
    end
  end
end

Rails.application.routes.draw do
  root 'timesheet#index' 

  #get   'jira_sessions/new' => 'jira_sessions#new', as: 'new_jira_sessions'
  get       'jira_sessions/authorize' => 'jira_sessions#authorize', as: 'authorize_jira_session'
  resources :jira_sessions, only: [:new, :destroy]

  get       '/api/timelogs', to: 'timesheet#timelogs'
  get       '/api/issue/my', to: 'jira_api#issue_assigned_to_me_json'
  get       '/api/issue/my_team', to: 'jira_api#issue_assigned_to_my_team_json'
  get       '/api/issue/last_viewed', to: 'jira_api#issue_last_viewed_json'
  get       '/api/issue/admin', to: 'jira_api#issue_admin_json'
  get       '/api/issue/my_testing', to: 'jira_api#issue_my_testing_json'
  get       '/api/issue/search', to: 'jira_api#search_issue'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

Rails.application.routes.draw do
  resources :journal
  match "*all" => "application#cors_preflight_check", :via => ['OPTIONS']

end

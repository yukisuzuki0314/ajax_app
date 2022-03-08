Rails.application.routes.draw do
  root to: 'posts#index' # 投稿されたメモ一覧をトップページに表示する仕様
  post 'posts', to: 'posts#create'
end

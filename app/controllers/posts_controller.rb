class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC") # メモを降順、つまり、投稿の新しい順に表示
  end

  #def new
  #end

  def create
    post = Post.create(content: params[:content])  # 新たに投稿されたメモの内容を変数postに格納
    render json:{ post: post }  # 定義した変数postの値を、postというキーとセットでJavaScriptに送信
  end                           #json:の部分をjsonオプション、指定すると、直後に記述した{ post: post }というデータをJSON形式で返却
end

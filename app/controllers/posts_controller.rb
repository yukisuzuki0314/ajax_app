class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC") # メモを降順、つまり、投稿の新しい順に表示
  end

  #def new
  #end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index # 追記
  end
end

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {  //eはイベントオブジェクト(どんな文字列を指定してもOK) 今回だと、「投稿ボタンをクリックした」という情報を持ったオブジェクト
    e.preventDefault();                      //preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化
    const form = document.getElementById("form");  //getElementByIdメソッドで取得したフォームの要素を変数formに格納
    const formData = new FormData(form);  //FormDataとは、フォームに入力された値を取得できるオブジェクトのこと
    const XHR = new XMLHttpRequest();  //非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true);  //リクエストの内容を指定 HTTPメソッド、パス、非同期通信であるかをtrueかfalse
    XHR.responseType = "json";  //レスポンスのデータフォーマット（＝どのような形式のデータにするか）を指定するプロパティ
    XHR.send(formData);  //リクエストを送信するメソッド フォームに入力された内容をサーバー側に送信
  });
};

window.addEventListener('load', post);
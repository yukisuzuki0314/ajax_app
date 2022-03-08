const buildHTML = (XHR) => {            //関数buildHTMLの返り値にhtmlを指定。5~13行目で定義した変数html。投稿後に新たに生成されたHTMLのことを指す。
  const item = XHR.response.post;       //responseプロパティとは、サーバーからのレスポンスに関する情報が格納されたプロパティ
                                             // XHR.response.postで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
                                              // item内に格納されたメモの情報を元にして、ブラウザに描画するためのHTMLを生成し、変数htmlに格納。
  const html = ` 
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

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
    XHR.onload = () => {                  // onloadプロパティとは、リクエストの送信が成功したときに呼び出されるプロパティ
      if (XHR.status != 200) {                           // 200以外のHTTPステータスコードが返された場合はエラーメッセージが表示される。XHR.statusには、HTTPステータスコードが格納される。
        alert(`Error ${XHR.status}: ${XHR.statusText}`);  // XHR.statusTextには、ステータスコードに応じたメッセージが格納される。
        return null;                    // return null;によってJavaScriptの処理から抜け出すことができます。
      };                                // エラーが出た場合に、これ以降に記述されている処理を行わないようにすることが目的です。
      const list = document.getElementById("list");  // 新しいメモを挿入するための要素を取得して、変数listに格納
      const formText = document.getElementById("content");  // リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      list.insertAdjacentHTML("afterend", html);  // insertAdjacentHTMLメソッドの第一引数にafterendを指定、変数listに格納された要素の直後に生成したHTMLを挿入
      formText.value = "";                       // formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセット
    };
  });
};

window.addEventListener('load', post);
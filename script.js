body {
    margin: 0;
  }
  button {
    background: transparent; /* 画像の背景を透過 */
    border: none;
  }
  
  /* 追加分CSS↓ */
  #finalconfirmation {
    display: flex;
    flex-direction: column; /* 縦に並べる */
    justify-content: center; /* 縦方向の中央に配置 */
    align-items: center; /* 横方向の中央に配置 */
    height: 100vh; /* ビューポートの高さ全体を使用 */
    text-align: center; /* テキストを中央揃え */
  }
  
  #typeselect,
  #cameraselect,
  #tempselect,
  #Beforeshooting {
    display: flex;
    justify-content: center; /* 横幅の真ん中に配置 */
    align-items: center; /* 縦方向の中央に配置 */
    height: 100vh; /* ビューポートの高さ全体を使用 */
    text-align: center;
  }
  #kiyaku {
    text-align: center;
  
    /* font-family: "BIZ UD Gothic", "Noto Sans JP", "Arial", sans-serif; */
    align-items: center; /* 内部テキストを垂直方向に中央に配置（任意） */
    justify-content: center; /* 内部テキストを水平方向に中央に配置（任意） */
  }
  #tezyun {
    text-align: left;
  }
  #kiyakudoui,
  #startshoot {
    padding: 20px 40px;
    margin: 20px;
    border: none;
    cursor: pointer;
    font-size: 30px;
  }
  
  #tops,
  #bottoms {
    color: black;
    width: 100%;
    height: 100px;
    margin: 0;
    border-top: 1px solid black;
    border-right: none; /* 右辺にボーダーなし */
    border-bottom: none; /* 下辺にボーダーなし */
    border-left: none; /* 左辺にボーダーなし */
    font-size: 18px;
  }
  #dress {
    color: black;
    width: 100%;
    height: 100px;
    margin: 0;
    border-top: 1px solid black;
    border-right: none; /* 右辺にボーダーなし */
    border-bottom: 1px solid black; /* 下辺にボーダーなし */
    border-left: none; /* 左辺にボーダーなし */
    font-size: 18px;
  }
  .button-img {
    width: 24px; /* 画像の幅 */
    height: 24px; /* 画像の高さ */
    margin-right: 10px; /* 画像とテキストの間隔 */
    margin-left: 0;
  }
  .topbottom,
  #outcamera {
    color: black;
    width: 100%;
    height: 100px;
    margin: 0;
    border-top: 1px solid black;
    border-right: none; /* 右辺にボーダーなし */
    border-bottom: none; /* 下辺にボーダーなし */
    border-left: none; /* 左辺にボーダーなし */
    font-size: 18px;
  }
  #incamera {
    color: black;
    width: 100%;
    height: 100px;
    margin: 0;
    border-top: 1px solid black;
    border-right: none; /* 右辺にボーダーなし */
    border-bottom: 1px solid black;
    border-left: none; /* 左辺にボーダーなし */
    font-size: 18px;
  }
  .scroll-box {
    height: 400px;
    overflow-x: scroll; /* 横スクロールを可能にする */
    padding-bottom: 10px; /* スクロールバーのためのパディング */
    -webkit-overflow-scrolling: touch; /* スムーズなスクロールを提供 */
  }
  
  .scroll-box::-webkit-scrollbar {
    height: 0; /* スクロールバーの高さ */
  }
  .f_area {
    width: 2000px;
    display: flex; /* 子要素を横に並べるためのフレックスボックス */
    flex-wrap: nowrap; /* 子要素が折り返されないようにする */
  }
  
  .scroll-box .f_area button {
    flex: 0 0 80%; /* 各ボタンの幅を親要素の80%に設定 */
    margin-right: 10px; /* ボタン間のスペース */
    box-sizing: border-box; /* ボックスサイズにパディングを含める */
  }
  /* .scroll-box .f_area .f_one {
    width: 33.333%;
  } */
  .scroll-box .f_area button img {
    width: 100%; /* 画像の幅を親要素に合わせる */
    height: auto; /* 画像の高さを自動調整 */
    vertical-align: top;
  }
  
  #photoF,
  #photoB {
    max-width: 300px;
  }
  .photostyle {
    text-align: center;
  }
  .retakestyle,
  #nextshoot,
  #Shootingfinish {
    width: 300px;
    height: 60px;
  }
  .retakestyle {
    margin-top: 10%;
  }
  #sleeve1 button {
    color: black;
    width: 100%;
    height: 100px;
    margin: 0;
    border-top: 1px solid black;
    border-right: none; /* 右辺にボーダーなし */
    border-bottom: none; /* 下辺にボーダーなし */
    border-left: none; /* 左辺にボーダーなし */
    font-size: 18px;
  }
  
  /* 追加分CSS↑ */
  .scr {
    display: none;
  }
  .camera-container {
    position: relative;
    width: 100%; /* コンテナの幅を100%に設定 */
    padding-top: 133.33%; /* 3:4 のアスペクト比に基づく高さ (4/3 = 1.3333 = 133.33%) */
    max-width: 800px;
  }
  #video,
  #video2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  
    /* height: 600px; */
    /* 縦幅を固定 */
    /* 横幅は自動調整 */
    object-fit: cover; /* コンテンツのアスペクト比を保持しつつ、要素のサイズに合わせる */
  }
  #canvas,
  #canvas2 {
    width: 100%;
    height: 100%;
  }
  .guide-frame,
  .guide-frame2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    /* overflow: hidden; */
    background-size: cover; /* 画像をガイドフレームに合わせて拡大縮小 */
    pointer-events: none; /* ガイド枠がクリックを妨げないようにする */
  }
  .btnGroup {
    position: absolute;
    bottom: 10px;
    left: 50%; /* 左から50%の位置に配置（画面の中央） */
    transform: translateX(-50%); /* 左右に50%の幅をシフトして中央揃え */
    gap: 10px; /* ボタン間のスペース（調整可能） */
  }
  #capture,
  #toggle-camera,
  #upbtn,
  #capture2,
  #toggle-camera2,
  #upbtn2 {
    width: 50px;
    height: 50px;
  }
  
  /* メニュー */
  header {
    background-color: #333;
    color: white;
    height: 89px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative; /* 位置を固定するために relative を設定 */
    z-index: 2; /* メニューより上に表示されるように z-index を設定 */
  }
  
  #menu-icon {
    background: transparent; /* 画像の背景を透過 */
    border: none;
  }
  #back-button {
    background: transparent; /* 画像の背景を透過 */
    border: none;
  }
  
  #nav-menu {
    display: none;
    position: absolute;
    top: 100%; /* ヘッダーの下にメニューが表示されるように設定 */
    left: 0;
    width: 100%;
    background-color: #333;
    overflow: hidden;
    height: 0; /* 初期状態では高さを0にする */
    transition: height 0.3s ease-out; /* 高さのアニメーション */
  }
  
  #nav-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  #nav-menu ul li {
    padding: 10px;
    border-bottom: 1px solid #444;
  }
  
  #nav-menu ul li a {
    color: white;
    text-decoration: none;
    display: block;
  }
  
  /* メニューが表示されたときの状態 */
  #nav-menu.show {
    height: auto; /* 自動で高さを設定する */
    display: block;
  }
  /* 背景を暗くするオーバーレイ */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 半透明の黒 */
    display: none;
    z-index: 1; /* メニューより下に表示されるように設定 */
  }
  .overlay.show {
    display: block; /* 追加: オーバーレイの表示/非表示を制御 */
  }
  
  /* タイマー */
  #timer {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2em;
    color: red;
    display: none; /* 初期状態では表示しない */
  }
  

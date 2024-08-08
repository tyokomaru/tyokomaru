/* <script> */
"use strict";


//画面遷移（表示非表示）の設定
let screenCount = 0;
const screennum = document.getElementsByClassName("scr");
console.log(screennum); //確認用コンソール


function showScreen(index) {
  for (let i = 0; i < screennum.length; i++) {
    screennum[i].style.display = i === index ? "block" : "none";
  }
}
// 初期表示
showScreen(screenCount);


let katagami = 0;
//↑型紙の種類がトップス＝1,ボトムス＝2


//規約同意ボタン
const kiyakudoui = document
  .getElementById("kiyakudoui")
  .addEventListener("click", () => {
    screenCount = 1;
    console.log(screenCount);
    showScreen(screenCount);
  });
//トップスボトムスボタン
const tops = document.getElementById("tops").addEventListener("click", () => {
  katagami = 1;
  katagamiEvent();
  screenCount = 2;
  console.log(screenCount);
  showScreen(screenCount);
});
const bottoms = document
  .getElementById("bottoms")
  .addEventListener("click", () => {
    katagami = 2;
    katagamiEvent();


    screenCount = 2;
    console.log(screenCount);
    showScreen(screenCount);
  });
//内カメ外カメ設定ボタン
//内↓
const incamera = document
  .getElementById("incamera")
  .addEventListener("click", () => {
    screenCount = 3;
    console.log(screenCount);
    showScreen(screenCount);
  });
//外カメ
const outcamera = document
  .getElementById("outcamera")
  .addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();


    screenCount = 3;
    console.log(screenCount);
    showScreen(screenCount);
  });


//テンプレ選択画面
const temp = document.getElementById("temp").addEventListener("click", () => {
  screenCount = 4;
  console.log(screenCount);
  showScreen(screenCount);
});


function katagamiEvent() {
  // JavaScriptでボタンを挿入するコード
  // document.addEventListener("DOMContentLoaded", () => {});


  // idはボタンコンテナ
  const buttonContainer = document.getElementById("button-container");


  //トップスの選択肢
  let topstemp = [
    "短丈Tシャツ",
    "ビッグシルエットTシャツ",
    "パーカー",
    "カラーシャツ",
    "テンプレートを使用しない",
  ]; //後にimgファイルにする
  //ボトムスの選択肢
  let bottomstemp = ["パンツ", "台形ミニスカート", "テンプレートを使用しない"];


  // ボタンコンテナ内の既存のボタンを削除
  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }


  if (katagami == 1) {
    // 1から5までのボタンを生成して挿入
    for (let i = 0; i < topstemp.length; i++) {
      // 新しいボタン要素を作成
      const button = document.createElement("button");
      button.textContent = topstemp[i]; // ボタンのテキストを設定
      buttonContainer.appendChild(button); // コンテナにボタンを追加
    }
  } else if (katagami == 2) {
    // ボタンを生成して挿入
    for (let i = 0; i < bottomstemp.length; i++) {
      // 新しいボタン要素を作成
      const button = document.createElement("button");
      button.textContent = bottomstemp[i]; // ボタンのテキストを設定
      buttonContainer.appendChild(button); // コンテナにボタンを追加
    }
  } else if (katagami > 2) {
    window.alert("型紙がありません");
  }
}


//撮影開始ボタンにて、カメラ画面への切り替えと、カウントを１回目に設定
const startshoot = document
  .getElementById("startshoot")
  .addEventListener("click", () => {
    captureCount = 1;


    screenCount = 5;
    shootText();


    console.log(screenCount);
    showScreen(screenCount);
  });


//次の撮影に進むボタン
const nextshoot = document
  .getElementById("nextshoot")
  .addEventListener("click", () => {
    //背面撮影＝count2にする
    //カメラ画面にもどるようにする
    captureCount++;


    shootText();


    screenCount = 5;
    console.log(screenCount);
    showScreen(screenCount);
  });


//撮りなおすボタン 前面
const RetakeF = document
  .getElementById("RetakeF")
  .addEventListener("click", () => {
    //カウントはそのまま、カメラ画面にもどるイベントをいれる
    screenCount = 5;
    shootText();


    console.log(screenCount);
    showScreen(screenCount);
  });
//撮りなおすボタン 背面
const RetakeB = document
  .getElementById("RetakeB")
  .addEventListener("click", () => {
    // captureCount--;
    shootText();


    //カウントはそのまま、カメラ画面にもどるイベントをいれる
    screenCount = 5;
    console.log(screenCount);
    showScreen(screenCount);
  });


//撮り終わり
const Shootingfinish = document
  .getElementById("Shootingfinish")
  .addEventListener("click", () => {
    screenCount = 11; //袖飛ばして確認画面
    console.log(screenCount);
    showScreen(screenCount);
  });


//撮影終了後
const retakeAll = document
  .getElementById("retakeAll")
  .addEventListener("click", () => {
    captureCount = 0; //撮影カウントを戻す
    // shootingtext.textContent = "前面を撮影してください";


    screenCount = 4; //撮影時の注意点にもどる


    console.log(screenCount);
    showScreen(screenCount);
  });


const finish = document
  .getElementById("finish")
  .addEventListener("click", () => {
    screenCount = 12;
    console.log(screenCount);
    showScreen(screenCount);
  });


const typeselectbtn = document
  .getElementById("typeselectbtn")
  .addEventListener("click", () => {
    captureCount = 0; //撮影カウントを戻す
    let isFrontCamera = true; //初期は内カメ
    // shootingtext.textContent = "前面を撮影してください";


    screenCount = 1;
    console.log(screenCount);
    showScreen(screenCount);
  });


//カメラ系統準備↓
navigator.mediaDevices.getUserMedia({ video: true });


let currentStream;
let isFrontCamera = true; //初期は内カメ
let captureCount = 0; //撮影２回するため。


function startCamera() {
  const constraints = {
    video: {
      facingMode: isFrontCamera ? "user" : "environment",
    },
  };


  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if (currentStream) {
        currentStream.getTracks().forEach((track) => track.stop());
      }
      currentStream = stream;
      const video = document.getElementById("video");
      video.srcObject = stream;
    })
    .catch((error) => {
      console.error("カメラにアクセスできませんでした:", error);
    });
}


//テキストを変える
function shootText() {
  const shootingtext = document.getElementById("shootingtext");
  if (captureCount < 2) {
    shootingtext.textContent = "前面を撮影してください";
  } else if ((captureCount = 2)) {
    shootingtext.textContent = "背面を撮影してください";
  }
}


function captureImage() {
  //撮影と、画像表示のイベント


  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext("2d");


  // 画像を水平に反転する(内カメのときだけ)
  if (isFrontCamera) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }


  //画像を表示
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");


  if (captureCount === 1) {
    const photoF = document.getElementById("photoF");
    photoF.setAttribute("src", dataURL);
    //↓確認用コンソール
    console.log("キャプチャした画像のデータURL:", dataURL);
    //確認画面へ遷移
    screenCount = 6;
    console.log(screenCount);
    showScreen(screenCount);
  } else if (captureCount === 2) {
    const photoB = document.getElementById("photoB");
    photoB.setAttribute("src", dataURL);
    screenCount = 7;
    console.log(screenCount);
    showScreen(screenCount);
  }


  // ダウンロードリンクを設定する
  const downloadButton = document.getElementById("download");
  downloadButton.href = dataURL;


  //画像に名前をつけて、ダウンロード可能に
  downloadButton.download = "captured_image.png";
  downloadButton.style.display = "block";
}


//内カメ外カメのトグル
document.getElementById("toggle-camera").addEventListener("click", () => {
  isFrontCamera = !isFrontCamera;
  startCamera();
});


startCamera();


//撮影ボタンにイベント挿入
// タイマーの追加
document.getElementById("capture").addEventListener("click", () => {
  const timer = document.getElementById("timer");
  let count = 5;
  timer.style.display = "block"; // タイマーを表示


  // タイマーを更新する関数
  function updateTimer() {
    timer.textContent = count;
    if (count === 0) {
      clearInterval(countdown);
      timer.style.display = "none"; // タイマーを非表示
      captureImage(); // 写真を撮影
    }
    count--;
  }


  updateTimer(); // 初期カウントを表示
  let countdown = setInterval(updateTimer, 1000); // 1秒ごとにカウントダウン
});


//メニュー↓
//戻るボタン
var backbtn = true;
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", function () {
  if (backbtn) {
    if (screenCount == 6) {
      //前面確認画面
      //カウントはそのまま、カメラ画面にもどるイベントをいれる
      screenCount = 5;
      shootText();


      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 7) {
      //背面確認画面
      shootText();


      //カウントはそのまま、カメラ画面にもどるイベントをいれる
      screenCount = 5;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 11) {
      //最終確認画面
      screenCount = 7;
      showScreen(screenCount);
    } else if (screenCount == 13) {
      console.log(seni);
      screenCount = seni;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount > 0) {
      //他の画面（規約以外）
      screenCount--;
      console.log(screenCount);
      showScreen(screenCount);
    }
  }
});


let seni = 0;


document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("overlay");


  menuIcon.addEventListener("click", function () {
    // メニューの表示状態をトグルする
    if (navMenu.classList.contains("show")) {
      navMenu.classList.remove("show");
      navMenu.style.height = "0"; // メニューを非表示にするとき高さを0に
      backButton.style.opacity = 1; //戻るボタンが可視化
      backbtn = true;


      overlay.classList.remove("show"); // オーバーレイを非表示
    } else {
      navMenu.classList.add("show");
      navMenu.style.height = navMenu.scrollHeight + "px"; // メニューの高さを内容に合わせて設定
      //戻るボタンを押せなくする
      backbtn = false;
      backButton.style.opacity = 0;
      overlay.classList.add("show"); // オーバーレイを表示
    }
  });


  //メニュー遷移先設定
  const li1 = document.getElementById("li1").addEventListener("click", () => {
    screenCount = 1;
    console.log(screenCount);
    showScreen(screenCount);
  });


  const li2 = document.getElementById("li2").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する
    //後に撮影方法画面に変更
    screenCount = 13;
    console.log(screenCount);
    showScreen(screenCount);
  });
  const li3 = document.getElementById("li3").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する


    //後に利用規約画面に変更
    screenCount = 13;
    console.log(screenCount);
    showScreen(screenCount);
  });


  // オーバーレイをクリックしたときにメニューとオーバーレイを非表示にする
  overlay.addEventListener("click", function () {
    navMenu.classList.remove("show");
    navMenu.style.height = "0"; // メニューを非表示にするとき高さを0に
    overlay.classList.remove("show"); // オーバーレイを非表示
  });
});
// </script>

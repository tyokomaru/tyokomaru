/* <script> */
"use strict";

const menuIcon = document.getElementById("menu-icon");
const backbutton = document.getElementById("back-button");

//画面遷移（表示非表示）の設定
let screenCount = 0;
const screennum = document.getElementsByClassName("scr");
console.log(screennum); //確認用コンソール

function showScreen(index) {
  if (index === 2) {
    index = 1;
  }
  for (let i = 0; i < screennum.length; i++) {
    screennum[i].style.display = i === index ? "block" : "none";
  }

  if (index === 0) {
    backbutton.style.display = "none";
    menuIcon.style.display = "none";
  } else {
    backbutton.style.display = "block";
    menuIcon.style.display = "block";
  }
}
// 初期表示
showScreen(screenCount);

//画面遷移（表示）を関数に。
function ScreenTransition(n) {
  screenCount = n;
  console.log(screenCount);
  showScreen(screenCount);
}

let katagami = 0;
//↑型紙の種類がトップス＝1,ボトムス＝2

//規約同意ボタン
//スタートボタンに変更
const kiyakudoui = document
  .getElementById("kiyakudoui")
  .addEventListener("click", () => {
    ScreenTransition(1);
  });

//トップスボトムスボタン
//9/15
// 子ボタングループをトグル表示する関数
function toggleVisibility(buttonGroupId) {
  // すべての子ボタングループを取得
  const allButtonGroups = document.querySelectorAll(".hidden-buttons");

  // 指定されたIDの子ボタングループを取得
  const targetGroup = document.getElementById(buttonGroupId);

  let anyButtonGroupVisible = false; //dress用

  // 各子ボタングループについて処理
  allButtonGroups.forEach((group) => {
    if (group === targetGroup) {
      // トグル表示
      group.style.display = group.style.display === "block" ? "none" : "block";
      if (group.style.display === "block") {
        anyButtonGroupVisible = true;
      }
      if (buttonGroupId === "tops-buttons") {
        const hiddenbottom = document.getElementById("hiddenbottom");
        hiddenbottom.style.display =
          hiddenbottom.style.display === "none" ? "block" : "none";
      }
    } else {
      // 他の子ボタングループは非表示にする
      group.style.display = "none";
    }
  });
  // `#dress` ボタンの表示/非表示を設定
  document.getElementById("dress").style.display = anyButtonGroupVisible
    ? "none"
    : "block";
}

//内カメ外カメ設定ボタン
//内↓
const incamera = document.getElementById("incamera");

incamera.addEventListener("click", () => {
  //トップス内カメ
  katagami = 1;
  katagamiEvent();
  // インジケーターを更新
  updateIndicator(0);
  ScreenTransition(3);
});
//外カメ
const outcamera = document
  .getElementById("outcamera")
  .addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
    //トップス外カメ
    katagami = 1;
    katagamiEvent();

    updateIndicator(0);
    ScreenTransition(3);
  });
const bottom_outcamera = document
  .getElementById("bottom_outcamera")
  .addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera();
    //ボトムス
    katagami = 2;
    katagamiEvent();

    updateIndicator(0);
    ScreenTransition(3);
  });

//srcに見本画像、後ろにフレーム画像
//トップスの選択肢
let topstemp = [
  {
    name: "ショート丈Tシャツ",
    src: "images/shortT_icon.png",
    front: "images/shortT_front.png",
    back: "images/shortT_back.png",
    sleeve: "images/shortT_sleeve.png",
  },
  {
    name: "オーバーサイズTシャツ",
    src: "images/bigSilhouette_icon.png",
    front: "images/bigSilhouette_front.png",
    back: "images/bigSilhouette_back.png",
    sleeve: "images/bigSilhouette_sleeve.png",
  },
  {
    name: "パーカー",
    src: "images/hoodie_icon.png",
    front: "images/hoodie_front.png",
    back: "images/hoodie_back.png",
    sleeve: "images/hoodie_sleeve.png",
  },
  {
    name: "シャツ・ブラウス",
    src: "images/longSleeve_icon.png",
    front: "images/longSleeve_front.png",
    back: "images/longSleeve_back.png",
    sleeve: "images/longSleeve_sleeve.png",
  },
  {
    //テンプレートを使用しない
    src: "images/non_temp.png",
    front: "Coming soon",
    back: "",
    sleeve: "",
  },
];
//ボトムスの選択肢
let bottomstemp = [
  {
    name: "台形ミニスカート",
    src: "images/miniskirt_icon.png",
    front: "images/miniskirt_front.png",
    back: "images/miniskirt_back.png",
  },
  {
    name: "パンツ",
    src: "images/pants_icon.png",
    front: "images/pants_front.png",
    back: "images/pants_back.png",
  },
  {
    //テンプレートを使用しない
    src: "images/non_temp.png",
    front: "Coming soon",
    back: "",
  },
];
let katagamiFreamchangefront = "frontfreame";
let katagamiFreamchangeback = "backfreame";
let katagamiFreamchangesleeve = "sleevefreame";
let templateName = "テンプレート名";

function katagamiEvent() {
  // JavaScriptでボタンを挿入するコード
  const f_area = document.querySelector(".f_area");

  // 既存のボタンを削除
  while (f_area.firstChild) {
    f_area.removeChild(f_area.firstChild);
  }
  let data;
  if (katagami == 1) {
    //トップスの場合
    data = null;
    //初期化してから入れる
    data = topstemp; // トップスデータを使用
    document.querySelector(".f_area").style.width = "1250px";
  } else if (katagami == 2) {
    //ボトムスの場合
    data = null;
    //初期化してから入れる
    data = bottomstemp; // ボトムスデータを使用
    document.querySelector(".f_area").style.width = "750px";
  } else if (katagami > 2) {
    window.alert("型紙がありません");
  }
  // ▽▽9/13変更
  data.forEach((item) => {
    // 新しいボタン要素を作成
    const button = document.createElement("button");
    button.style.all = "unset";

    // 画像要素を作成
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "Image Button";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
    // img.style.transition = "transform .5s";

    // ボタンに画像を追加
    button.appendChild(img);
    // ボタンのクリックイベントを設定
    button.addEventListener("click", () => {
      katagamiFreamchange(item.front);
      katagamiFreamchangefront = item.front;
      katagamiFreamchangeback = item.back;
      templateName = item.name;
      if (katagami === 1) {
        katagamiFreamchangesleeve = item.sleeve;
      }
    });
    // コンテナにボタンを追加
    console.log(f_area);
    f_area.appendChild(button);
  });
}

//ここで、型紙に応じたフレームを撮影画面でだす。3班に渡す値かもしれない
function katagamiFreamchange(x) {
  // 引数 x に応じた処理を実行する
  // alert(`デバッグ用アラート。フレームは値: ${x}`);
  updateIndicator(1);
  ScreenTransition(4);
  console.log(x);
  const newImageUrl = x; //frontのURL
  // 画像要素のsrc属性を変更
  guideFrame.setAttribute("src", newImageUrl);
}
const guideFrame = document.querySelector(".guide-frame");

//ガイドフレームの多色化ボタン（videoタップ)
let framecolor = "red"; //初期値
function appendColorToFileName(fileName, color) {
  // 拡張子を分離
  const parts = fileName.split(".");
  const baseName = parts[0];
  const extension = parts[1];

  // 色を追加して新しいファイル名を作成
  const newFileName = `${baseName}_${color}.${extension}`;
  return newFileName;
}
const cameracontainer = document
  .querySelector(".camera-container")
  .addEventListener("click", () => {
    //前面
    if (captureCount === 1) {
      if (framecolor == "red") {
        // ここに新しい画像のURL_白を指定
        const newImageUrl = appendColorToFileName(
          katagamiFreamchangefront,
          "white"
        );
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "white";
      } else if (framecolor == "white") {
        // ここに新しい画像のURL_黒を指定
        const newImageUrl = appendColorToFileName(
          katagamiFreamchangefront,
          "black"
        );
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "black";
      } else {
        // ここに新しい画像のURL_黒を指定
        const newImageUrl = katagamiFreamchangefront;
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "red";
      }
    } else {
      //背面時
      if (framecolor == "red") {
        // ここに新しい画像のURL_白を指定
        const newImageUrl = appendColorToFileName(
          katagamiFreamchangeback,
          "white"
        );
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "white";
      } else if (framecolor == "white") {
        // ここに新しい画像のURL_黒を指定
        const newImageUrl = appendColorToFileName(
          katagamiFreamchangeback,
          "black"
        );
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "black";
      } else {
        // ここに新しい画像のURL_黒を指定
        const newImageUrl = katagamiFreamchangeback;
        // 画像要素のsrc属性を変更
        guideFrame.setAttribute("src", newImageUrl);
        framecolor = "red";
      }
    }
  });

//撮影開始ボタンにて、カメラ画面への切り替えと、カウントを１回目に設定
const startshoot = document
  .getElementById("startshoot")
  .addEventListener("click", () => {
    captureCount = 1;

    screenCount = 5;
    shootText();

    updateIndicator(1);
    console.log(screenCount);
    showScreen(screenCount);
  });
let IMG1; //前面
let IMG2; //背面
//次の撮影に進むボタン
const nextshoot = document
  .getElementById("nextshoot")
  .addEventListener("click", () => {
    //背面撮影＝count2にする
    //カメラ画面にもどるようにする
    captureCount++;
    IMG1 = dataURL;
    console.log(IMG1);

    shootText();

    screenCount = 5;
    updateIndicator(3);

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

    updateIndicator(1);
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
    updateIndicator(3);
    console.log(screenCount);
    showScreen(screenCount);
  });

//撮り終わり
const Shootingfinish = document
  .getElementById("Shootingfinish")
  .addEventListener("click", () => {
    IMG2 = dataURL;
    console.log(IMG1);
    console.log(IMG2);

    if (katagami == 1) {
      //トップスなので、袖画面に行く
      screenCount = 8;
      updateIndicator(5);
      console.log(screenCount);
      showScreen(screenCount);
    } else {
      seni = screenCount;

      screenCount = 11; //袖飛ばして確認画面
      updateIndicator(6);
      console.log(screenCount);
      showScreen(screenCount);
    }
  });
//袖画面の実装
//9/14変更▽
// 親ボタンをクリックしたときに対応する子ボタンをトグル表示する関数
function toggleChildButtons(childGroupId) {
  const allChildGroups = document.querySelectorAll(".child-buttons");
  const sleeveParent = document.getElementById("sleeveParent");

  // 各子ボタングループについて処理
  allChildGroups.forEach((group) => {
    if (group.id === childGroupId) {
      // トグル表示
      group.style.display = group.style.display === "block" ? "none" : "block";
      if (group.id === "sleeve1-yes") {
        console.log(sleeveParent.style.display);

        if (sleeveParent.style.display === "none") {
          sleeveParent.style.display = "block";
        } else {
          sleeveParent.style.display = "none";
        }
      }
    } else {
      // 他の子ボタングループは非表示にする
      group.style.display = "none";
    }
  });
}
//袖撮影準備
document.addEventListener("DOMContentLoaded", () => {
  const video2 = document.getElementById("video2");
  const canvas2 = document.getElementById("canvas2");
  const capture2 = document.getElementById("capture2");
  const ctx = canvas2.getContext("2d");
  // カメラを起動する関数
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video2.srcObject = stream;
    } catch (error) {
      console.error("カメラの起動に失敗しました:", error);
    }
  }
  // 撮影する関数
  function captureImage() {
    if (video2.srcObject) {
      // 画像を水平に反転する(内カメのときだけ)
      if (isFrontCamera) {
        ctx.translate(canvas2.width, 0);
        ctx.scale(-1, 1);
      }
      // ビデオのサイズに合わせてキャンバスのサイズを設定
      // ビデオの表示サイズを取得
      const videoWidth = video2.clientWidth;
      const videoHeight = video2.clientHeight;

      // Canvas のサイズをビデオの表示サイズに合わせる
      canvas2.width = videoWidth;
      canvas2.height = videoHeight;
      // キャンバスにビデオの内容を描画
      ctx.drawImage(video2, 0, 0, canvas2.width, canvas2.height);

      // ガイドフレームを描画9/14
      const guideFrame2 = document.querySelector(".guide-frame2");
      const frameX = (canvas2.width - 300) / 2;
      const frameY = (canvas2.height - 300) / 2;

      ctx.drawImage(guideFrame2, frameX, frameY, 300, 300);

      // 撮影した画像
      let sleeveDataUrl = canvas2.toDataURL("image/png");

      //袖画像
      const photoS = document.getElementById("photoS");
      photoS.setAttribute("src", sleeveDataUrl);
      //↓確認用コンソール
      console.log("袖画像URL:", sleeveDataUrl);
      //確認画面へ遷移
      updateIndicator(5);
      console.log(screenCount);
      showScreen(10);
    } else {
      console.error("カメラのストリームが開始されていません。");
    }
  }

  // イベントリスナーの設定
  capture2.addEventListener("click", captureImage);

  // カメラの起動
  startCamera();
});
//撮りなおすボタン 袖
const RetakeS = document
  .getElementById("RetakeS")
  .addEventListener("click", () => {
    //カメラ画面にもどるイベントをいれる
    updateIndicator(5);
    showScreen(9);
  });
//進むボタン　袖撮影後
const sleeveFinish = document
  .getElementById("sleeveFinish")
  .addEventListener("click", () => {
    //最終確認画面に遷移
    updateIndicator(6);
    showScreen(11);
  });
//9/14変更↑

function handleAnswer(answer, currentSleeve) {
  // 袖の画面３つ（画面8,9,10）の選択肢分岐
  //   document.getElementById(currentSleeve).style.display = "none";

  if (currentSleeve === "sleeve1") {
    if (answer === "yes") {
      console.log("yes");
      //   document.getElementById("sleeve3").style.display = "block";
      //質問3にうつる
      updateIndicator(5);
      ScreenTransition(10);
    } else {
      //   document.getElementById("sleeve2").style.display = "block";
      //質問2にうつる
      //撮影に移る
      updateIndicator(5);
      const guideframe2 = document.querySelector(".guide-frame2");
      guideframe2.setAttribute("src", katagamiFreamchangesleeve);
      console.log(guideframe2);

      ScreenTransition(9);
    }
  } else if (currentSleeve === "sleeve2") {
    if (answer === "yes") {
      //   document.getElementById("sleeve3").style.display = "block";
      //質問3にうつる
      updateIndicator(5);
      ScreenTransition(10);
    } else {
      window.alert("撮影を行う");
    }
  } else if (currentSleeve === "sleeve3") {
    if (answer === "yes") {
      window.alert("前面を使用");
      //きりぬき
      imageUrl = IMG1; // ここに画像のURLを指定
      Cut();
      updateIndicator(6);
      seni = screenCount; //戻ってくる画面を代入する
      ScreenTransition(11);
    } else {
      window.alert("背面を使用");

      //きりぬき
      imageUrl = IMG2; // ここに画像のURLを指定
      Cut();

      seni = screenCount; //戻ってくる画面を代入する
      updateIndicator(6);
      ScreenTransition(11);
    }
  }
}
//袖の切り抜き
let imageUrl;
function Cut() {
  console.log(imageUrl);
  const img = new Image();
  img.onload = function () {
    // Canvasを設定
    const canvasinput = document.getElementById("input");
    const ctx = canvasinput.getContext("2d");
    canvasinput.width = img.width;
    canvasinput.height = img.height;
    ctx.drawImage(img, 0, 0);

    // 切り取りたい範囲を指定
    const cutWidth = 100; // 切り取り幅
    const cutHeight = 200; // 切り取り高さ

    // 画像の中心から切り取り範囲を計算
    const x = (img.width - cutWidth) / 2;
    const y = (img.height - cutHeight) / 2;

    // 切り取り範囲を描画するための新しいCanvas
    const outputCanvas = document.getElementById("output");
    const outputCtx = outputCanvas.getContext("2d");
    outputCanvas.width = cutWidth;
    outputCanvas.height = cutHeight;

    // 切り取り範囲を描画
    outputCtx.drawImage(
      canvasinput,
      x,
      y,
      cutWidth,
      cutHeight,
      0,
      0,
      cutWidth,
      cutHeight
    );
  };
  img.src = imageUrl; // 画像URLを設定
}

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
  .getElementById("download")
  .addEventListener("click", () => {
    screenCount = 12;
    document.getElementById("templateValue").textContent = templateName;
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

//テキストを変える+フレーム
function shootText() {
  const shootingtext = document.getElementById("shootingtext");
  //9/16テキスト→画像に変更
  if (captureCount < 2) {
    // shootingtext.textContent = "前面を撮影してください";
    shootingtext.setAttribute("src", "images/text_4.png");
    // フレーム画像を変更
    guideFrame.setAttribute("src", katagamiFreamchangefront);

    console.log(guideFrame);
  } else if ((captureCount = 2)) {
    // shootingtext.textContent = "背面を撮影してください";
    shootingtext.setAttribute("src", "images/text_5.png");

    guideFrame.setAttribute("src", katagamiFreamchangeback);

    console.log(guideFrame);
  }
}

let dataURL;

function captureImage() {
  //撮影と、画像表示のイベント
  const canvas = document.getElementById("canvas");
  const video = document.getElementById("video");
  const context = canvas.getContext("2d");

  // 画像を水平に反転する(内カメのときだけ)
  if (isFrontCamera) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  // ビデオのサイズに合わせてキャンバスのサイズを設定
  // ビデオの表示サイズを取得
  const videoWidth = video.clientWidth;
  const videoHeight = video.clientHeight;

  // Canvas のサイズをビデオの表示サイズに合わせる
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  // キャンバスにビデオの内容を描画
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // ガイドフレームを描画9/14
  const guideFrame = document.querySelector(".guide-frame");
  const frameX = (canvas.width - 300) / 2;
  const frameY = (canvas.height - 300) / 2;

  context.drawImage(guideFrame, frameX, frameY, 300, 300);

  //↑↑

  dataURL = canvas.toDataURL("image/png");

  if (captureCount === 1) {
    //前面撮影時
    const photoF = document.getElementById("photoF");
    photoF.setAttribute("src", dataURL);
    //↓確認用コンソール
    console.log("キャプチャした画像のデータURL:", dataURL);
    //確認画面へ遷移
    screenCount = 6;
    updateIndicator(2);
    console.log(screenCount);
    showScreen(screenCount);
  } else if (captureCount === 2) {
    //背面撮影時
    const photoB = document.getElementById("photoB");
    photoB.setAttribute("src", dataURL);
    screenCount = 7;
    updateIndicator(4);
    console.log(screenCount);
    showScreen(screenCount);
  }

  // ダウンロードリンクを設定する
  const downloadButton = document.getElementById("download");
  downloadButton.href = dataURL;

  //画像に名前をつけて、ダウンロード可能に
  downloadButton.download = "captured_image.png";
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
// インジケーター画像URLリスト
const IndicatorList = [
  "images/indicator_1.png", // テンプレート選択 scr3
  "images/indicator_2.png", // 前面撮影 scr4 scr5
  "images/indicator_3.png", // 撮影画像の確認（１） scr6
  "images/indicator_4.png", // 背面撮影 scr5(shot2)
  "images/indicator_5.png", // 撮影画像の確認（２）  scr7
  "images/indicator_6.png", // 袖のデザイン scr8 scr9 scr10
  "images/indicator_7.png", // 完成 scr11 scr12
];

//インジケーター
const indicator = document.getElementById("indicator");
function updateIndicator(scr) {
  // インデックスが8の場合は何も表示しない
  if (scr === 8) {
    indicator.innerHTML = ""; // 既存の内容をクリア
    return; // 画像を追加せずに終了
  }

  const imgSrc = IndicatorList[scr]; // 選ばれた画像のURLを取得
  // 画像を挿入
  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = `Indicator画像${scr + 1}`; // 画像の代替テキストを設定

  // 既存の内容をクリアして画像を追加
  indicator.innerHTML = ""; // 既存の内容をクリア
  indicator.appendChild(img);
}

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

      updateIndicator(1);
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 7) {
      //背面確認画面
      shootText();

      //カウントはそのまま、カメラ画面にもどるイベントをいれる
      screenCount = 5;
      updateIndicator(1);
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 11) {
      //最終確認画面
      if ((seni = 7)) {
        //背面時
        updateIndicator(4);
      } else if ((seni = 10)) {
        //袖からきたとき
        updateIndicator(5);
      }
      screenCount = seni;

      showScreen(screenCount);
    } else if (screenCount == 13) {
      //概要
      console.log("前画面=" + seni);
      screenCount = seni;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount == 14) {
      //規約
      console.log("前画面=" + seni);
      screenCount = seni;
      console.log(screenCount);
      showScreen(screenCount);
    } else if (screenCount > 0) {
      //他の画面（規約以外）
      screenCount--;

      //インジケーターを戻す
      if (screenCount == 3) {
        updateIndicator(0);
      } else if (screenCount == 4 || screenCount == 5) {
        updateIndicator(1);
      } else if (screenCount == 6) {
        updateIndicator(2);
      } else if (screenCount == 7) {
        updateIndicator(4);
      } else if (screenCount == 8 || screenCount == 9 || screenCount == 10) {
        updateIndicator(5);
      } else if (screenCount == 11 || screenCount == 12) {
        updateIndicator(6);
      } else if (screenCount == 5) {
        updateIndicator(1);
      }
      console.log(screenCount + "撮影数＝" + captureCount);
      showScreen(screenCount);
    }
  }
});

let seni = 0;

document.addEventListener("DOMContentLoaded", function () {
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
    updateIndicator(8); //インジケーターなし＝8
    console.log(screenCount);
    showScreen(screenCount);
  });

  const li2 = document.getElementById("li2").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する
    //後に撮影方法画面に変更
    screenCount = 13;
    //概要
    console.log(screenCount);
    showScreen(screenCount);
  });
  const li3 = document.getElementById("li3").addEventListener("click", () => {
    seni = screenCount; //戻ってくる画面を代入する

    //後に利用規約画面に変更
    screenCount = 14;
    //規約
    console.log(screenCount);
    showScreen(screenCount);
  });
  const TabBack = document.querySelectorAll(".TabBack");
  console.log("tab" + TabBack);
  // 各ボタンにクリックイベントリスナーを追加
  TabBack.forEach((TabBack) => {
    TabBack.addEventListener("click", () => {
      if (screenCount !== 13 && screenCount !== 14) {
        // タブの規約or概要ではない＝エラー時の対処
        console.log("エラーのため最初にもどる");
        screenCount = 1;
        showScreen(screenCount);
      } else {
        // タブの規約or概要で前に戻るボタンを押す
        console.log("前画面=" + seni);
        screenCount = seni;
        console.log(screenCount);
        showScreen(screenCount);
      }
    });
  });
  // オーバーレイをクリックしたときにメニューとオーバーレイを非表示にする
  overlay.addEventListener("click", function () {
    navMenu.classList.remove("show");
    navMenu.style.height = "0"; // メニューを非表示にするとき高さを0に
    overlay.classList.remove("show"); // オーバーレイを非表示
  });
});

function closeapp() {
  alert("アプリケーションを終了します。");

  // 必要に応じて他の終了処理を追加
  window.close(); // ブラウザタブを閉じる (条件によっては動作しないことがあります)
}
// </script>

// 画面遷移（表示非表示）の設定
let screenCount = 0;
const screennum = document.getElementsByClassName("scr");
console.log(screennum); // 確認用コンソール

function showScreen(index) {
  for (let i = 0; i < screennum.length; i++) {
    screennum[i].style.display = i === index ? "block" : "none";
  }
}
// 初期表示
showScreen(screenCount);

// 規約同意ボタン
const kiyakudoui = document
  .getElementById("kiyakudoui")
  .addEventListener("click", () => {
    screenCount = 1;
    console.log(screenCount);
    showScreen(screenCount);
  });
// トップスボトムスボタン
const tops = document
  .getElementById("tops")
  .addEventListener("click", () => {
    screenCount = 2;
    console.log(screenCount);
    showScreen(screenCount);
  });
const bottoms = document
  .getElementById("bottoms")
  .addEventListener("click", () => {
    screenCount = 2;
    console.log(screenCount);
    showScreen(screenCount);
  });
// カメラ選択ボタン
const outcamera = document
  .getElementById("outcamera")
  .addEventListener("click", () => {
    screenCount = 3;
    console.log(screenCount);
    showScreen(screenCount);
  });
const incamera = document
  .getElementById("incamera")
  .addEventListener("click", () => {
    screenCount = 3;
    console.log(screenCount);
    showScreen(screenCount);
  });
// デモ版ボタン
const temp = document.getElementById("temp").addEventListener("click", () => {
  screenCount = 4;
  console.log(screenCount);
  showScreen(screenCount);
});
// 撮影開始ボタン
const startshoot = document
  .getElementById("startshoot")
  .addEventListener("click", () => {
    screenCount = 5;
    console.log(screenCount);
    showScreen(screenCount);
    startCamera(); // カメラ起動関数を呼び出し
  });
// 背面撮影に進むボタン
const nextshoot = document
  .getElementById("nextshoot")
  .addEventListener("click", () => {
    screenCount = 6;
    console.log(screenCount);
    showScreen(screenCount);
  });
// 撮影終了ボタン
const Shootingfinish = document
  .getElementById("Shootingfinish")
  .addEventListener("click", () => {
    screenCount = 7;
    console.log(screenCount);
    showScreen(screenCount);
  });
// 撮影選択画面に戻るボタン
const typeselectbtn = document
  .getElementById("typeselectbtn")
  .addEventListener("click", () => {
    screenCount = 1;
    console.log(screenCount);
    showScreen(screenCount);
  });

// カメラ関連の設定
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photoF = document.getElementById("photoF");
const photoB = document.getElementById("photoB");
const timerElement = document.getElementById("timer");
let isFrontCamera = true;
let stream;
let countdownInterval;

async function startCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: isFrontCamera ? "user" : "environment" },
    audio: false,
  });

  video.srcObject = stream;
}

document.getElementById("capture").addEventListener("click", async () => {
  timerElement.style.display = "block";
  let countdown = 5;
  timerElement.textContent = countdown;

  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    countdown--;
    timerElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(countdownInterval);
      timerElement.style.display = "none";
      capturePhoto();
    }
  }, 1000);
});

function capturePhoto() {
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (screenCount === 5) {
    photoF.src = canvas.toDataURL("image/png");
    screenCount = 6;
  } else {
    photoB.src = canvas.toDataURL("image/png");
    screenCount = 7;
  }
  showScreen(screenCount);
}

document.getElementById("toggle-camera").addEventListener("click", () => {
  isFrontCamera = !isFrontCamera;
  startCamera();
});

// メニューボタンの設定
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const overlay = document.getElementById("overlay");

menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  navMenu.classList.remove("show");
  overlay.classList.remove("show");
});

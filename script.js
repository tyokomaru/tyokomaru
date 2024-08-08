document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".scr");
  const togglePages = (id) => {
    pages.forEach((page) => (page.style.display = "none"));
    document.getElementById(id).style.display = "flex";
  };

  document.getElementById("kiyakudoui").onclick = () =>
    togglePages("typeselect");
  document.getElementById("tops").onclick = () => togglePages("cameraselect");
  document.getElementById("bottoms").onclick = () => togglePages("cameraselect");
  document.getElementById("outcamera").onclick = () =>
    togglePages("tempselect");
  document.getElementById("incamera").onclick = () =>
    togglePages("tempselect");
  document.getElementById("temp").onclick = () => togglePages("Beforeshooting");
  document.getElementById("startshoot").onclick = () => togglePages("shooting");
  document.getElementById("nextshoot").onclick = () => togglePages("shooting");
  document.getElementById("Shootingfinish").onclick = () =>
    togglePages("finalconfirmation");

  document.getElementById("RetakeF").onclick = () => togglePages("shooting");
  document.getElementById("RetakeB").onclick = () => togglePages("shooting");
  document.getElementById("typeselectbtn").onclick = () =>
    togglePages("typeselect");
  document.getElementById("retakeAll").onclick = () => togglePages("shooting");
  document.getElementById("finish").onclick = () => togglePages("typeselect");

  // メニューの表示/非表示を制御
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("overlay");
  menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
  });

  overlay.addEventListener("click", () => {
    navMenu.classList.remove("show");
    overlay.style.display = "none";
  });

  // その他のメニューアイテムのクリックイベント
  document.getElementById("li1").addEventListener("click", () => {
    togglePages("typeselect");
    navMenu.classList.remove("show");
    overlay.style.display = "none";
  });

  document.getElementById("li2").addEventListener("click", () => {
    togglePages("cameraselect");
    navMenu.classList.remove("show");
    overlay.style.display = "none";
  });

  document.getElementById("li3").addEventListener("click", () => {
    togglePages("kiyaku");
    navMenu.classList.remove("show");
    overlay.style.display = "none";
  });

  // カメラ関連の処理
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const captureButton = document.getElementById("capture");
  const toggleCameraButton = document.getElementById("toggle-camera");
  const timer = document.getElementById("timer");

  let stream;
  let isFrontCamera = true;
  let countdownTimer;
  let currentPhotoSide = "F"; // 'F' for front, 'B' for back

  const constraints = (facingMode) => ({
    video: {
      facingMode,
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
  });

  const startCamera = async (facingMode) => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    stream = await navigator.mediaDevices.getUserMedia(constraints(facingMode));
    video.srcObject = stream;
  };

  captureButton.addEventListener("click", () => {
    clearInterval(countdownTimer);
    timer.style.display = "none";
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);
    const photoDataUrl = canvas.toDataURL("image/png");
    if (currentPhotoSide === "F") {
      document.getElementById("photoF").src = photoDataUrl;
      togglePages("previewF");
    } else {
      document.getElementById("photoB").src = photoDataUrl;
      togglePages("previewB");
    }
  });

  toggleCameraButton.addEventListener("click", () => {
    isFrontCamera = !isFrontCamera;
    startCamera(isFrontCamera ? "user" : "environment");
  });

  document.getElementById("startshoot").addEventListener("click", () => {
    currentPhotoSide = "F";
    startCamera("environment");
    togglePages("shooting");
  });

  document.getElementById("nextshoot").addEventListener("click", () => {
    currentPhotoSide = "B";
    startCamera("environment");
    togglePages("shooting");
  });

  // タイマー表示
  const startCountdown = (duration) => {
    timer.style.display = "block";
    let timeLeft = duration;
    timer.textContent = timeLeft;
    countdownTimer = setInterval(() => {
      timeLeft -= 1;
      timer.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        timer.style.display = "none";
        captureButton.click();
      }
    }, 1000);
  };

  // 撮影開始時にカウントダウンを開始
  document.getElementById("startshoot").addEventListener("click", () => {
    startCountdown(5); // 5秒カウントダウン
  });

  document.getElementById("nextshoot").addEventListener("click", () => {
    startCountdown(5); // 5秒カウントダウン
  });
});

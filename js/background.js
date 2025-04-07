const setBgBtn = document.getElementById("setBgBtn");
const resetBgBtn = document.getElementById("resetBgBtn");

setBgBtn.addEventListener("click", () => {
  document.body.style.backgroundImage = 'url("https://c4.wallpaperflare.com/wallpaper/908/631/590/hello-kitty-1440x900-anime-hello-kitty-hd-art-wallpaper-preview.jpg")';
});

resetBgBtn.addEventListener("click", () => {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "#ffd5ed";
});
const image = document.getElementById("cover"),
  title = document.getElementById("music-title"),
  artist = document.getElementById("music-artist"),
  currentTimeEl = document.getElementById("current-time"),
  durationEl = document.getElementById("duration"),
  progress = document.getElementById("progress"),
  playerProgress = document.getElementById("player-progress"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  playBtn = document.getElementById("play"),
  background = document.getElementById("bg-img");

const music = new Audio();
console.log(music);
const songs = [
  {
    path: "Ckay_-_Love_Nwantiti_Dance_Ver_slowed_(Hydr0.org)(1).mp3",
    displayName: "CKay Love Nwantiti",
    cover: "ckayLove.jpg",
    artist: "CKAY",
  },
  {
    path: "Eminem - Mockingbird (Lyrics).mp3",
    displayName: "MockingBird",
    cover: "eminemMocking bird.jpg",
    artist: "EMINEM",
  },
  {
    path: "Lana Del Rey - White Mustang (Official Music Video).mp3",
    displayName: "WHITE MUSTANG",
    cover: "whitemustang.jpg",
    artist: "Lana DEL RaY",
  },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function pause() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Pause");
  music.pause();
}

function play() {
  playBtn.setAttribute("title", "Play");
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  music.play();
}

function loadMusic(song) {
  music.src = song.path;
  image.src = song.cover;
  background.src = song.cover;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
}

function changeMusic(direction) {
  musicIndex = (musicIndex + direction + songs.length) % songs.length;
  loadMusic(songs[musicIndex]);
  console.log(musicIndex);
  play();
}
const width = playerProgress.clientWidth;

function setProgressBar(e) {
  const width = playerProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;
  console.log("fda");
}

function updateprogressbar() {
  console.log("fda");
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(+1));
music.addEventListener("ended", () => changeMusic(+1));
music.addEventListener("timeupdate", updateprogressbar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);




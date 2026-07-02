const TOTAL_TIME = 1800; // 30 minutes in seconds
let timeLeft = TOTAL_TIME;
let timerId = null;
let isMuted = false;

const bodyElement = document.getElementById('app-body');
const hungerBar = document.getElementById('hunger-bar');
const plumbob = document.getElementById('plumbob');
const playPauseBtn = document.getElementById('play-pause-btn');
const feastScreen = document.getElementById('frenzied-feast-screen');
const alarmSound = document.getElementById('alarm-sound');

function updateUI() {
    let percentage = (timeLeft / TOTAL_TIME) * 100;
    hungerBar.style.width = `${percentage}%`;

    hungerBar.className = "bar-fill";

    if (percentage > 60) {
        hungerBar.classList.add("state-green");
    } else if (percentage > 35) {
        hungerBar.classList.add("state-yellow");
    } else if (percentage > 15) {
        hungerBar.classList.add("state-orange");
    } else {
        hungerBar.classList.add("state-red");
    }
}

function toggleTimer() {
    if (timerId === null) {
        playPauseBtn.textContent = "Pause";
        plumbob.classList.remove("paused");

        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateUI();
            } else {
                triggerFeast();
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        timerId = null;
        playPauseBtn.textContent = "Play";
        plumbob.classList.add("paused");
    }
}

function feedSim() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = TOTAL_TIME;
    
    playPauseBtn.textContent = "Play";
    plumbob.classList.add("paused");
    
    alarmSound.pause();
    alarmSound.currentTime = 0;
    bodyElement.style.backgroundColor = "#8fa1e0"; // Reset back to periwinkle
    feastScreen.classList.add("hidden");
    
    updateUI();
}

function toggleMute() {
    isMuted = !isMuted;
    alarmSound.muted = isMuted;
    document.getElementById('mute-btn').textContent = isMuted ? "Unmute" : "Mute";
}

function triggerSecretTest() {
    clearInterval(timerId);
    timerId = null;
    
    timeLeft = 3;
    updateUI();
    
    toggleTimer();
}

function triggerFeast() {
    clearInterval(timerId);
    timerId = null;
    playPauseBtn.textContent = "Play";
    plumbob.classList.add("paused");
    
    bodyElement.style.setProperty('background-color', '#660000', 'important'); // Forces the background to dark red
    feastScreen.classList.remove("hidden");

    if (!isMuted) {
        alarmSound.play().catch(error => console.log("Audio waiting for user click."));
    }
}

updateUI();

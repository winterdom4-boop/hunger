const TOTAL_TIME = 1800; // 30 minutes in seconds
let timeLeft = TOTAL_TIME;
let timerId = null;
let isMuted = false;

const bodyElement = document.getElementById('app-body');
const uiPanel = document.getElementById('ui-panel');
const hungerLabel = document.getElementById('hunger-label');
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

function startInterval() {
    // Shared core function to launch a fresh running timer loop
    playPauseBtn.textContent = "Pause";
    plumbob.classList.remove("paused");
    plumbob.classList.add("spinning");

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateUI();
        } else {
            triggerFeast();
        }
    }, 1000);
}

function toggleTimer() {
    if (timerId === null) {
        startInterval();
    } else {
        clearInterval(timerId);
        timerId = null;
        playPauseBtn.textContent = "Play";
        plumbob.classList.add("paused");
    }
}

function feedSim() {
    // 1. Force clear any active interval loop immediately
    clearInterval(timerId);
    timerId = null;
    
    // 2. Refill the time parameter to full
    timeLeft = TOTAL_TIME;
    
    // 3. Wipe out all visual game-over Feast elements and audio cues
    alarmSound.pause();
    alarmSound.currentTime = 0;
    bodyElement.style.backgroundColor = "#8fa1e0";
    uiPanel.classList.remove("feast-mode");
    hungerLabel.classList.remove("feast-mode-text");
    feastScreen.classList.add("hidden");
    
    updateUI();
    
    // 4. FIX: Instantly force start the timer loop running forward seamlessly
    startInterval();
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
    
    startInterval();
}

function triggerFeast() {
    clearInterval(timerId);
    timerId = null;
    playPauseBtn.textContent = "Play";
    plumbob.classList.add("paused");
    
    // Forces dark red screen background
    bodyElement.style.setProperty('background-color', '#660000', 'important'); 
    
    // Switches on dark grey panel box override styles
    uiPanel.classList.add("feast-mode");
    hungerLabel.classList.add("feast-mode-text");
    feastScreen.classList.remove("hidden");

    if (!isMuted) {
        alarmSound.play().catch(error => console.log("Audio waiting for user click."));
    }
}

updateUI();

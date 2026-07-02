const TOTAL_TIME = 1800; // 30 minutes in seconds
let timeLeft = TOTAL_TIME;
let timerId = null;
let isMuted = false;

const bodyElement = document.getElementById('app-body');
const uiPanel = document.getElementById('ui-panel');
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
        // Start running down
        playPauseBtn.textContent = "Pause";
        
        // Plumbob spins when running
        plumbob.classList.add("spinning");
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
        // Pause active timer loop safely
        clearInterval(timerId);
        timerId = null;
        playPauseBtn.textContent = "Play";
        
        // Freeze Plumbob rotation in place
        plumbob.classList.add("paused");
    }
}

function feedSim() {
    timeLeft = TOTAL_TIME;
    
    alarmSound.pause();
    alarmSound.currentTime = 0;
    bodyElement.style.backgroundColor = "#8fa1e0";
    uiPanel.classList.remove("hidden");
    feastScreen.classList.add("hidden");
    
    // Maintain animation continuity on clear states
    if (timerId === null) {
        playPauseBtn.textContent = "Play";
        plumbob.classList.remove("spinning", "paused");
    } else {
        playPauseBtn.textContent = "Pause";
        plumbob.classList.add("spinning");
        plumbob.classList.remove("paused");
    }
    
    updateUI();
}

function toggleMute() {
    isMuted = !isMuted;
    alarmSound.muted = isMuted;
    document.getElementById('mute-btn').textContent = isMuted ? "Unmute" : "Mute";
}

function triggerFeast() {
    clearInterval(timerId);
    timerId = null;
    playPauseBtn.textContent = "Play";
    plumbob.classList.remove("spinning", "paused");
    
    uiPanel.classList.add("hidden");
    bodyElement.style.backgroundColor = "#660000"; 
    feastScreen.classList.remove("hidden");

    if (!isMuted) {
        // Plays your newly uploaded alarm.wav file
        alarmSound.play().catch(error => console.log("Audio waiting for explicit click context."));
    }
}

// Initial idle state mapping setup
updateUI();

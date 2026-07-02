const TOTAL_TIME = 1800; // 30 minutes in seconds
let timeLeft = TOTAL_TIME;
let timerId = null;
let isMuted = false;

const bodyElement = document.getElementById('app-body');
const uiPanel = document.getElementById('ui-panel');
const hungerBar = document.getElementById('hunger-bar');
const playPauseBtn = document.getElementById('play-pause-btn');
const feastScreen = document.getElementById('frenzied-feast-screen');
const alarmSound = document.getElementById('alarm-sound');

function updateUI() {
    let percentage = (timeLeft / TOTAL_TIME) * 100;
    hungerBar.style.width = `${percentage}%`;

    // Strip previous color classes
    hungerBar.className = "bar-fill";

    // Dynamic Sims health bar color mapping
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
        // Start running from its current time state
        playPauseBtn.textContent = "Pause";
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
    }
}

function feedSim() {
    // Keep it running if it's already active, just reset parameters
    timeLeft = TOTAL_TIME;
    
    // Clear any active game-over alarms just in case
    alarmSound.pause();
    alarmSound.currentTime = 0;
    bodyElement.style.backgroundColor = "#8fa1e0";
    uiPanel.classList.remove("hidden");
    feastScreen.classList.add("hidden");
    
    // If the timer was paused when clicking "Fed", make sure it stays paused at max
    // Otherwise, it keeps running seamlessly down from the top 
    if (timerId === null) {
        playPauseBtn.textContent = "Play";
    } else {
        playPauseBtn.textContent = "Pause";
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
    
    // Hide panel, transition background color to deep red, show textual alert
    uiPanel.classList.add("hidden");
    bodyElement.style.backgroundColor = "#660000"; 
    feastScreen.classList.remove("hidden");

    if (!isMuted) {
        alarmSound.play().catch(error => console.log("Audio waiting for user click interaction."));
    }
}

// Initialize the screen right away to 100% green bar, but do not start clock loop yet
updateUI();

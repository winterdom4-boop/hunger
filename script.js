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
    
    if (timerId === null) {
        playPauseBtn.textContent = "Play";
        plumbob.classList.add("paused");
    } else {
        playPauseBtn.textContent = "Pause";
        plumbob.classList.remove("paused");
    }
    
    updateUI();
}

function toggleMute() {
    isMuted = !isMuted;
    alarmSound.muted = isMuted;
    document.getElementById('mute-btn').textContent = isMuted ? "Unmute" : "Mute";
}

function triggerSecretTest() {
    // 1. Force wipe any running interval loop right away
    clearInterval(timerId);
    timerId = null;
    
    // 2. Override time left variable instantly to 3 seconds
    timeLeft = 3;
    
    // 3. Render the updated red bar state immediately 
    updateUI();
    
    // 4. Fire up the execution loop cleanly from the 3-second remaining mark
    toggleTimer();
}

function triggerFeast() {
    clearInterval(timerId);
    timerId = null;
    playPauseBtn.textContent = "Play";
    plumbob.classList.add("paused");
    
    uiPanel.classList.add("hidden");
    bodyElement.style.backgroundColor = "#660000"; 
    feastScreen.classList.remove("hidden");

    if (!isMuted) {
        alarmSound.play().catch(error => console.log("Audio waiting for user context."));
    }
}

// Initial UI setup mapping configuration
updateUI();

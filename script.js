const TOTAL_TIME = 7200; // 120 minutes in seconds
let timeLeft = TOTAL_TIME;
let timerId = null;
let isMuted = false;

const bodyElement = document.getElementById('app-body');
const uiPanel = document.getElementById('ui-panel');
const hungerLabel = document.getElementById('hunger-label');
const hungerBar = document.getElementById('hunger-bar');
const plumbob = document.getElementById('plumbob-diamond');
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
    clearInterval(timerId);
    timerId = null;
    timeLeft = TOTAL_TIME;
    
    playPauseBtn.textContent = "Play";
    
    // Reset all design changes back to default Sims 2 periwinkle styles
    alarmSound.pause();
    alarmSound.currentTime = 0;
    bodyElement.style.backgroundColor = "#8fa1e0";
    uiPanel.classList.remove("feast-mode");
    
    // Restore the Hunger text and default green Plumbob color state
    hungerLabel.classList.remove("hide-label");
    plumbob.classList.remove("state-plumbob-red");
    
    feastScreen.classList.add("hidden");
    
    updateUI();
    
    // Automatically start the countdown loop again
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
    
    // FIX: Forces the Plumbob to explicitly stay spinning during Feast Mode
    plumbob.classList.remove("paused");
    plumbob.classList.add("spinning");
    
    // Force background to dark red
    bodyElement.style.setProperty('background-color', '#660000', 'important'); 
    
    // Activate Feast mode dark grey panel styles
    uiPanel.classList.add("feast-mode");
    feastScreen.classList.remove("hidden");
    
    // FIX: Hides the Hunger text block and forces the Plumbob to turn red
    hungerLabel.classList.add("hide-label");
    plumbob.classList.add("state-plumbob-red");

    if (!isMuted) {
        alarmSound.play().catch(error => console.log("Audio waiting for user click."));
    }
}

updateUI();

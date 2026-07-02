* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

body {
    background-color: #8fa1e0; /* Iconic Sims 2 pale periwinkle background */
    font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    transition: background-color 2s ease-in-out; /* Smooth transition to red */
    overflow: hidden;
}

/* The Sims 2 Blue HUD Panel Box */
.needs-panel {
    background: linear-gradient(to bottom, #9cb3f2, #7a8ed9);
    border: 3px solid #5869a8;
    border-radius: 20px;
    padding: 30px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.need-row {
    margin-bottom: 25px;
}

/* Dark Navy Text Style */
.need-label {
    display: block;
    color: #1a2a60;
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 12px;
    text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.4);
}

/* Outer Grooved Track for the Bar */
.bar-container {
    background-color: #404040;
    border: 2px solid #202020;
    border-radius: 50px;
    height: 32px;
    width: 100%;
    padding: 2px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
    overflow: hidden;
}

/* Capsule Bar Fill with Bevel/Gloss Profile */
.bar-fill {
    height: 100%;
    width: 100%;
    border-radius: 50px;
    box-shadow: inset 0 6px 4px rgba(255, 255, 255, 0.4), 
                inset 0 -6px 4px rgba(0, 0, 0, 0.3);
    transition: width 1s linear, background 0.5s ease;
}

/* Live Dynamic Sims Color States */
.state-green  { background: linear-gradient(to bottom, #5ce65c, #009900); }
.state-yellow { background: linear-gradient(to bottom, #ffff66, #cccc00); }
.state-orange { background: linear-gradient(to bottom, #ff9933, #e65c00); }
.state-red    { background: linear-gradient(to bottom, #ff3333, #990000); }

/* Buttons Styled to Complement the Retro Blue Theme */
.control-panel {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

button {
    flex: 1;
    background: linear-gradient(to bottom, #ffffff, #dcdcdc);
    border: 2px solid #5869a8;
    color: #1a2a60;
    font-size: 1rem;
    font-weight: bold;
    padding: 12px 0;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px #445284;
}

button:active {
    transform: translateY(2px);
    box-shadow: 0 2px #445284;
}

/* End Game State Animations */
.hidden {
    display: none !important;
}

#frenzied-feast-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feast-text {
    color: #ffffff;
    font-size: 3.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 4px 4px 0px #000000;
    animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

let timeLeft;
let timerId = null;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeButtons = document.querySelectorAll('.mode-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const saveSettingsBtn = document.getElementById('save-settings');
const closeSettingsBtn = document.getElementById('close-settings');
const pomodoroInput = document.getElementById('pomodoro-length');
const shortBreakInput = document.getElementById('short-break-length');
const longBreakInput = document.getElementById('long-break-length');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                isRunning = false;
                alert('Time is up!');
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    const activeButton = document.querySelector('.mode-btn.active');
    timeLeft = parseInt(activeButton.dataset.time) * 60;
    updateDisplay();
}

function setActiveMode(button) {
    modeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    timeLeft = parseInt(button.dataset.time) * 60;
    resetTimer();
}

function showSettings() {
    settingsModal.classList.add('show');
}

function hideSettings() {
    settingsModal.classList.remove('show');
}

function saveSettings() {
    modeButtons.forEach(btn => {
        const type = btn.dataset.type;
        switch(type) {
            case 'pomodoro':
                btn.dataset.time = pomodoroInput.value;
                break;
            case 'short':
                btn.dataset.time = shortBreakInput.value;
                break;
            case 'long':
                btn.dataset.time = longBreakInput.value;
                break;
        }
    });

    if (!isRunning) {
        const activeButton = document.querySelector('.mode-btn.active');
        timeLeft = parseInt(activeButton.dataset.time) * 60;
        updateDisplay();
    }

    hideSettings();
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeButtons.forEach(button => {
    button.addEventListener('click', () => setActiveMode(button));
});
settingsBtn.addEventListener('click', showSettings);
closeSettingsBtn.addEventListener('click', hideSettings);
saveSettingsBtn.addEventListener('click', saveSettings);
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        hideSettings();
    }
});

// Initialize timer
setActiveMode(modeButtons[0]); 
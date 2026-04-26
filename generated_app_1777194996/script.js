const displayElement = document.getElementById('display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapListElement = document.getElementById('lap-list');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;

function formatTime(ms) {
    const totalMilliseconds = Math.floor(ms);
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor(totalMilliseconds % 1000);

    const pad = (num, len = 2) => String(num).padStart(len, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function updateDisplay() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
    }
    displayElement.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        startStopBtn.textContent = 'Stop';
        timerInterval = setInterval(updateDisplay, 10);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;
    displayElement.textContent = '00:00:00:000';
    while (lapListElement.firstChild) {
        lapListElement.removeChild(lapListElement.firstChild);
    }
    startStopBtn.textContent = 'Start';
}

function lap() {
    if (isRunning) {
        lapCounter++;
        const currentFormattedTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${currentFormattedTime}`;
        lapListElement.appendChild(li);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initial display setup
updateDisplay();
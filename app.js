const colors = ['red', 'green', 'blue', 'yellow'];
let gameSequence = [];
let userSequence = [];
let gameStarted = false;
let round = 0;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        gameSequence = [];
        userSequence = [];
        round = 0;
        nextRound();
    }
}

function nextRound() {
    round++;
    userSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    document.getElementById('message').textContent = `Round ${round}: Watch the sequence!`;
    playSequence();
}

function playSequence() {
    let index = 0;
    const interval = setInterval(() => {
        const color = gameSequence[index];
        flashColor(color);
        index++;
        if (index === gameSequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('message').textContent = 'Your turn to repeat!';
                enableUserInput();
            }, 500);
        }
    }, 1000);
}

function flashColor(color) {
    const element = document.getElementById(color);
    element.classList.add('active');
    setTimeout(() => {
        element.classList.remove('active');
    }, 500);
}

function enableUserInput() {
    colors.forEach(color => {
        document.getElementById(color).addEventListener('click', handleUserClick);
    });
}

function handleUserClick(event) {
    const color = event.target.id;
    userSequence.push(color);
    flashColor(color);
    checkUserSequence();
}

function checkUserSequence() {
    const currentIndex = userSequence.length - 1;
    if (userSequence[currentIndex] !== gameSequence[currentIndex]) {
        gameOver();
        return;
    }
    if (userSequence.length === gameSequence.length) {
        disableUserInput();
        setTimeout(() => {
            nextRound();
        }, 1000);
    }
}

function disableUserInput() {
    colors.forEach(color => {
        document.getElementById(color).removeEventListener('click', handleUserClick);
    });
}

function gameOver() {
    document.getElementById('message').textContent = `Game Over! You reached Round ${round}`;
    gameStarted = false;
    round = 0;
    gameSequence = [];
    userSequence = [];
}

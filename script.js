const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
let playerChoice;
let computerChoice;
let timeout;
let playerWins = 0;
let computerWins = 0;
let roundCounter = 0;
let lessThanFiveRoundsWon = true;
let playerName = prompt('Tell me your Name...please!');

if (playerName === null || playerName === '' || playerName === undefined) {
    playerName = 'Player';
}

const gameButtons = document.querySelectorAll('.input-button');
gameButtons.forEach(button => {
    button.addEventListener('click', game);
    button.addEventListener('transitionend', removeTransition);
});

const replayButton = document.querySelector('.replay');
replayButton.addEventListener('click', delayReplayGame);
replayButton.addEventListener('click', addReplayButtonEffect);
replayButton.addEventListener('transitionend', removeTransition);


const leftOutput = document.querySelector('.left');
const rightOutput = document.querySelector('.right');
const playerDefImg = document.createElement('img');
const playerImg = document.createElement('img');
const compDefImg = document.createElement('img');
const compImg = document.createElement('img');
const playerOutputTitle = document.createElement('p');

playerDefImg.setAttribute('src', 'player.png');
playerDefImg.setAttribute('alt', 'player');
playerDefImg.setAttribute('width', '120');
compDefImg.setAttribute('src', 'computer.png');
compDefImg.setAttribute('alt', 'computer');
compDefImg.setAttribute('width', '120');

playerOutputTitle.textContent = `${playerName}`;
leftOutput.appendChild(playerOutputTitle);
leftOutput.appendChild(playerDefImg);
rightOutput.appendChild(compDefImg);


function getButtonValue(e) {
    document.querySelector(`#${e.target.id}`).classList.add('pushed');
    replayButton.classList.add('replay-transition');
    return e.target.alt;
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pushed');
}

function addReplayButtonEffect() {
    replayButton.classList.add('pushed');
}

function showGameRules() {
    const output = document.querySelector('.output-text');
    output.innerHTML = `<p><b><u>Hi ${playerName}!</b></u></p>
                        <p>Play: ROCK PAPER SCISSORS against the computer!</p>
                        <p>The rules are simple:</p>
                        <p><b>Rock beats Scissors</b></p>
                        <p><b>Paper beats Rock</b></p>
                        <p><b>Scissors beats Paper</b></p>
                        <p>In case of a tie, nobody wins the round</p>
                        <p>Choose your weapon, wisely!</p>
                        <p><b>Push a button...</b></p>
                        <p>Good luck!</p>
                        <p><u>The first one to win 5 rounds, wins the game!</u></p>`;

    console.log(`Hi ${playerName}!`);
    console.log('Play: ROCK PAPER SCISSORS against the computer!');
    console.log('The rules are simple:');
    console.log('Rock beats Scissors');
    console.log('Paper beats Rock');
    console.log('Scissors beats Paper');
    console.log('In case of a tie, nobody wins the round')
    console.log('Choose your weapon, wisely!')
    console.log('Push a button...')
    console.log('Good luck!');
    console.log('The first one to win 5 rounds, wins the game!');
    console.log('-------------------------------------------------');
}

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    computerChoice = randomNumber === 0 ? rock : randomNumber === 1 ? paper : scissors;

    const output = document.querySelector('.output-text');
    output.innerHTML += `<p>Computer: ${computerChoice}</p>`;
    console.log('Computer:', computerChoice);

    return computerChoice;
}

function getPlayerChoice(e) {
    playerChoice = getButtonValue(e);
    roundCounter++;
    const output = document.querySelector('.output-text');
    output.innerHTML = `<p><b><u>Round no. ${roundCounter}</u></b></p>
                        <p>${playerName}: ${playerChoice}</p>`;
    console.log(`Round no. ${roundCounter}`);
    console.log(`${playerName}:`, playerChoice);
    return playerChoice;
}

function playRound(playerSelection, computerSelection) {
    const playerSelectionFirstCapital = playerSelection[0].toUpperCase() + playerSelection.slice(1);
    const computerSelectionFirstCapital = computerSelection[0].toUpperCase() + computerSelection.slice(1);
    const youWin = `You Win!`;
    const winComment = ` ${playerSelectionFirstCapital} beats ${computerSelectionFirstCapital}!`;
    const youLose = `You Lose!`;
    const loseComment = ` ${computerSelectionFirstCapital} beats ${playerSelectionFirstCapital}!`;
    const tie = `It's a tie!`;

    if (playerSelection === rock && computerSelection === scissors) {
        playerWins++;
        return youWin + winComment;
    } else if (playerSelection === paper && computerSelection === rock) {
        playerWins++;
        return youWin + winComment;
    } else if (playerSelection === scissors && computerSelection === paper) {
        playerWins++;
        return youWin + winComment;
    } else if (computerSelection === rock && playerSelection === scissors) {
        computerWins++;
        return youLose + loseComment;
    } else if (computerSelection === paper && playerSelection === rock) {
        computerWins++;
        return youLose + loseComment;
    } else if (computerSelection === scissors && playerSelection === paper) {
        computerWins++;
        return youLose + loseComment;
    } else {
        return tie;
    }
}

function game(e) {
    let currentRound = true;

    while (lessThanFiveRoundsWon && currentRound) {
        let roundResult = playRound(getPlayerChoice(e), getComputerChoice());
        let playerRounds = playerWins === 1 ? 'round' : 'rounds';
        let computerRounds = computerWins === 1 ? 'round' : 'rounds';

        lessThanFiveRoundsWon = playerWins < 5 && computerWins < 5;
        currentRound = false;

        const output = document.querySelector('.output-text');
        output.innerHTML += `<p><b>${roundResult}</b></p>
                        <p><b>You won ${playerWins} ${playerRounds}</b></p>
                        <p><b>The computer won ${computerWins} ${computerRounds}</b></p>`;

        console.log(roundResult);
        console.log(`You won ${playerWins} ${playerRounds}`);
        console.log(`The computer won ${computerWins} ${computerRounds}`);
        console.log('-------------------------------------------------');

        playerImg.setAttribute('src', `${e.target.alt}.png`);
        playerImg.setAttribute('width', '120');
        leftOutput.removeChild(leftOutput.lastChild);        
        leftOutput.appendChild(playerImg);

        compImg.setAttribute('src', `${computerChoice}.png`);
        compImg.setAttribute('width', '120');
        rightOutput.removeChild(rightOutput.lastChild);
        rightOutput.appendChild(compImg);
    }

    if (playerWins === 5) {
        const output = document.querySelector('.output-text');
        output.innerHTML += `<p style="color: #C13E22;"><b><i>Congratulations ${playerName}! You won the game!</i></b></p>`;
        console.log(`Congratulations ${playerName}! You won the game!`);
    } else if (computerWins === 5) {
        const output = document.querySelector('.output-text');
        output.innerHTML += `<p style="color: #C13E22;"><b><i>Sorry ${playerName}! You lost this time!</i></b></p>`;
        console.log(`Sorry ${playerName}! You lost this time!`);
    }

    finishGame();
}

function finishGame() {
    if (!lessThanFiveRoundsWon) {
        gameButtons.forEach(button => {
            button.removeEventListener('click', game);
        });
        replayButton.classList.toggle('replay');
    }
}

function delayReplayGame() {
    console.log('Start 500ms timeout!');
    timeout = setTimeout(replayGame, 500);
}

function replayGame() {
    window.location.reload();
}

showGameRules();

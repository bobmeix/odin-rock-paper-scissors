const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
let playerChoice;
let playerWins = 0;
let computerWins = 0;
let roundCounter = 0;
let playerName; // = prompt('Tell me your Name...please!');

const rockButton = document.querySelector('#r');
rockButton.addEventListener('click', game);
const paperButton = document.querySelector('#p');
paperButton.addEventListener('click', game);
const scissorsButton = document.querySelector('#s');
scissorsButton.addEventListener('click', game);

if (playerName === null || playerName === '' || playerName === undefined) {
    playerName = 'Player';
}

function getButtonValue(e) {
    return e.target.value;
}

function showGameRules() {
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
    let computerChoice = randomNumber === 0 ? rock : randomNumber === 1 ? paper : scissors;
    console.log('Computer:', computerChoice);
    return computerChoice;
}

function getPlayerChoice() {    
    //let playerChoice = prompt('Choose your Weapon: Rock, Paper or Scissors');
    // let wrongInput = (playerChoice !== 'r' && playerChoice !== 'p' && playerChoice !== 's');
    // while (wrongInput) {
    //     alert(`You should input:   r,   p   or   s.`);
    //     playerChoice = prompt('Choose your Weapon: Rock, Paper or Scissors');
    //     wrongInput = (playerChoice !== 'r' && playerChoice !== 'p' && playerChoice !== 's');
    // }
    roundCounter++;
    playerChoice = playerChoice === 'r' ? rock :
                   playerChoice === 'p' ? paper :
                   playerChoice === 's' ? scissors :
                   null;
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
    playerChoice = getButtonValue(e);
    let lessThanFiveRoundsWon = true;
    let currentRound = true;
    
    while (lessThanFiveRoundsWon && currentRound) {
        let roundResult = playRound(getPlayerChoice(), getComputerChoice());        
        let playerRounds = playerWins === 1 ? 'round' : 'rounds';
        let computerRounds = computerWins === 1 ? 'round' : 'rounds';

        lessThanFiveRoundsWon = playerWins < 5 && computerWins < 5;
        currentRound = false;

        console.log(roundResult);
        console.log(`You won ${playerWins} ${playerRounds}`);
        console.log(`The computer won ${computerWins} ${computerRounds}`);
        console.log('-------------------------------------------------');
    }

    if (playerWins === 5) {
        console.log(`Congratulations ${playerName}! You won the game!`);
    } else if (computerWins === 5) {
        console.log(`Sorry ${playerName}! You lost this time!`);
    }
}

showGameRules();

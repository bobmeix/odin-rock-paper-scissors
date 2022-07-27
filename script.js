const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3);
    let computerChoice = randomNumber === 0 ? rock : randomNumber === 1 ? paper : scissors;
    console.log('Computer:', computerChoice);
    return computerChoice;
}

function getPlayerChoice() {
    let playerChoice = prompt('Choose your Weapon: Rock, Paper or Scissors').toLowerCase();
    let wrongInput = (playerChoice !== rock && playerChoice !== paper && playerChoice !== scissors);
    while (wrongInput) {
        alert('You should input one of the 3 words');
        playerChoice = prompt('Choose your Weapon: Rock, Paper or Scissors').toLowerCase();
        wrongInput = (playerChoice !== rock && playerChoice !== paper && playerChoice !== scissors);
    }
    console.log('Player:', playerChoice);
    return playerChoice;
}

function playRound(playerSelection, computerSelection) {
    const playerSelectionFirstCapital = playerSelection[0].toUpperCase() + playerSelection.slice(1);
    const computerSelectionFirstCapital = computerSelection[0].toUpperCase() + computerSelection.slice(1);
    const youWin = `You Win! ${playerSelectionFirstCapital} beats ${computerSelectionFirstCapital}!`;
    const youLose = `You Lose! ${computerSelectionFirstCapital} beats ${playerSelectionFirstCapital}!`;
    const tie = `It's a tie!`;
    
    if (playerSelection === rock && computerSelection === scissors){
        return youWin;
    } else if (playerSelection === paper && computerSelection === rock) {
        return youWin;
    } else if (playerSelection === scissors && computerSelection === paper) {
        return youWin;
    } else if (computerSelection === rock && playerSelection === scissors) {
        return youLose;
    } else if (computerSelection === paper && playerSelection === rock) {
        return youLose;
    } else if (computerSelection === scissors && playerSelection === paper) {
        return youLose;
    } else {
        return tie;
    }
}

//console.log(getPlayerChoice(), getComputerChoice());
console.log(playRound(getPlayerChoice(), getComputerChoice()));

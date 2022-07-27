const rock = 'rock';
const paper = 'paper';
const scissors = 'scissors';
let playerWins = 0;
let computerWins = 0;

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
    const youWin = `You Win!`;
    const winComment = ` ${playerSelectionFirstCapital} beats ${computerSelectionFirstCapital}!`;
    const youLose = `You Lose!`;
    const loseComment = ` ${computerSelectionFirstCapital} beats ${playerSelectionFirstCapital}!`;
    const tie = `It's a tie!`;
    
    if (playerSelection === rock && computerSelection === scissors){
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

function game() {
    console.log('The first one to win 5 rounds, wins the game!');
    while (playerWins < 5 && computerWins < 5) {
        let roundResult = playRound(getPlayerChoice(), getComputerChoice());        
        console.log(roundResult);
        console.log(`You won ${playerWins} rounds`);
        console.log(`The computer won ${computerWins} rounds`);
    }

    if (playerWins === 5) {
        console.log('Congratulations! You won the game!');
    } else if (computerWins === 5) {
        console.log('Sorry! You lost this time!');
    }
}

game();

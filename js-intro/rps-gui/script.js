let computerPoints = 0
let playerPoints = 0
let gameIsOver = false

const rockButton = document.querySelector(".rock")
rockButton.addEventListener("click", () => {
    playRound("ROCK", getComputerChoice())
    gameIsOver = updateGameState()
    if(gameIsOver){
        winner = playerPoints == 5 ? "Player" : "Computer"
        alert(winner + " won!")
    }
})

const paperButton = document.querySelector(".paper")
paperButton.addEventListener("click", () => {
    playRound("PAPER", getComputerChoice())
    gameIsOver = updateGameState()
    if(gameIsOver){
        winner = playerPoints == 5 ? "Player" : "Computer"
        alert(winner + " won!")
    }
})

const scissorsButton = document.querySelector(".scissors")
scissorsButton.addEventListener("click", () => {
    playRound("SCISSORS", getComputerChoice())
    gameIsOver = updateGameState()
    if(gameIsOver){
        winner = playerPoints == 5 ? "Player" : "Computer"
        alert(winner + " won!")
    }
})

const roundResult = document.querySelector(".result-label")
const playerScore = document.querySelector(".player-score")
const computerScore = document.querySelector(".computer-score")

function getComputerChoice(){
    const rand = Math.trunc( 3 * Math.random());
    if (rand === 0){
        return "ROCK";
    }
    else if (rand === 1) {
        return "PAPER";
    }
    else {
        return "SCISSORS";
    }
}

function playRound(playerSelection, computerSelection){
    if(!gameIsOver){
        if(playerSelection === "ROCK"){
            if(computerSelection == "PAPER"){
                roundResult.textContent = "You lose! Paper beats Rock"
                computerPoints++
                computerScore.textContent = `${computerPoints}`
                return;
            }
            else if(computerSelection == "SCISSORS"){
                roundResult.textContent = "You win! Rock beats Scissors"
                playerPoints++
                playerScore.textContent = `${playerPoints}`
                return;
            }
        }
        if(playerSelection === "PAPER"){
            if(computerSelection == "SCISSORS"){
                roundResult.textContent = "You lose! Scissors beats Paper"
                computerPoints++
                computerScore.textContent = `${computerPoints}`
                return;
            }
            else if(computerSelection == "ROCK"){

                roundResult.textContent = "You win! Paper beats Rock"
                playerPoints++
                playerScore.textContent = `${playerPoints}`
                return;
            }
        }
        if(playerSelection === "SCISSORS"){
            if(computerSelection == "ROCK"){
                roundResult.textContent = "You lose! Rock beats Scissors"
                computerPoints++
                computerScore.textContent = `${computerPoints}`
                return;
            }
            else if(computerSelection == "PAPER"){
                roundResult.textContent = "You win! Scissors beats Paper"
                playerPoints++
                playerScore.textContent = `${playerPoints}`
                return;
            }
        }
        roundResult.textContent = "Draw!"
        return;
    }
}

function updateGameState(){
    return computerPoints > 4 || playerPoints > 4
}

let computerPoints = 0
let playerPoints = 0

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
    const playerCaseInsensitive = playerSelection.toUpperCase();
    if(playerSelection === "ROCK"){
        if(computerSelection == "PAPER"){
            console.log("You lose! Paper beats Rock");
            computerPoints++
            return;
        }
        else if(computerSelection == "SCISSORS"){
            console.log("You win! Rock beats Scissors");
            playerPoints++
            return;
        }
    }
    if(playerSelection === "PAPER"){
        if(computerSelection == "SCISSORS"){
            console.log("You lose! Scissors beats Paper");
            computerPoints++
            return;
        }
        else if(computerSelection == "ROCK"){
            console.log("You win! Paper beats Rock");
            playerPoints++
            return;
        }
    }
    if(playerSelection === "SCISSORS"){
        if(computerSelection == "ROCK"){
            console.log("You lose! Rock beats Scissors");
            computerPoints++
            return;
        }
        else if(computerSelection == "PAPER"){
            console.log("You win! Scissors beats Paper");
            playerPoints++
            return;
        }
    }
    console.log("Draw!")
    return;
}

for(i = 0; i < 5; i++){
    playRound(prompt("Choose rock, paper, or scissors").toUpperCase(), getComputerChoice())
}

if(playerPoints > computerPoints){
    console.log("You won the game!")
}
else if(playerPoints < computerPoints){
    console.log("You lost the game!")
}
else {
    console.log("The game was a draw!")
}
console.log(`The score was ${playerPoints}-${computerPoints}`)
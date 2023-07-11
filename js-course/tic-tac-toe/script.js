let currentPlayer = "player"
let opponent = "AI"

const gameboard = (() => {
    let spaces = [
        [document.querySelector(".top-left"), document.querySelector(".top-center"), document.querySelector(".top-right")],
        [document.querySelector(".center-left"), document.querySelector(".center-center"), document.querySelector(".center-right")],
        [document.querySelector(".bottom-left"), document.querySelector(".bottom-center"), document.querySelector(".bottom-right")]
    ]
    let winCons = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    return {
        spaces, winCons
    }
})();

const game = (() => {
    let winner = ""
    let resultDisplay = document.querySelector(".result")
    
    let checkState = lastPlayer => {
        let gameIsOver = gameboard.winCons.some((e) => {
           return gameboard.spaces[Math.trunc(e[2] / 3)][e[2] % 3].textContent === gameboard.spaces[Math.trunc(e[0] / 3)][e[0] % 3].textContent && 
           gameboard.spaces[Math.trunc(e[2] / 3)][e[2] % 3].textContent === gameboard.spaces[Math.trunc(e[1] / 3)][e[1] % 3].textContent &&
           gameboard.spaces[Math.trunc(e[2] / 3)][e[2] % 3].textContent !== ""
        }) 
        let isDraw = gameboard.spaces.flat().every(e => e.textContent !== "")
        if (gameIsOver && !isDraw) {
            endGame(lastPlayer)
        }
        else if (isDraw && !gameIsOver){
            endGame("Draw")
        }
        else if(isDraw && gameIsOver){
            endGame(lastPlayer)
        }
    }
    let endGame = lastPlayer => {
        if(lastPlayer === "Draw")
        {
            resultDisplay.textContent = "It's a draw!"
        }
        else
        {
            resultDisplay.textContent = lastPlayer + " won!"
        }
        console.log(lastPlayer)
        game.winner = lastPlayer
        resultDisplay.style.visibility = "visible" 
    }
    return {
        resultDisplay, gameboard, checkState, endGame, winner

    }
})();





const aiPlayer = (() => {
    const play = () => {
        let place = Math.round(8 * Math.random())
        let row = Math.trunc(place / 3) 
        let column = place % 3
        
        while(gameboard.spaces[row][column].textContent !== "") {
            place = Math.round(8 * Math.random())
            row = Math.trunc(place / 3) 
            column = place % 3
        }

        gameboard.spaces[row][column].textContent = "O"
        
    }
    return {
        play
    }
})();

Array.from(document.querySelector(".gameboard").children[0].children).forEach(e => e.addEventListener("click", () => {
    if (e.textContent === "") {
        e.textContent = currentPlayer === "player" ? "X" : "O"
    if(opponent === "AI") {
        game.checkState("Player")
        if(game.winner === "")
        {
            aiPlayer.play()
            game.checkState(opponent)
        }
        
        
        currentPlayer = "player"
    } else {
        currentPlayer = "AI"
        game.checkState()
    }
    }
    
}))

document.querySelector(".easy").addEventListener("click", () => {
    game.resultDisplay.style.visibility = "hidden" 
    gameboard.spaces.forEach((e, idx, arr) => {
        arr[idx].forEach((e, idx, arr) => {arr[idx].textContent = ""})
    })
    game.winner = ""

})

const humanPlayer = (() => {
})();


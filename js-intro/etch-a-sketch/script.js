function onHover(){
    this.style.backgroundColor = "black"
}

function constructBoard(squaresNum){
    for(i = 0; i < squaresNum; i++){
        let div = document.createElement("div")
        
        div.style.border = "1px solid black"
        div.style.aspectRatio = "1 / 1"
        div.addEventListener("mouseover", onHover)
        board.appendChild(div)
    }
}

const board = document.querySelector(".board");
board.style.display = "grid";
board.style.gridTemplateColumns = "repeat(16, 1fr)";
board.style.gridTemplateRows = "repeat(16, 1fr)";
board.style.gridColumnGap = "2px"
board.style.gridRowGap = "2px"
board.style.height = "720px"
board.style.width = "720px"
board.style.margin = "auto"

const body = document.querySelector("body")
body.style.display = "flex"
body.style.flexDirection = "column"
body.style.justifyContent = "center"
body.style.alignItems = "center"
body.style.gap = "18px"


const button = document.querySelector("button")
button.style.width = "fit-content"

let squaresNum = 256;

constructBoard(squaresNum)

button.addEventListener("click", () => {
    squaresNum = Math.pow(parseInt(prompt("Enter the number of squares per side")), 2)
    board.style.gridTemplateRows = `repeat(${Math.sqrt(squaresNum)}, 1fr)`
    board.style.gridTemplateColumns = `repeat(${Math.sqrt(squaresNum)}, 1fr)`
    Array.from(board.children).forEach(e => board.removeChild(e))
    constructBoard(squaresNum)
})
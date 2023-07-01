const add = (a, b) => a + b
const subtract = (a, b) => a - b
const multiply = (a, b) => a * b
const divide = (a, b) => a / b
const modulo = (a, b) => a % b

let operator = ""

let evaluate = (num1, num2, str) => {
    if(str === "+")
        return add(num1, num2)
    else if(str === "-")
        return subtract(num1, num2)
    else if(str === "*")
        return multiply(num1, num2)
    else if(str === "/")
        return divide(num1, num2)
    else if(str === "%")
        return modulo(num1, num2)
}

let active = document.querySelector(".active")

let screen = document.querySelector(".screen")

document.querySelector(".one").addEventListener("click", () => {
    active.textContent += "1"
})
document.querySelector(".two").addEventListener("click", () => {
    active.textContent += "2"
})
document.querySelector(".three").addEventListener("click", () => {
    active.textContent += "3"
})
document.querySelector(".four").addEventListener("click", () => {
    active.textContent += "4"
})
document.querySelector(".five").addEventListener("click", () => {
    active.textContent += "5"
})
document.querySelector(".six").addEventListener("click", () => {
    active.textContent += "6"
})
document.querySelector(".seven").addEventListener("click", () => {
    active.textContent += "7"
})
document.querySelector(".eight").addEventListener("click", () => {
    active.textContent += "8"
})
document.querySelector(".nine").addEventListener("click", () => {
    active.textContent += "9"
})
document.querySelector(".zero").addEventListener("click", () => {
    active.textContent += "0"
})

document.querySelector(".add").addEventListener("click", () => {
    
    if(operator === ""){
        active.textContent += " + "
    }
    else {
        let tokens = active.textContent.split(" ")
        active.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000} + `
    }
    operator = "+"
})

document.querySelector(".subtract").addEventListener("click", () => {
    
    if(operator === ""){
        active.textContent += " - "
    }
    else {
        let tokens = active.textContent.split(" ")
        active.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000} - `
    }
    operator = "-"
})

document.querySelector(".multiply").addEventListener("click", () => {
    
    if(operator === ""){
        active.textContent += " * "
    }
    else {
        let tokens = active.textContent.split(" ")
        active.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000} * `
    }
    operator = "*"
})

document.querySelector(".divide").addEventListener("click", () => {
    
    if(operator === ""){
        active.textContent += " / "
    }
    else {
        let tokens = active.textContent.split(" ")
        active.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000} / `
    }
    operator = "/"
})

document.querySelector(".mod").addEventListener("click", () => {
    
    if(operator === ""){
        active.textContent += " % "
    }
    else {
        let tokens = active.textContent.split(" ")
        active.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000} % `
    }
    operator = "%"
})

document.querySelector(".equals").addEventListener("click", () => {
    let tokens = active.textContent.split(" ")
    screen.textContent = `${Math.round(evaluate(parseFloat(tokens[0]), parseFloat(tokens[2]), tokens[1]) * 1000) / 1000}`
})

document.querySelector(".ac").addEventListener("click", () => {
    screen.textContent = ""
    active.textContent = ""
    operator = ""
})

document.querySelector(".c").addEventListener("click", () => {
    active.textContent = active.textContent.substring(0, active.textContent.length - 1)
})

document.querySelector(".decimal").addEventListener("click", () => {
    active.textContent += "."
})
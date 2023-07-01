let body = document.querySelector("body")

let red_p = document.createElement("p")
red_p.style.color = "red"
red_p.textContent = "Hey I'm red!"

body.appendChild(red_p)

let blue_h3 = document.createElement("h3")
blue_h3.style.color = "blue"
blue_h3.textContent = "I'm a blue h3!"

body.appendChild(blue_h3)

let div = document.createElement("div")

let h1 = document.createElement("h1")
h1.textContent = "I'm in a div"

let p = document.createElement("p")
p.textContent = "ME TOO!"

div.appendChild(h1)
div.appendChild(p)

body.appendChild(div)
import Menu from "./menu"
import Home from './home'
import Contact from "./contact"

const content = document.getElementById("content")
content.style.backgroundColor = "black"
content.style.display = "flex"
content.style.flexDirection = "column"
content.style.gap = "18px"
let header = document.createElement("div")
header.style.display = "flex"
header.style.flexDirection = "column"
header.style.justifyContent = "center"
header.style.alignItems = "center"
header.style.gap = "18px"

let name = document.createElement("div")
name.textContent = "Ray's Pizzeria"
name.style.color = "white"
name.style.paddingTop = "8px"
header.appendChild(name)


let nav = document.createElement("div")
nav.style.display = "flex"
nav.style.color = "white"
nav.style.justifyContent = "space-between"
nav.style.gap = "25vw"

let home = document.createElement("button")
home.textContent = "home"

let menu = document.createElement("button")
menu.textContent = "menu"

let contact = document.createElement("button")
contact.textContent = "contact"

nav.appendChild(home)
nav.appendChild(menu)
nav.appendChild(contact)
header.appendChild(nav)
content.appendChild(header)

let main = document.createElement("div")
main.classList.add("main")
main.style.display = "flex"
content.appendChild(main)
Home()

home.addEventListener("click", Home)
menu.addEventListener("click", Menu)
contact.addEventListener("click", Contact)





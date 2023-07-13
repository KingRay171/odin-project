const Menu = () => {
    const main = document.querySelector(".main")
    Array.from(main.children).forEach(e => e.remove())
    main.style.display = "grid"
    main.style.gridTemplate = "1fr 1fr 1fr / 1fr 1fr"
    main.style.gap = "20px";

    ["Cheese", "Pepperoni", "Veggie", "Meat Lover's", "Supreme", "Hawaiian"].forEach(e => {
        const div = document.createElement("div")
        div.style.backgroundColor = "white"
        div.style.border = "1px solid black"
        div.textContent = e
        main.appendChild(div)
    })

}

export default Menu
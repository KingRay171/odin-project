import Icon from './pizza.jpg'

const Home = () => {
    const main = document.querySelector(".main")
    Array.from(main.children).forEach(e => e.remove())
    
    main.style.flexDirection = "row"
    main.style.gap = "25vw"

    const myIcon = new Image()
    myIcon.src = Icon

    let mainText = document.createElement("div")
    mainText.style.color = "white"
    mainText.textContent = "Lorem ipsum"


    main.appendChild(myIcon)
    main.appendChild(mainText)

    content.appendChild(main)
}

export default Home
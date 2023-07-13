const Contact = () => {
    const main = document.querySelector(".main")
    Array.from(main.children).forEach(e => e.remove())

    main.style.display = "flex"
    main.style.flexDirection = "column"

    const phone = document.createElement("div")
    phone.style.color = "white"
    phone.textContent = "Phone: 301-420-6969"

    const addr = document.createElement("div")
    addr.style.color = "white"
    addr.textContent = "Address: 6969 Jane Street, Cleveland OH"

    main.appendChild(phone)
    main.appendChild(addr)
}

export default Contact
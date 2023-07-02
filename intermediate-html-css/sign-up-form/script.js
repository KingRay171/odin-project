const password = document.querySelector("#password")
const confirm = document.querySelector("#confirm")


document.querySelector(".submit").addEventListener("click", () => {
    if(password.value !== confirm.value){
        password.style.border = "2px solid red"
        confirm.style.border = "2px solid red"
    }
})
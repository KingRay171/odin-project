const buttons = document.querySelectorAll("button")

buttons.forEach(btn => btn.addEventListener("click", () => alert(btn.id)))
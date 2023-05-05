
const looseBox = document.createElement('div')
const looseButton = document.createElement('div')
looseButton.innerHTML = "Try again"
const looseText = document.createElement('div')
looseText.innerHTML = "Nice try but you loose !"
looseText.classList.add("text")
looseButton.classList.add("button")
looseButton.addEventListener("click", () => {
    console.log("click");
})
looseBox.classList.add("looseBox") 
looseBox.appendChild(looseText)
looseBox.appendChild(looseButton)
document.body.appendChild(looseBox)
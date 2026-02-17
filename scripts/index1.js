const welcome = document.querySelector(".welcome");
const textElement = welcome.querySelector("h1");

const text = "¡WELCOME!";
let index = 0;
const speed = 120;
function typeEffect() {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, speed);
  } else {
    setTimeout(() => {
      welcome.classList.add("ocultar");
    }, 1000);
    
    setTimeout(() => {
      welcome.remove();
    }, 2500);
  }
}
typeEffect();

const content = document.querySelector(".content");

setTimeout(() => {
  content.classList.add("mostrar");
}, 3600);

const emailInput = document.getElementById("email");
emailInput.addEventListener("invalid", () => {
  emailInput.setCustomValidity("Please enter a valid email address");
});
emailInput.addEventListener("input", () => {
  emailInput.setCustomValidity("");
});

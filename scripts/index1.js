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
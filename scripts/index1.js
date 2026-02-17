//Welcome Mostrar
document.addEventListener("DOMContentLoaded", () => {
  
  const welcome = document.querySelector(".welcome");
  if (!welcome) return;
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
  
  //Validacion de Email
  const emailInput = document.getElementById("email");
  emailInput.addEventListener("invalid", () => {
    emailInput.setCustomValidity("Please enter a valid email address");
  });
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
  });
  
  //Validacion Password
  const passwordInput = document.getElementById("password");

passwordInput.addEventListener("invalid", () => {
  if (passwordInput.value.length < 8) {
    passwordInput.setCustomValidity("Password must be at least 8 characters");
  }
});

//.         Validaciones Incorrectas
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("pass-error");

// EMAIL
emailInput.addEventListener("invalid", () => {
  emailError.textContent = "Please enter a valid email address";
  emailError.classList.add("show");
  emailInput.classList.add("input-error");
});

emailInput.addEventListener("input", () => {
  emailError.textContent = "";
  emailError.classList.remove("show");
  emailInput.classList.remove("input-error");
});

// PASSWORD
passwordInput.addEventListener("invalid", () => {
  if (passwordInput.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    passwordError.classList.add("show");
    passwordInput.classList.add("input-error");
  }
});

passwordInput.addEventListener("input", () => {
  passwordError.textContent = "";
  passwordError.classList.remove("show");
  passwordInput.classList.remove("input-error");
});

passwordInput.addEventListener("input", () => {
  passwordInput.setCustomValidity("");
});
  
  //Boton Primario
  const form = document.querySelector(".form1");
  const btnLogin = document.querySelector(".btn-primary");
  if (form){
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    form.style.transform = `translate(${x}px, ${y}px)`;
  });
  }
  //Loading Boton
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  if (!form.checkValidity()) return;
  e.preventDefault();
  
  // activar loading visual
  form.classList.add("is-loading");
  btnLogin.classList.add("loading");
  btnLogin.disabled = true;
  btnLogin.textContent = "Loading...";
  
  setTimeout(() => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    const fakeEmail = "test@email.com";
    const fakePassword = "12345678";
    
    if (email === fakeEmail && password === fakePassword) {
      btnLogin.textContent = "Success ✓";
    } else {
      btnLogin.textContent = "Invalid credentials";
      
      // ⬅️ quitar efecto solo si falla
      form.classList.remove("is-loading");
      btnLogin.classList.remove("loading");
      btnLogin.disabled = false;
    }
  }, 2000);
});

//Barra de Password Prop
const strengthBar = document.querySelector(".password-strength");
if (!strengthBar) return;
passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;
  let strength = 0;
  
  // Mostrar barra solo si hay texto
  if (value.length > 0) {
    strengthBar.classList.add("visible");
  } else {
    strengthBar.className = "password-strength";
    return;
  }
  
  if (value.length >= 8) strength++;
  if (/[A-Z]/.test(value)) strength++;
  if (/[0-9]/.test(value)) strength++;
  if (/[^A-Za-z0-9]/.test(value)) strength++;
  
  strengthBar.className = "password-strength visible";
  
  if (strength <= 1) {
    strengthBar.classList.add("weak");
  } else if (strength <= 3) {
    strengthBar.classList.add("medium");
  } else {
    strengthBar.classList.add("strong");
  }
});
});
//Variables
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15000; // 15 segundos
let isLocked = false;


//Welcome
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
  
//Email Validation
  const emailInput = document.getElementById("email");
  emailInput.addEventListener("invalid", () => {
    emailInput.setCustomValidity("Please enter a valid email address");
  });
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
  });
  
//Passw Validation
  const passwordInput = document.getElementById("password");
  
  passwordInput.addEventListener("invalid", () => {
    if (passwordInput.value.length < 8) {
      passwordInput.setCustomValidity("Password must be at least 8 characters");
    }
  });
  
//          Incorrects Validations
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("pass-error");
  
//Email
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
  
//Passw
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
  
//Primary BTN
  const form = document.querySelector(".form1");
  const btnLogin = document.querySelector(".btn-primary");
  if (form) {
    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      form.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
  
              //SUBMIT
//Loading BTN
 form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) return;
  
  // UI loading
  form.classList.add("is-loading");
  btnLogin.classList.add("loading");
  btnLogin.disabled = true;
  btnLogin.textContent = "Verifying...";
  
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailInput.value,
        password: passwordInput.value
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Invalid credentials");
    }
    
    // SUCCESS
    btnLogin.textContent = "Success ✓";
    
    const dashboard = document.querySelector(".dashboard");
    form.classList.add("exit");
    
    setTimeout(() => {
      form.style.display = "none";
      dashboard.classList.add("show");
    }, 600);
    
  } catch (error) {
    // ERROR
    form.classList.remove("is-loading");
    btnLogin.classList.remove("loading");
    btnLogin.disabled = false;
    btnLogin.textContent = error.message;
    
    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 400);
  }
  
  fetch("http://localhost:3000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    password
  })
})
});
 
 
//Passw Security Show Bar
const strengthBar = document.querySelector(".password-strength");

if (strengthBar) {
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    let strength = 0;
    
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
}

});
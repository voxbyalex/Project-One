// ================== VARIABLES ==================
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15000;
let isLocked = false;

// ================== DOM READY ==================
document.addEventListener("DOMContentLoaded", () => {
  
  // ELEMENTOS
  const welcome = document.querySelector(".welcome");
  const textElement = welcome?.querySelector("h1");
  const content = document.querySelector(".content");
  
  const form = document.querySelector(".form1");
  const btnLogin = document.querySelector(".btn-primary");
  const registerBtn = document.querySelector(".btn-secundary");
  
//EMAIL VALIDATION
  const emailInput = document.getElementById("email");
//PASS VALIDATION
  const passwordInput = document.getElementById("password");
  
  
//CODIGO NUEVO
  const loginError = document.getElementById("login-error");

[emailInput, passwordInput].filter(Boolean).forEach(input =>  {
  input.addEventListener("input", () => {
    loginError.classList.remove("show");
    loginError.textContent = "";
  });
});
  
  
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("pass-error");
  
  const dashboard = document.querySelector(".dashboard");
  
  // ================== WELCOME ==================
  if (welcome && textElement) {
    const text = "¡WELCOME!";
    let index = 0;
    
    (function typeEffect() {
      if (index < text.length) {
        textElement.textContent += text[index++];
        setTimeout(typeEffect, 120);
      } else {
        setTimeout(() => welcome.classList.add("ocultar"), 1000);
        setTimeout(() => welcome.remove(), 2500);
      }
    })();
    
    setTimeout(() => content.classList.add("mostrar"), 3600);
  }
  
  // ================== VALIDACIONES ==================
  emailInput.addEventListener("input", () => {
    emailError.textContent = "";
    emailError.classList.remove("show");
    emailInput.classList.remove("input-error");
  });
  
  passwordInput.addEventListener("input", () => {
    passwordError.textContent = "";
    passwordError.classList.remove("show");
    passwordInput.classList.remove("input-error");
  });
  
  // ================== PARALLAX ==================
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    form.style.transform = `translate(${x}px, ${y}px)`;
  });
  
  // ================== LOGIN SUBMIT ==================
  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    
    btnLogin.disabled = true;
    btnLogin.textContent = "Verifying...";
    form.classList.add("is-loading");
    
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      btnLogin.textContent = "Success ✓";
      form.classList.add("exit");
      
      setTimeout(() => {
        form.style.display = "none";
        dashboard.classList.add("show");
      }, 600);
      
    }
    catch (error) {
  form.classList.remove("is-loading");
  btnLogin.classList.remove("loading");
  btnLogin.disabled = false;
  btnLogin.textContent = "Sign In";
  
  const loginError = document.getElementById("login-error");
  loginError.textContent = error.message || error;
  loginError.classList.add("show");
  
  form.classList.add("shake");
  setTimeout(() => form.classList.remove("shake"), 400);
}
  });
  
  // ================== REGISTER ==================
  registerBtn.addEventListener("click", async () => {
    const email = prompt("Email:");
    const password = prompt("Password (min 8 chars):");
    const confirm = prompt("Confirm Password:");
    
    if (!email || !password || password !== confirm) {
      alert("Invalid data");
      return;
    }
    
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert("User registered. Now login.");
      
    } catch (err) {
      alert(err.message);
    }
  });
  
  // ================== PASSWORD STRENGTH ==================
  const strengthBar = document.querySelector(".password-strength");
  if (strengthBar) {
    passwordInput.addEventListener("input", () => {
      let strength = 0;
      const v = passwordInput.value;
      
      if (!v) return (strengthBar.className = "password-strength");
      
      strengthBar.classList.add("visible");
      if (v.length >= 8) strength++;
      if (/[A-Z]/.test(v)) strength++;
      if (/[0-9]/.test(v)) strength++;
      if (/[^A-Za-z0-9]/.test(v)) strength++;
      
      strengthBar.className = "password-strength visible";
      strength <= 1 ?
        strengthBar.classList.add("weak") :
        strength <= 3 ?
        strengthBar.classList.add("medium") :
        strengthBar.classList.add("strong");
    });
  }
});
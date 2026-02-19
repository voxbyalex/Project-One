// ================== VARIABLES ==================
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15000;
let isLocked = false;

// ================== DOM READY ==================
document.addEventListener("DOMContentLoaded", () => {
  
  // ---------- ELEMENTOS ----------
  const welcome = document.querySelector(".welcome");
  const textElement = welcome?.querySelector("h1");
  const content = document.querySelector(".content");
  
  const form = document.querySelector(".form1"); // LOGIN
  const btnLogin = document.querySelector(".btn-primary");
  const registerBtn = document.querySelector(".btn-secundary");
  
  const registerForm = document.querySelector(".register-form");
  const backLoginBtn = document.getElementById("back-login");
  
  // EMAIL VALIDATION
  const emailInput = document.getElementById("email");
  
  // PASS VALIDATION
  const passwordInput = document.getElementById("password");
  
  // LOGIN ERROR
  const loginError = document.getElementById("login-error");
  
  [emailInput, passwordInput].filter(Boolean).forEach(input => {
    input.addEventListener("input", () => {
      loginError.classList.remove("show");
      loginError.textContent = "";
    });
  });
  
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("pass-error");
  
  // ================== WELCOME ANIMATION ==================
  if (welcome && textElement) {
    const text = "¡WELCOME!";
    let index = 0;
    
    function typeEffect() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index++);
        setTimeout(typeEffect, 120);
      } else {
        setTimeout(() => welcome.classList.add("ocultar"), 1000);
        setTimeout(() => welcome.remove(), 2500);
      }
    }
    
    typeEffect();
    setTimeout(() => content.classList.add("mostrar"), 3600);
  }
  
  // ================== VALIDACIONES ==================
  emailInput.addEventListener("invalid", () => {
    emailInput.setCustomValidity("Please enter a valid email address");
    emailError.textContent = "Please enter a valid email address";
    emailError.classList.add("show");
    emailInput.classList.add("input-error");
  });
  
  emailInput.addEventListener("input", () => {
    emailInput.setCustomValidity("");
    emailError.textContent = "";
    emailError.classList.remove("show");
    emailInput.classList.remove("input-error");
  });
  
  passwordInput.addEventListener("invalid", () => {
    passwordInput.setCustomValidity("Password must be at least 8 characters");
    passwordError.textContent = "Password must be at least 8 characters";
    passwordError.classList.add("show");
    passwordInput.classList.add("input-error");
  });
  
  passwordInput.addEventListener("input", () => {
    passwordInput.setCustomValidity("");
    passwordError.textContent = "";
    passwordError.classList.remove("show");
    passwordInput.classList.remove("input-error");
  });
  
  // ================== PARALLAX (LOGIN + REGISTER) ==================
  const forms = document.querySelectorAll(".form1");
  
  document.addEventListener("mousemove", e => {
    forms.forEach(f => {
      if (
        f.classList.contains("is-loading") ||
        f.classList.contains("shake") ||
        f.classList.contains("exit") ||
        f.style.display === "none"
      ) return;
      
      const rect = f.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 18;
      const y = (e.clientY - rect.top - rect.height / 2) / 18;
      
      f.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  document.addEventListener("mouseleave", () => {
    forms.forEach(f => {
      f.style.transform = "translate(0,0)";
    });
  });
  
  // ================== LOGIN ==================
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    
    btnLogin.disabled = true;
    btnLogin.textContent = "Verifying...";
    form.classList.add("is-loading");
    
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    
    setTimeout(() => {
      if (
        savedUser &&
        emailInput.value === savedUser.email &&
        passwordInput.value === savedUser.password
      ) {
        btnLogin.textContent = "Success ✓";
        form.classList.add("exit");
        
        setTimeout(() => {
          form.style.display = "none";
          document.querySelector(".dashboard").classList.add("show");
        }, 600);
      } else {
        btnLogin.disabled = false;
        btnLogin.textContent = "Sign In";
        form.classList.remove("is-loading");
        
        loginError.textContent = "Invalid Email or Password";
        loginError.classList.add("show");
        
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 400);
      }
    }, 1200);
  });
  
  // ================== MOSTRAR REGISTER ==================
  registerBtn.addEventListener("click", () => {
    form.style.display = "none";
    registerForm.style.display = "flex";
  });
  
  // ================== VOLVER LOGIN ==================
  backLoginBtn.addEventListener("click", () => {
    registerForm.style.display = "none";
    form.style.display = "flex";
  });
  
  // ================== REGISTER ==================
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;
    const error = document.getElementById("reg-error");
    
    if (password !== confirm) {
      error.textContent = "Passwords do not match";
      error.classList.add("show");
      return;
    }
    
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({ email, password })
    );
    
    error.textContent = "";
    registerForm.style.display = "none";
    form.style.display = "flex";
  });
  
  // ================== PASSWORD STRENGTH ==================
  const strengthBar = document.querySelector(".password-strength");
  
  if (strengthBar) {
    passwordInput.addEventListener("input", () => {
      const value = passwordInput.value;
      let strength = 0;
      
      if (!value) {
        strengthBar.className = "password-strength";
        return;
      }
      
      strengthBar.classList.add("visible");
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      
      strengthBar.className = "password-strength visible";
      strength <= 1 ?
        strengthBar.classList.add("weak") :
        strength <= 3 ?
        strengthBar.classList.add("medium") :
        strengthBar.classList.add("strong");
    });
  }
});
//Variables
let loginAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 15000; // 15 segundos
let isLocked = false;

//Back-end structury
const AuthService = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const fakeUser = {
          email: "test@email.com",
          password: "12345678"
        };
        
        if (email === fakeUser.email && password === fakeUser.password) {
          resolve({
            token: "fake-jwt-token",
            user: { email }
          });
        } else {
          reject("Invalid email or password");
        }
      }, 1400);
    });
  }
};

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
  
  //Loading BTN
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity() || isLocked) return;
    
    form.classList.add("is-loading");
    btnLogin.classList.add("loading");
    btnLogin.disabled = true;
    btnLogin.textContent = "Verifying...";
    
    setTimeout(() => {
      const email = emailInput.value;
      const password = passwordInput.value;
      
      const fakeEmail = "test@email.com";
      const fakePassword = "12345678";
      
      if (email === fakeEmail && password === fakePassword) {
        btnLogin.textContent = "Success ✓";
        
        const dashboard = document.querySelector(".dashboard");
        form.classList.add("exit");
        
        setTimeout(() => {
          form.style.display = "none";
          dashboard.classList.add("show");
        }, 600);
      } else {
        //Error
        loginAttempts++;
        
        form.classList.remove("is-loading");
        btnLogin.classList.remove("loading");
        btnLogin.disabled = false;
        btnLogin.textContent = "Invalid credentials";
        
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 400);
        
        //Block
        if (loginAttempts >= MAX_ATTEMPTS) {
          isLocked = true;
          btnLogin.textContent = "Too many attempts";
          btnLogin.disabled = true;
          
          setTimeout(() => {
            loginAttempts = 0;
            isLocked = false;
            btnLogin.disabled = false;
            btnLogin.textContent = "Sign In";
          }, LOCK_TIME);
        }
      }
    }, 1600);
  });
  //Passw Security Show Bar
  const strengthBar = document.querySelector(".password-strength");
  if (!strengthBar) return;
  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    let strength = 0;
    //Show Bar
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
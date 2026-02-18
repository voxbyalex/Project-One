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
    
    if (!response.ok) throw new Error(data.message);
    
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
});
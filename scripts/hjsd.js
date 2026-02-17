form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    return;
  }
  e.preventDefault();
  
  form.classList.add("is-loading");
  btnLogin.classList.add("loading");
  btnLogin.disabled = true;
  btnLogin.textContent = "Loading...";
  
  setTimeout(() => {
    btnLogin.textContent = "Sign In";
    btnLogin.disabled = false;
    btnLogin.classList.remove("loading");
    form.classList.remove("is-loading");
  }, 2000);
});
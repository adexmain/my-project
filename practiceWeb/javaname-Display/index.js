document.addEventListener("DOMContentLoaded", init);

function init() {
  const nameInput = document.getElementById("nameInput");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const greeting = document.getElementById("greeting");
  const welcomeMessage = document.getElementById("welcomeMessage");

  // Handle submit
  submitBtn.addEventListener("click", handleSubmit);

  // Handle reset
  resetBtn.addEventListener("click", handleReset);

  function handleSubmit() {
  const name = nameInput.value.trim();

  if (name) {
    greeting.textContent = `Hello, ${name}!`;
    welcomeMessage.textContent = "Welcome to our site!";
  } else {
    greeting.textContent = "Please enter your name.";
    welcomeMessage.textContent = "";
  }
}

  function handleReset() {
    nameInput.value = "";
    greeting.textContent = "";
    welcomeMessage.textContent = "";
  }
}
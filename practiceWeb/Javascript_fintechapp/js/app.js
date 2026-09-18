console.log("App.js loaded");

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function registerUser(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("userType").value;

  // Validation
  if (!name || !email || !password || !userType) {
    showToast("Please fill all fields", "error");
    return;
  }

  // Create user object
  const user = {
    name,
    email,
    password,
    userType,
    status: "active"
  };

  // Create users array
 const users =
  JSON.parse(localStorage.getItem("users")) || [];

  // Add user to array
  users.push(user);

  // Check result in console
  console.log(users);

  // Success message
  showToast("Account Created Successfully!", "success");
  
}
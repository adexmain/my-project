const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", registerUser);
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", loginUser);
}

function loginUser(event) {
  event.preventDefault();

  // Get form values
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  // Validation
  if (!email || !password) {
    showToast("Please fill all fields", "error");
    return;
  }

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user
  const user = users.find((item) => item.email === email && item.password === password);

  if (!user) {
    showToast("Invalid email or password", "error");
    return;
  }

  // Set the logged-in user in localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));
  showToast("Login successful!");
  window.setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 500);
}

function registerUser(event) {
  event.preventDefault();

  // Get form values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
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
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for duplicates (by email)
  const userExists = users.some((existingUser) => existingUser.email === user.email);

  if (userExists) {
    showToast("This email is already registered. Please use another.", "error");
    return;
  }

  // Add new user
  users.push(user);

  // Save back to localStorage
  localStorage.setItem("users", JSON.stringify(users));
  showToast("Registration successful!");

  registerForm.reset();

  window.setTimeout(() => {
    window.location.href = "login.html";
  }, 700);
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const protectedPage = ["dashboard.html", "support.html"].some((page) => window.location.pathname.endsWith(page));

if (protectedPage && !currentUser) {
  window.location.href = "login.html";
}

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userType = document.getElementById("userTypeDisplay");

if (currentUser) {
  if (userName) userName.textContent = currentUser.name;
  if (userEmail) userEmail.textContent = currentUser.email;
  if (userType) userType.textContent = currentUser.userType;
}

const logoutButtons = document.querySelectorAll("[data-logout]");
logoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
});

const supportForm = document.getElementById("supportForm");

if (supportForm) {
  supportForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!subject || !message) {
      showToast("Please complete both fields.", "error");
      return;
    }

    const tickets = JSON.parse(localStorage.getItem("supportTickets")) || [];
    tickets.push({ subject, message, email: currentUser ? currentUser.email : "", createdAt: new Date().toISOString() });
    localStorage.setItem("supportTickets", JSON.stringify(tickets));
    supportForm.reset();
    showToast("Your message has been sent.");
  });
}

const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsPanel = document.querySelector("[data-settings-panel]");
const cursorSpot = document.querySelector("[data-cursor-spot]");
const savedTheme = localStorage.getItem("ledgerlyTheme") || "paper";
const savedLanguage = localStorage.getItem("ledgerlyLanguage") || "en";

document.body.dataset.theme = savedTheme;

if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener("click", () => {
    const isOpen = settingsPanel.toggleAttribute("hidden");
    settingsToggle.setAttribute("aria-expanded", String(!isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!settingsPanel.contains(event.target) && !settingsToggle.contains(event.target)) {
      settingsPanel.hidden = true;
      settingsToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-theme]").forEach((themeButton) => {
  themeButton.classList.toggle("selected", themeButton.dataset.theme === savedTheme);
  themeButton.addEventListener("click", () => {
    const theme = themeButton.dataset.theme;
    document.body.dataset.theme = theme;
    localStorage.setItem("ledgerlyTheme", theme);
    document.querySelectorAll("[data-theme]").forEach((button) => button.classList.toggle("selected", button === themeButton));
  });
});

const languageSelect = document.querySelector("[data-language]");
const translations = {
  en: { settings: "Settings", background: "Background", language: "Language", home: "Home", signIn: "Sign in", open: "Open account", dashboard: "Dashboard", support: "Support", logout: "Log out" },
  es: { settings: "Ajustes", background: "Fondo", language: "Idioma", home: "Inicio", signIn: "Iniciar sesión", open: "Abrir cuenta", dashboard: "Panel", support: "Ayuda", logout: "Cerrar sesión" },
  fr: { settings: "Paramètres", background: "Arrière-plan", language: "Langue", home: "Accueil", signIn: "Se connecter", open: "Ouvrir un compte", dashboard: "Tableau de bord", support: "Assistance", logout: "Se déconnecter" }
};

function applyLanguage(language) {
  const copy = translations[language] || translations.en;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-copy]").forEach((element) => {
    const key = element.dataset.copy;
    if (copy[key]) element.textContent = copy[key];
  });
}

if (languageSelect) {
  languageSelect.value = savedLanguage;
  languageSelect.addEventListener("change", () => {
    localStorage.setItem("ledgerlyLanguage", languageSelect.value);
    applyLanguage(languageSelect.value);
  });
}

applyLanguage(savedLanguage);

if (cursorSpot && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorSpot.style.transform = `translate3d(${event.clientX - 90}px, ${event.clientY - 90}px, 0)`;
  });
}
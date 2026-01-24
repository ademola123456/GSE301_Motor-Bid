// ==================== AUTHENTICATION MODULE ====================

import {
  saveUserToStorage,
  clearUserFromStorage,
  showNotification,
  navigateToPage,
  body,
  isLoggedIn as getIsLoggedIn,
  currentUser as getCurrentUser,
} from "./shared.js";

// Update module variables when needed
export let isLoggedIn = getIsLoggedIn;
export let currentUser = getCurrentUser;

export function updateAuthState(loggedIn, user) {
  isLoggedIn = loggedIn;
  currentUser = user;
}

// ==================== LOGIN FUNCTIONALITY ====================

export function initializeLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Simple validation
    if (!email || !password) {
      showNotification("Please fill in all fields");
      return;
    }

    // Simulate login
    currentUser = {
      name: "Alex Morgan",
      email: email,
      location: "New York, USA",
    };

    isLoggedIn = true;
    body.classList.remove("logged-out");
    body.classList.add("logged-in");

    // Save user to localStorage
    saveUserToStorage(currentUser);

    // Update username display
    const usernameElement = document.getElementById("username");
    if (usernameElement) usernameElement.textContent = currentUser.name;

    showNotification(`Welcome back, ${currentUser.name}!`);
    navigateToPage("home");
  });
}

// ==================== SIGNUP FUNCTIONALITY ====================

export function initializeSignupForm() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
      showNotification("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      showNotification("Passwords do not match");
      return;
    }

    // Simulate signup
    currentUser = {
      name: name,
      email: email,
      location: "New York, USA",
    };

    isLoggedIn = true;
    body.classList.remove("logged-out");
    body.classList.add("logged-in");

    // Save user to localStorage
    saveUserToStorage(currentUser);

    // Update username display
    const usernameElement = document.getElementById("username");
    if (usernameElement) usernameElement.textContent = currentUser.name;

    const profileName = document.getElementById("profileName");
    if (profileName) profileName.value = currentUser.name;

    const profileEmail = document.getElementById("profileEmail");
    if (profileEmail) profileEmail.value = currentUser.email;

    const fullName = document.getElementById("fullName");
    if (fullName) fullName.value = currentUser.name;

    showNotification(
      `Account created successfully! Welcome, ${currentUser.name}`,
    );
    navigateToPage("home");
  });
}

// ==================== LOGOUT FUNCTIONALITY ====================

export function initializeLogout() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    isLoggedIn = false;
    currentUser = null;

    // Clear user from localStorage
    clearUserFromStorage();

    body.classList.remove("logged-in");
    body.classList.add("logged-out");

    showNotification("You have been logged out");
    navigateToPage("login");
  });
}

// Initialize all authentication features
export function initializeAuthentication() {
  initializeLoginForm();
  initializeSignupForm();
  initializeLogout();
}

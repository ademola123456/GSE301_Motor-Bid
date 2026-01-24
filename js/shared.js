// ==================== SHARED UTILITIES & STATE ====================

// DOM Elements - Shared across all pages
export const navLinks = document.querySelectorAll(".nav-link");
export const pages = document.querySelectorAll(".page");
export const hamburger = document.getElementById("hamburger");
export const navMenu = document.getElementById("navLinks");
export const notification = document.getElementById("notification");
export const notificationText = document.getElementById("notificationText");
export const body = document.body;

// Authentication state
export let isLoggedIn = false;
export let currentUser = null;

// ==================== UTILITY FUNCTIONS ====================

// Load user data from localStorage on page load
export function loadUserFromStorage() {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    isLoggedIn = true;
    body.classList.remove("logged-out");
    body.classList.add("logged-in");

    // Update username display if element exists
    const usernameElement = document.getElementById("username");
    if (usernameElement) usernameElement.textContent = currentUser.name;
    const name = document.getElementById("name");
    if (name) name.textContent = currentUser.name;
    const profilelocation = document.getElementById("location");
    if (profilelocation) profilelocation.textContent = currentUser.location;

    const profileName = document.getElementById("profileName");
    if (profileName) profileName.value = currentUser.name;
    const profileEmail = document.getElementById("profileEmail");
    if (profileEmail) profileEmail.value = currentUser.email;
  }
}

// Save user data to localStorage
export function saveUserToStorage(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Clear user data from localStorage
export function clearUserFromStorage() {
  localStorage.removeItem("currentUser");
}

// Navigation functionality
export function navigateToPage(pageId) {
  const pageMap = {
    home: "index.html",
    login: "login.html",
    signup: "signup.html",
    auction: "auction.html",
    checkout: "checkout.html",
    profile: "profile.html",
  };

  const fileName = pageMap[pageId] || `${pageId}.html`;
  window.location.href = fileName;
}

// Notification function
export function showNotification(message) {
  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// ==================== SHARED EVENT LISTENERS ====================

// Add navigation event listeners
export function initializeNavigation() {
  document.querySelectorAll(".nav-link, .auth-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");

      // Check if user needs to be logged in for certain pages
      if (
        !isLoggedIn &&
        pageId !== "login" &&
        pageId !== "signup" &&
        pageId !== "home"
      ) {
        showNotification("Please login to access this page");
        navigateToPage("login");
        return;
      }

      navigateToPage(pageId);

      // Show notification for certain pages
      if (pageId === "checkout") {
        showNotification("Complete your purchase to secure your winning bid!");
      }
    });
  });
}

// Mobile menu toggle
export function initializeMobileMenu() {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}

// Initialize all shared features
export function initializeShared() {
  loadUserFromStorage();
  initializeNavigation();
  initializeMobileMenu();
}

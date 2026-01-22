// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navLinks");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");
const body = document.body;
// console.log("okay!");
// // Authentication state
let isLoggedIn = false;
let currentUser = null;

// Load user data from localStorage on page load
function loadUserFromStorage() {
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

    document.getElementById("profileName").value = currentUser.name;
    document.getElementById("profileEmail").value = currentUser.email;
  }
}

// Save user data to localStorage
function saveUserToStorage(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Clear user data from localStorage
function clearUserFromStorage() {
  localStorage.removeItem("currentUser");
}

// Navigation functionality
function navigateToPage(pageId) {
  // Map pageId to actual HTML file
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

// Add navigation event listeners
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

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// Notification function
function showNotification(message) {
  notificationText.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Thumbnail image switcher
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainImage");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    // Update active thumbnail
    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnail.classList.add("active");

    // Update main image
    mainImage.src = thumbnail.getAttribute("data-image");
  });
});

// Auction countdown timer
function updateCountdown() {
  // Set auction end time (3 days from now)
  const endTime = new Date();
  endTime.setDate(endTime.getDate() + 3);
  endTime.setHours(18, 30, 0); // 6:30 PM

  const now = new Date().getTime();
  const timeLeft = endTime - now;

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const countdownElement = document.getElementById("auctionCountdown");

  if (timeLeft > 0) {
    countdownElement.innerHTML = `
            <div class="countdown-item">
                <div class="countdown-value">${days}</div>
                <div class="countdown-label">Days</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${hours}</div>
                <div class="countdown-label">Hours</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${minutes}</div>
                <div class="countdown-label">Minutes</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-value">${seconds}</div>
                <div class="countdown-label">Seconds</div>
            </div>
        `;
  } else {
    countdownElement.innerHTML = `<div style="color: var(--secondary); font-weight: bold;">Auction has ended</div>`;
  }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Bidders data
const bidders = [
  {
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$125,000",
    location: "San Francisco, CA",
  },
  {
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$124,500",
    location: "Chicago, IL",
  },
  {
    name: "Robert Williams",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$124,000",
    location: "Miami, FL",
  },
  {
    name: "Emma Davis",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$123,500",
    location: "Seattle, WA",
  },
  {
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$123,000",
    location: "Boston, MA",
  },
  {
    name: "Olivia Brown",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    bid: "$122,500",
    location: "Denver, CO",
  },
];

// Populate bidders list

// Place bid functionality
const placeBidBtn = document.getElementById("placeBid");
const bidAmountInput = document.getElementById("bidAmount");
const currentBidElement = document.querySelector(".current-bid");
const bidHistoryList = document.getElementById("bidHistoryList");

placeBidBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    showNotification("Please login to place a bid");
    navigateToPage("login");
    return;
  }

  const bidAmount = parseFloat(bidAmountInput.value);
  const currentBid = parseFloat(
    currentBidElement.textContent.replace("$", "").replace(",", ""),
  );

  if (bidAmount <= currentBid) {
    showNotification(
      `Bid must be higher than current bid of $${currentBid.toLocaleString()}`,
    );
    bidAmountInput.value = currentBid + 500;
    return;
  }

  // Update current bid
  currentBidElement.textContent = `$${bidAmount.toLocaleString()}`;

  // Add bid to history
  const now = new Date();
  const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
  const bidItem = document.createElement("div");
  bidItem.className = "bid-item";
  bidItem.innerHTML = `
        <div>
            <strong>${currentUser ? currentUser.name : "Alex Morgan"}</strong>
            <span style="color: #666; font-size: 14px;">${timeString}</span>
        </div>
        <div style="color: var(--secondary); font-weight: bold;">$${bidAmount.toLocaleString()}</div>
    `;

  // Insert at the top of bid history
  bidHistoryList.insertBefore(bidItem, bidHistoryList.firstChild);

  // Update bidders list
  updateBiddersList(bidAmount);

  // Update minimum bid
  bidAmountInput.min = bidAmount + 500;
  bidAmountInput.value = bidAmount + 500;

  // Show notification
  showNotification(
    `Your bid of $${bidAmount.toLocaleString()} has been placed successfully!`,
  );

  // Update bid count
  const bidInfo = document.querySelector(".bid-info");
  const bidCountElement = bidInfo.querySelector("strong");
  const currentBidCount = parseInt(bidCountElement.textContent);
  bidCountElement.textContent = currentBidCount + 1;
});

// Update bidders list with new bid
function updateBiddersList(newBid) {
  // Add current user to bidders list if not already there
  const currentUserName = currentUser ? currentUser.name : "Alex Morgan";
  const userAlreadyInList = Array.from(biddersList.children).some(
    (card) => card.querySelector("h4").textContent === currentUserName,
  );

  if (!userAlreadyInList) {
    const bidderCard = document.createElement("div");
    bidderCard.className = "bidder-card";
    bidderCard.innerHTML = `
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="${currentUserName}" class="bidder-avatar">
            <div class="bidder-info">
                <h4>${currentUserName}</h4>
                <p>${currentUser ? currentUser.location : "New York, USA"}</p>
            </div>
            <div class="bidder-bid">$${newBid.toLocaleString()}</div>
        `;
    biddersList.insertBefore(bidderCard, biddersList.firstChild);
  } else {
    // Update user's bid in the list
    Array.from(biddersList.children).forEach((card) => {
      if (card.querySelector("h4").textContent === currentUserName) {
        card.querySelector(".bidder-bid").textContent =
          `$${newBid.toLocaleString()}`;
        // Move to top of list
        biddersList.insertBefore(card, biddersList.firstChild);
      }
    });
  }
}

// Complete purchase functionality
const completePurchaseBtn = document.getElementById("completePurchase");

completePurchaseBtn.addEventListener("click", () => {
  showNotification(
    "Purchase completed successfully! Your car will be shipped soon.",
  );

  // Redirect to home page after 2 seconds
  setTimeout(() => {
    navigateToPage("home");
  }, 2000);
});

// Featured cars data
const featuredCarsData = [
  {
    id: 1,
    title: "Porsche 911 Turbo S",
    description: "2022 model with only 3,500 miles",
    price: "$185,000",
    image: "./images/porsche1.jpeg",
    timeLeft: "2 days",
    details: ["2022", "3,500 mi", "Automatic", "Coupe"],
  },
  {
    id: 2,
    title: "Ford Mustang Shelby GT350",
    description: "2019 model, track package, low miles",
    price: "$68,500",
    image: "./images/ford1.jpeg",
    timeLeft: "1 day",
    details: ["2019", "12,000 mi", "Manual", "Coupe"],
  },
  {
    id: 3,
    title: "Chevrolet Corvette Stingray",
    description: "2023 C8, 3LT package, red interior",
    price: "$95,000",
    image: "./images/chevrolet1.jpeg",
    timeLeft: "5 hours",
    details: ["2023", "2,100 mi", "Automatic", "Convertible"],
  },
  {
    id: 4,
    title: "BMW M4 Competition",
    description: "2021 model, full carbon package",
    price: "$82,500",
    image: "./images/bmw1.jpeg",
    timeLeft: "3 days",
    details: ["2021", "8,500 mi", "Automatic", "Coupe"],
  },
];

// Generate featured car cards
const featuredCarsContainer = document.getElementById("featuredCars");

featuredCarsData.forEach((car) => {
  const carCard = document.createElement("div");
  carCard.className = "car-card";
  carCard.innerHTML = `
        <img src="${car.image}" alt="${car.title}" class="car-img">
        <div class="car-info">
            <h3 class="car-title">${car.title}</h3>
            <p class="car-description">${car.description}</p>
            <div class="car-details">
                ${car.details.map((detail) => `<span>${detail}</span>`).join("")}
            </div>
            <div class="car-price">${car.price}</div>
            <div class="time-left">
                <i class="fas fa-clock"></i>
                <span>${car.timeLeft} left</span>
            </div>
            <button class="btn" style="width: 100%;" data-page="auction">Place Bid</button>
        </div>
    `;

  featuredCarsContainer.appendChild(carCard);
});

// Add event listeners to featured car buttons
document.querySelectorAll("#featuredCars .btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      showNotification("Please login to view car auctions");
      navigateToPage("login");
      return;
    }
    // window.location = "auction.html";
    navigateToPage("auction");
  });
});

// Profile page data
const activeBids = [
  { item: "Porsche 911 Turbo S", bid: "$185,000", time: "Ends in 2 hours" },
  { item: "BMW M4 Competition", bid: "$82,500", time: "Ends in 1 day" },
  { item: "Audi R8", bid: "$142,000", time: "Ends in 3 days" },
];

const wonAuctions = [
  { item: "2018 Mercedes AMG GT", price: "$92,500", date: "Oct 12, 2023" },
  { item: "2020 Tesla Model S", price: "$68,000", date: "Oct 5, 2023" },
  { item: "2017 Audi RS7", price: "$75,500", date: "Sep 28, 2023" },
];

// Populate profile page data
const activeBidsContainer = document.getElementById("activeBids");
const wonAuctionsContainer = document.getElementById("wonAuctions");

activeBids.forEach((bid) => {
  const bidElement = document.createElement("div");
  bidElement.className = "bid-item";
  bidElement.innerHTML = `
        <div>
            <strong>${bid.item}</strong>
            <div style="color: #666; font-size: 14px;">${bid.time}</div>
        </div>
        <div style="color: var(--secondary); font-weight: bold;">${bid.bid}</div>
    `;
  activeBidsContainer.appendChild(bidElement);
});

wonAuctions.forEach((auction) => {
  const auctionElement = document.createElement("div");
  auctionElement.className = "bid-item";
  auctionElement.innerHTML = `
        <div>
            <strong>${auction.item}</strong>
            <div style="color: #666; font-size: 14px;">${auction.date}</div>
        </div>
        <div style="color: var(--success); font-weight: bold;">${auction.price}</div>
    `;
  wonAuctionsContainer.appendChild(auctionElement);
});

// Generate initial bid history
const initialBids = [
  { bidder: "Sarah Johnson", amount: 125000, time: "14:25" },
  { bidder: "Michael Chen", amount: 124500, time: "13:48" },
  { bidder: "Robert Williams", amount: 124000, time: "12:15" },
  { bidder: "Emma Davis", amount: 123500, time: "11:30" },
  { bidder: "James Wilson", amount: 123000, time: "10:22" },
];

initialBids.forEach((bid) => {
  const bidItem = document.createElement("div");
  bidItem.className = "bid-item";
  bidItem.innerHTML = `
        <div>
            <strong>${bid.bidder}</strong>
            <span style="color: #666; font-size: 14px;">${bid.time}</span>
        </div>
        <div style="color: var(--secondary); font-weight: bold;">$${bid.amount.toLocaleString()}</div>
    `;
  bidHistoryList.appendChild(bidItem);
});

// Authentication functionality
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const logoutBtn = document.getElementById("logoutBtn");

// Login form submission
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
  document.getElementById("username").textContent = currentUser.name;

  showNotification(`Welcome back, ${currentUser.name}!`);
  navigateToPage("home");
});

// Signup form submission
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
  document.getElementById("username").textContent = currentUser.name;
  document.getElementById("profileName").value = currentUser.name;
  document.getElementById("profileEmail").value = currentUser.email;
  document.getElementById("fullName").value = currentUser.name;

  showNotification(
    `Account created successfully! Welcome, ${currentUser.name}`,
  );
  navigateToPage("home");
});

// Logout functionality
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

// Initialize app - load user from storage first
loadUserFromStorage();

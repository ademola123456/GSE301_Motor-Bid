// ==================== HOME PAGE MODULE ====================

import {
  showNotification,
  navigateToPage,
  isLoggedIn as getIsLoggedIn,
} from "./shared.js";

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

// ==================== FEATURED CARS DISPLAY ====================

export function initializeFeaturedCars() {
  const featuredCarsContainer = document.getElementById("featuredCars");
  if (!featuredCarsContainer) return;

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
      if (!getIsLoggedIn) {
        showNotification("Please login to view car auctions");
        navigateToPage("login");
        return;
      }
      navigateToPage("auction");
    });
  });
}

// Initialize home page
export function initializeHomePage() {
  initializeFeaturedCars();
}

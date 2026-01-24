// ==================== AUCTION PAGE MODULE ====================

import {
  showNotification,
  navigateToPage,
  currentUser as getCurrentUser,
  isLoggedIn as getIsLoggedIn,
} from "./shared.js";

let currentUser = getCurrentUser;

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

// ==================== THUMBNAIL SWITCHER ====================

export function initializeThumbnailSwitcher() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");

  if (!thumbnails.length || !mainImage) return;

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Update active thumbnail
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));
      thumbnail.classList.add("active");

      // Update main image
      mainImage.src = thumbnail.getAttribute("data-image");
    });
  });
}

// ==================== AUCTION COUNTDOWN TIMER ====================

export function initializeCountdownTimer() {
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

    if (!countdownElement) return;

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
}

// ==================== PLACE BID FUNCTIONALITY ====================

export function initializePlaceBid() {
  const placeBidBtn = document.getElementById("placeBid");
  const bidAmountInput = document.getElementById("bidAmount");
  const currentBidElement = document.querySelector(".current-bid");
  const bidHistoryList = document.getElementById("bidHistoryList");
  const biddersList = document.getElementById("biddersList") || {
    children: [],
  };

  if (!placeBidBtn || !bidAmountInput || !currentBidElement) return;

  placeBidBtn.addEventListener("click", () => {
    if (!getIsLoggedIn) {
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
    if (bidHistoryList) {
      bidHistoryList.insertBefore(bidItem, bidHistoryList.firstChild);
    }

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
    if (bidInfo) {
      const bidCountElement = bidInfo.querySelector("strong");
      if (bidCountElement) {
        const currentBidCount = parseInt(bidCountElement.textContent);
        bidCountElement.textContent = currentBidCount + 1;
      }
    }
  });

  function updateBiddersList(newBid) {
    const biddersList = document.getElementById("biddersList");
    if (!biddersList) return;

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
}

// ==================== INITIAL BID HISTORY ====================

export function initializeBidHistory() {
  const bidHistoryList = document.getElementById("bidHistoryList");
  if (!bidHistoryList || bidHistoryList.children.length > 0) return;

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
}

// Initialize auction page
export function initializeAuctionPage() {
  initializeThumbnailSwitcher();
  initializeCountdownTimer();
  initializeBidHistory();
  initializePlaceBid();
}

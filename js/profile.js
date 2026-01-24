// ==================== PROFILE PAGE MODULE ====================

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

// ==================== POPULATE PROFILE DATA ====================

export function initializeProfileData() {
  const activeBidsContainer = document.getElementById("activeBids");
  const wonAuctionsContainer = document.getElementById("wonAuctions");

  if (activeBidsContainer && activeBidsContainer.children.length === 0) {
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
  }

  if (wonAuctionsContainer && wonAuctionsContainer.children.length === 0) {
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
  }
}

// Initialize profile page
export function initializeProfilePage() {
  initializeProfileData();
}

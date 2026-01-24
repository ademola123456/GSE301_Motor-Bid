// ==================== CHECKOUT PAGE MODULE ====================

import { showNotification, navigateToPage } from "./shared.js";

// ==================== COMPLETE PURCHASE FUNCTIONALITY ====================

export function initializeCheckout() {
  const completePurchaseBtn = document.getElementById("completePurchase");

  if (!completePurchaseBtn) return;

  completePurchaseBtn.addEventListener("click", () => {
    showNotification(
      "Purchase completed successfully! Your car will be shipped soon.",
    );

    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigateToPage("home");
    }, 2000);
  });
}

// Initialize checkout page
export function initializeCheckoutPage() {
  initializeCheckout();
}

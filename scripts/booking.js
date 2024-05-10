"use strict";

// Set up all event listeners when the window loads
window.onload = function () {
  document.getElementById("queenRadio").onclick =
    updateRoomRateAndCheckCapacity;
  document.getElementById("kingRadio").onclick = updateRoomRateAndCheckCapacity;
  document.getElementById("suiteRadio").onclick =
    updateRoomRateAndCheckCapacity;

  document.getElementById("checkInDate").onchange =
    updateRoomRateAndCheckCapacity;
  document.getElementById("checkOutDate").onchange = updateNights;

  document.getElementById("numberOfAdults").onchange = checkCapacity;
  document.getElementById("numberOfChildren").onchange = checkCapacity;

  document.getElementById("bookSubmitBtn").onclick = calculateTotalCost;
};

// Updates the number of nights based on the check-in and check-out dates
function updateNights() {
  let checkInDate = new Date(document.getElementById("checkInDate").value);
  let checkOutDate = new Date(document.getElementById("checkOutDate").value);
  let dayCount = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
  document.getElementById("numberOfNights").value = Math.round(dayCount);
}

// Updates the room rate based on room type and checks room capacity
function updateRoomRateAndCheckCapacity() {
  let month =
    new Date(document.getElementById("checkInDate").value).getMonth() + 1;
  let rate = 150; // Default rate for off-peak months

  // Adjust rate based on peak season and room type
  if (month >= 6 && month <= 8) {
    // Peak months are June, July, and August
    if (
      document.getElementById("queenRadio").checked ||
      document.getElementById("kingRadio").checked
    ) {
      rate = 250;
    } else if (document.getElementById("suiteRadio").checked) {
      rate = 350;
    }
  } else {
    if (
      document.getElementById("queenRadio").checked ||
      document.getElementById("kingRadio").checked
    ) {
      rate = 150;
    } else if (document.getElementById("suiteRadio").checked) {
      rate = 210;
    }
  }

  document.getElementById("priceOfOneNight").textContent = "$" + rate;
  checkCapacity(); // Always check capacity when updating the rate
}

// Checks if the selected room can accommodate the specified number of guests
function checkCapacity() {
  let adults = parseInt(document.getElementById("numberOfAdults").value, 10);
  let children = parseInt(
    document.getElementById("numberOfChildren").value,
    10,
  );
  let totalGuests = adults + children;
  let message = "Available";

  // Capacity constraints based on room selection
  if (
    (document.getElementById("queenRadio").checked && totalGuests > 5) ||
    (document.getElementById("kingRadio").checked && totalGuests > 2) ||
    (document.getElementById("suiteRadio").checked && totalGuests > 6)
  ) {
    message = "The room you selected will not hold your party";
  }

  document.getElementById("messageParagraph").textContent = message;
}

// Calculates the total cost of the stay considering discounts and tax
function calculateTotalCost() {
  // Prevent calculation if capacity is exceeded
  if (
    document.getElementById("messageParagraph").textContent.includes("not hold")
  ) {
    alert("Please adjust the number of guests or change the room type.");
    return;
  }

  let nights = parseInt(document.getElementById("numberOfNights").value, 10);
  let rate = parseFloat(
    document.getElementById("priceOfOneNight").textContent.substring(1),
  ); // Remove the dollar sign
  let total = nights * rate;
  let discountRate = 0;

  // Apply discount based on user selection
  if (document.getElementById("seniorDiscountRadio").checked) {
    discountRate = 0.1; // 10% discount
  } else if (document.getElementById("militaryDiscountRadio").checked) {
    discountRate = 0.2; // 20% discount
  }

  let discountAmount = total * discountRate;
  let discountedTotal = total - discountAmount;
  let tax = discountedTotal * 0.12; // 12% tax on the discounted total
  let finalTotal = discountedTotal + tax;

  // Display the calculated costs
  document.getElementById("originalRoomCost").textContent =
    "$" + total.toFixed(2);
  document.getElementById("discountedRoomCost").textContent =
    "$" + discountedTotal.toFixed(2);
  document.getElementById("taxAmount").textContent = "$" + tax.toFixed(2);
  document.getElementById("totalCost").textContent =
    "$" + finalTotal.toFixed(2);
}

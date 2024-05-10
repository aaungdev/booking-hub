"use strict";

window.onload = function () {
    document.getElementById("queenRadio").onclick = updateRoomRate;
    document.getElementById("kingRadio").onclick = updateRoomRate;
    document.getElementById("suiteRadio").onclick = updateRoomRate;

    document.getElementById("checkInDate").onchange = updateNights;
    document.getElementById("checkOutDate").onchange = updateNights;

    document.getElementById("numberOfAdults").onchange = updateRoomRate;
    document.getElementById("numberOfChildren").onchange = updateRoomRate;

    document.getElementById("bookSubmitBtn").onclick = calculateTotalCost;
};

function updateNights() {
    const checkInDate = new Date(document.getElementById("checkInDate").value);
    const checkOutDate = new Date(document.getElementById("checkOutDate").value);
    const dayCount = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
    document.getElementById("numberOfNights").value = Math.round(dayCount);
}

function updateRoomRate() {
    const month = new Date(document.getElementById("checkInDate").value).getMonth() + 1;
    let rate = 150; // Default rate

    if ([6, 7, 8].includes(month)) { // Peak season
        rate = document.getElementById("queenRadio").checked || document.getElementById("kingRadio").checked ? 250 : 350;
    } else {
        rate = document.getElementById("queenRadio").checked || document.getElementById("kingRadio").checked ? 150 : 210;
    }

    document.getElementById("priceOfOneNight").textContent = rate.toString();
    checkCapacity();
}

function checkCapacity() {
    const adults = parseInt(document.getElementById("numberOfAdults").value, 10);
    const children = parseInt(document.getElementById("numberOfChildren").value, 10);
    const totalGuests = adults + children;
    let message = "Available";

    if ((document.getElementById("queenRadio").checked && totalGuests > 5) ||
        (document.getElementById("kingRadio").checked && totalGuests > 2) ||
        (document.getElementById("suiteRadio").checked && totalGuests > 6)) {
        message = "The room you selected will not hold your party";
        document.getElementById("messageParagraph").textContent = message;
        return false;
    }

    document.getElementById("messageParagraph").textContent = message;
    return true;
}

function calculateTotalCost() {
    if (!checkCapacity()) return; // Check capacity first before calculating

    const nights = parseInt(document.getElementById("numberOfNights").value, 10);
    const rate = parseFloat(document.getElementById("priceOfOneNight").textContent);
    const total = nights * rate;

    let discount = 0;
    if (document.getElementById("seniorDiscountRadio").checked) {
        discount = total * 0.10;
    } else if (document.getElementById("militaryDiscountRadio").checked) {
        discount = total * 0.20;
    }

    const discountedTotal = total - discount;
    const tax = discountedTotal * 0.12;
    const finalTotal = discountedTotal + tax;

    document.getElementById("originalRoomCost").textContent = `$${total.toFixed(2)}`;
    document.getElementById("discountedRoomCost").textContent = `$${discountedTotal.toFixed(2)}`;
    document.getElementById("taxAmount").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("totalCost").textContent = `$${finalTotal.toFixed(2)}`;
}

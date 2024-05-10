"use strict";

window.onload = function() {
    const bookSubmitBtn = document.getElementById("bookSubmitBtn");

    const checkInDate = document.getElementById("checkInDate");
    const checkOutDate = document.getElementById("checkOutDate");

    const queenRadio = document.getElementById("queenRadio");
    const kingRadio = document.getElementById("kingRadio");
    const suiteRadio = document.getElementById("suiteRadio");

    const numberOfAdults = document.getElementById("numberOfAdults");
    const numberOfChildren = document.getElementById("numberOfChildren");
    const numberOfNights = document.getElementById("numberOfNights");

    const originalRoomCost = document.getElementById("originalRoomCost");
    const discountedRoomCost = document.getElementById("discountedRoomCost");
    const taxAmount = document.getElementById("taxAmount");
    const totalCost = document.getElementById("totalCost");

    queenRadio.onclick = updateRoomRate;
    kingRadio.onclick = updateRoomRate;
    suiteRadio.onclick = updateRoomRate;

    checkInDate.onchange = calculateNights;
    checkOutDate.onchange = calculateNights;

    numberOfAdults.onchange = updateRoomRate;
    numberOfChildren.onchange = updateRoomRate;

    bookSubmitBtn.onclick = estimateCost;

    function calculateNights() {
        const start = new Date(checkInDate.value);
        const end = new Date(checkOutDate.value);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        numberOfNights.value = diffDays;
    }

    function updateRoomRate() {
        let price = 0;
        const startMonth = new Date(checkInDate.value).getMonth() + 1;

        if (startMonth >= 6 && startMonth <= 8) {
            price = (queenRadio.checked || kingRadio.checked) ? 250 : (suiteRadio.checked ? 350 : 0);
        } else {
            price = (queenRadio.checked || kingRadio.checked) ? 150 : (suiteRadio.checked ? 210 : 0);
        }

        originalRoomCost.textContent = `$${price}`;
        return price;
    }

    function estimateCost() {
        const nights = numberOfNights.value;
        const roomRate = updateRoomRate();
        const totalGuests = Number(numberOfAdults.value) + Number(numberOfChildren.value);

        if (isCapacityValid(totalGuests)) {
            const baseCost = roomRate * nights;
            const discountRate = getDiscountRate();
            const discountedCost = baseCost * (1 - discountRate);
            const taxes = discountedCost * 0.12;

            originalRoomCost.textContent = `$${baseCost.toFixed(2)}`;
            discountedRoomCost.textContent = `$${discountedCost.toFixed(2)}`;
            taxAmount.textContent = `$${taxes.toFixed(2)}`;
            totalCost.textContent = `$${(discountedCost + taxes).toFixed(2)}`;
        } else {
            alert("The room type selected cannot accommodate the number of guests.");
        }
    }

    function isCapacityValid(totalGuests) {
        return ((queenRadio.checked && totalGuests <= 5) ||
                (kingRadio.checked && totalGuests <= 2) ||
                (suiteRadio.checked && totalGuests <= 6));
    }

    function getDiscountRate() {
        if (document.getElementById("seniorDiscountRadio").checked) {
            return 0.10; // 10% discount
        } else if (document.getElementById("militaryDiscountRadio").checked) {
            return 0.20; // 20% discount
        }
        return 0; // no discount
    }
};

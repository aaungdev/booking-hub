"use strict";

window.onload = function () {
  let calculateButton = document.getElementById("calculateCost");

  calculateButton.onclick = function () {
    let resultsSection = document.getElementById('results');

    if (resultsSection.style.display === 'block') {
      resultsSection.style.display = 'none';
    } else {
      resultsSection.style.display = 'block';
    }

    let numDaysInput = document.getElementById("numDays");
    let numDays = numDaysInput.value;
    numDays = Number(numDays);

    let under25Radio = document.querySelector('input[name="under25"]:checked');
    let isUnder25 = under25Radio.value === "yes";

    let baseRate = 29.99;
    let baseRatePerDay = baseRate * numDays;
    let carRentalCost = baseRatePerDay;

    let under25Surcharge = 0;
    let surchargeRate = 0.3;
    if (isUnder25) {
      under25Surcharge = carRentalCost * surchargeRate;
    }

    let tollTagCheckbox = document.getElementById("tollTag");
    let gpsCheckbox = document.getElementById("gps");
    let roadsideAssistanceCheckbox = document.getElementById("roadsideAssistance");

    let optionsCost = 0;
    let tollTagCost = 3.95 * numDays;
    let gpsCost = 2.95 * numDays;
    let roadsideCost = 2.95 * numDays;

    if (tollTagCheckbox.checked) {
      optionsCost += tollTagCost;
    }
    if (gpsCheckbox.checked) {
      optionsCost += gpsCost;
    }
    if (roadsideAssistanceCheckbox.checked) {
      optionsCost += roadsideCost;
    }

    let totalCost = carRentalCost + under25Surcharge + optionsCost;

    document.getElementById("carRentalCost").textContent = carRentalCost.toFixed(2);
    document.getElementById("optionsCost").textContent = optionsCost.toFixed(2);
    document.getElementById("under25Surcharge").textContent = under25Surcharge.toFixed(2);
    document.getElementById("totalCost").textContent = totalCost.toFixed(2);
  };
};

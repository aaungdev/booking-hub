"use strict";

window.onload = function () {
  let calculateButton = document.getElementById("calculateCost");

  calculateButton.onclick = function () {
    var resultsSection = document.getElementById('results');
        if (resultsSection.style.display === 'block') {
            resultsSection.style.display = 'none';
        } else {
            resultsSection.style.display = 'block';
        }

    let numDaysInput = document.getElementById("numDays");
    let numDays = parseInt(numDaysInput.value);
    let under25Radio = document.querySelector('input[name="under25"]:checked');
    let isUnder25 = under25Radio.value === "yes";
    let baseRate = 29.99;
    let carRentalCost = baseRate * numDays;

    let under25Surcharge = 0;
    if (isUnder25) {
      under25Surcharge = carRentalCost * 0.3;
    }

    let tollTagCheckbox = document.getElementById("tollTag");
    let gpsCheckbox = document.getElementById("gps");
    let roadsideAssistanceCheckbox =
      document.getElementById("roadsideAssistance");

    let optionsCost = 0;
    if (tollTagCheckbox.checked) {
      optionsCost += 3.95 * numDays;
    }
    if (gpsCheckbox.checked) {
      optionsCost += 2.95 * numDays;
    }
    if (roadsideAssistanceCheckbox.checked) {
      optionsCost += 2.95 * numDays;
    }

    let totalCost = carRentalCost + under25Surcharge + optionsCost;

    document.getElementById("carRentalCost").textContent =
      carRentalCost.toFixed(2);
    document.getElementById("optionsCost").textContent = optionsCost.toFixed(2);
    document.getElementById("under25Surcharge").textContent =
      under25Surcharge.toFixed(2);
    document.getElementById("totalCost").textContent = totalCost.toFixed(2);
  };
};
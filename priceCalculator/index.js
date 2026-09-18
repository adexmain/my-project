document.addEventListener("DOMContentLoaded", init);

function init() {
  const priceInput = document.getElementById("price");
  const taxRateInput = document.getElementById("taxRate");
  const calculateBtn = document.getElementById("calculateBtn");
  const total = document.getElementById("total");

  calculateBtn.addEventListener("click", handleCalculate);

  function handleCalculate() {
    const price = parseFloat(priceInput.value);
    const taxRate = parseFloat(taxRateInput.value);

    if (isNaN(price) || isNaN(taxRate)) {
      total.textContent =
        "Please enter valid numbers for price and tax rate.";
      return;
    }

    if (price < 0 || taxRate < 0) {
      total.textContent =
        "Price and tax rate cannot be negative.";
      return;
    }

    const taxAmount = price * (taxRate / 100);
    const totalPrice = price + taxAmount;

    total.textContent =
      `Total Price: $${totalPrice.toFixed(2)}`;
  }
}
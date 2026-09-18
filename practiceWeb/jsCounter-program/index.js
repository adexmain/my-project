
//COUNTER PROGRAM

document.addEventListener("DOMContentLoaded", init);

function init() {
  const increaseBtn = document.getElementById("increaseBtn");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const countLabel = document.getElementById("countLabel");

  let count = 0;

  // Attach event listeners
  increaseBtn.addEventListener("click", handleIncrease);
  decreaseBtn.addEventListener("click", handleDecrease);
  resetBtn.addEventListener("click", handleReset);

  function handleIncrease() {
    count++;
    countLabel.textContent = count;
  }

  function handleDecrease() {
    count--;
    countLabel.textContent = count;
  }

  function handleReset() {
    count = 0;
    countLabel.textContent = count;
  }
}
 


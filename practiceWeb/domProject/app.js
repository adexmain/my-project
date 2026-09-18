
const buttonElement = document.querySelector('.js-subscribe-button');

function subscribe() {

if (buttonElement.innerText === 'Subscribe') {
  buttonElement.innerHTML = 'Subscribed';
  buttonElement.classList.add
  ('is-Subscribed')
}else {
  buttonElement.innerHTML = 'Subscribe';
  buttonElement.classList.remove
  ('is-Subscribed');
 }

}  

 function calculateTotal() {
  const inputElement = document.querySelector('.js-cost-input');
  let  cost = Number (inputElement.value);

  if( cost < 40) {
    cost = cost + 10;
  }
 
  document.querySelector('.js-total-cost')
      .innerHTML = `$${cost}`;
}

 function handleCostKeydown(event) {
     if (event.key === 'Enter') {
        calculateTotal();
     }
 }
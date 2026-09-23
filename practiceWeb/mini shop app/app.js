const cartCount = document.querySelector('#cart-count');
const toast = document.querySelector('.toast');
let cartItems = 0;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    cartItems += 1;
    cartCount.textContent = cartItems;
    showToast(`${button.closest('.product-card').dataset.product} added to your cart.`);
  });
});

document.querySelector('#search').addEventListener('input', (event) => {
  const query = event.target.value.toLowerCase().trim();
  let visibleProducts = 0;
  document.querySelectorAll('.product-card').forEach((card) => {
    const matches = card.dataset.product.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleProducts += 1;
  });
  document.querySelector('.empty-state').hidden = visibleProducts !== 0;
});

document.querySelectorAll('.friend-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isFollowing = button.classList.toggle('added');
    button.textContent = isFollowing ? 'Friend added ✓' : 'Add friend';
    showToast(isFollowing ? 'Friend request sent.' : 'Friend request removed.');
  });
});
const CART_KEY = "vue-marketplace-shopping-cart";

export function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const alreadySelected = cart.find((item) => item.id === product.id);
  if (alreadySelected) {
    alreadySelected.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(productId) {
  const cart = getCart();
  const item = cart.find((p) => p.id === productId);

  if (item) {
    item.quantity--;
    if (item.quantity <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }

    saveCart(cart);
  }
}

export function clearCart(cart) {
  localStorage.clear();
}

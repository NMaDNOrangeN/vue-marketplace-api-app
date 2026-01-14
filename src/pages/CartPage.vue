<script setup>
import { ref, onMounted, computed } from "vue";
import { getCart, addToCart, removeFromCart, clearCart } from "@/utils/cart";

const cart = ref([]);

function loadCart() {
  cart.value = getCart();
}

onMounted(loadCart);

const total = computed(() => {
  const sum = cart.value.reduce(
    (amount, item) => amount + item.price * item.quantity,
    0
  );
  return Math.round(sum * 100) / 100;
});

function remove(productId) {
  removeFromCart(productId);
  loadCart();
}

function add(product) {
  addToCart(product);
  loadCart();
}

function clear() {
  clearCart();
  loadCart();
}
</script>

<template>
  <div class="shopping-cart">
    <h1 class="shopping-cart__title">Корзина</h1>
    <div v-if="cart.length === 0">В корзине пусто!</div>

    <ul v-else>
      <li v-for="item in cart" :key="item.id">
        <img :src="item.img" :alt="item.name" width="100px" />
        {{ item.name }} – {{ item.price }} руб. * {{ item.quantity }}

        <button class="btn" @click="remove(item.id)">-</button>
        <button class="btn" @click="add(item)">+</button>
      </li>
    </ul>

    <p class="shopping-cart__amount" v-if="cart.length > 0">
      Итого: {{ total }} руб.
    </p>
    <button class="btn" v-if="cart.length > 0" @click="clear">
      Очистить корзину
    </button>
  </div>
</template>

<style scoped></style>

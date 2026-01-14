<script setup>
import { ref, onMounted, computed } from "vue";
import { getCart, addToCart, removeFromCart, clearCart } from "@/utils/cart";
import { RouterLink } from "vue-router";

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
  <div class="container shopping-cart">
    <h1 class="shopping-cart__title">Корзина</h1>
    <div class="shopping-cart__empty" v-if="cart.length === 0">
      В корзине пусто!
    </div>

    <div class="shopping-cart__list" v-else>
      <div class="shopping-cart__goods" v-for="item in cart" :key="item.id">
        <RouterLink class="shopping-cart__link" :to="`/product/${item.id}`">
          <img class="shopping-cart__image" :src="item.img" :alt="item.name"
        /></RouterLink>

        <div class="shopping-cart__info">
          {{ item.name }} – {{ item.price }} руб. * {{ item.quantity }}
        </div>

        <div class="shopping-cart__controls">
          <button class="btn" @click="remove(item.id)">-</button>
          <button class="btn" @click="add(item)">+</button>
        </div>
      </div>
    </div>

    <div class="shopping-cart__end">
      <p class="shopping-cart__amount" v-if="cart.length > 0">
        Итого: {{ total }} руб.
      </p>
      <button class="btn" v-if="cart.length > 0" @click="clear">
        Очистить корзину
      </button>
    </div>
  </div>
</template>

<style scoped></style>

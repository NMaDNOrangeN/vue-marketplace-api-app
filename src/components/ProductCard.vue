<script setup>
import { addToCart } from "@/utils/cart";
import { RouterLink } from "vue-router";

const props = defineProps({
  product: Object,
});

function addProductToCart() {
  addToCart(props.product);
  alert(`Продукт "${props.product.name}" добавлен в корзину!`);
}
</script>

<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product.id}`">
      <img :src="product.img" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>Цена: {{ product.price }} руб.</p>
      <p>Оценка: {{ product.rating }}</p>
    </RouterLink>

    <button class="btn" @click.stop="addProductToCart">
      Добавить в корзину
    </button>
  </div>
</template>

<style scoped></style>

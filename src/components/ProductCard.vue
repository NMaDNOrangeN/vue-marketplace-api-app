<script setup>
import { addToCart } from "@/utils/cart";
import { RouterLink } from "vue-router";
import noImage from "@/assets/no_image.jpg";

const props = defineProps({
  product: Object,
  category: String,
});

function addProductToCart() {
  addToCart(props.product);
  alert(`Продукт "${props.product.name}" добавлен в корзину!`);
}
</script>

<template>
  <div class="product-card">
    <RouterLink :to="`/product/${product.id}`">
      <img :src="product.img || noImage" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p v-if="category !== 'Все категории'">Категория: {{ category }}</p>
      <p>Цена: {{ product.price }} руб.</p>
      <p>Оценка: {{ product.rating }}</p>
    </RouterLink>

    <button class="btn" @click.stop="addProductToCart">
      Добавить в корзину
    </button>
  </div>
</template>

<style scoped></style>

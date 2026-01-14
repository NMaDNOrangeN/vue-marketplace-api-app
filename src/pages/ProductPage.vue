<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { API_URL, API_KEY } from "../utils/extra.js";

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const response = await fetch(
    `${API_URL}/product/${route.params.id}?api_key=${API_KEY}`
  );
  product.value = await response.json();
});
</script>

<template>
  <div v-if="product">
    <img :src="product.img" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>Цена: {{ product.price }} руб.</p>
    <p>Оценка: {{ product.rating }}</p>
    <p>Число оценок: {{ product.rating_count }}</p>
    <p v-if="product.description">{{ product.description }}</p>
    <p v-else>Нет описания</p>
  </div>
</template>

<style scoped></style>

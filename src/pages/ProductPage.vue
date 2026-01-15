<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { API_URL, API_KEY } from "@/utils/extra.js";
import { addToCart } from "@/utils/cart.js";
import noImage from "@/assets/no_image.jpg";

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const response = await fetch(
    `${API_URL}/product/${route.params.id}?api_key=${API_KEY}`
  );
  product.value = await response.json();
});

function addProductToCart() {
  addToCart(product.value);
  alert("Товар добавлен в корзину");
}
</script>

<template>
  <div class="container" v-if="product">
    <div class="product-page">
      <div class="product-page__image">
        <img :src="product.img || noImage" :alt="product.name" />
      </div>

      <div class="product-page__info">
        <h2 class="product-page__name">{{ product.name }}</h2>
        <p class="product-page__price">Цена: {{ product.price }} руб.</p>
        <p>Оценка: {{ product.rating }}</p>
        <p>Число оценок: {{ product.rating_count }}</p>

        <div class="product-page__description">
          <h3>Описание:</h3>
          <p v-if="product.description">{{ product.description }}</p>
          <p v-else>Нет описания</p>
        </div>

        <div class="product-page__add-to-cart">
          <button class="btn" @click.stop="addProductToCart">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

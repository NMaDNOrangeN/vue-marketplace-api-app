<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import { API_URL, API_KEY } from "@/utils/extra.js";

const products = ref([]);

async function getProducts(page = 1) {
  const response = await fetch(
    `${API_URL}/product?api_key=${API_KEY}&page=${page}&category_id=${selectedCategory.value}`
  );
  return response.json();
}

const categories = ref([]);
const selectedCategory = ref(0);

async function getCategories() {
  const response = await fetch(`${API_URL}/category?api_key=${API_KEY}`);
  return response.json();
}

onMounted(async () => {
  const productsData = await getProducts();
  products.value = productsData.items;

  const categoriesData = await getCategories();
  categories.value = categoriesData.items;
});

async function loadProducts() {
  const data = await getProducts(currentPage.value);
  products.value = data.items;
  totalPages.value = data.total_pages;
}

onMounted(async () => {
  await loadProducts();
  const categoriesData = await getCategories();
  categories.value = categoriesData;
});

const currentPage = ref(1);
const totalPages = ref(1);

function onCategoryChange() {
  currentPage.value = 1;
  loadProducts();
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadProducts();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loadProducts();
  }
}
</script>

<template>
  <div class="container">
    <div class="categories">
      <select
        class="categories__select"
        v-model="selectedCategory"
        @change="onCategoryChange"
      >
        <option class="categories__select-option" :value="0">
          Все категории
        </option>
        <option
          class="categories__select-option"
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="container">
    <div class="products">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :category="
          selectedCategory
            ? categories[selectedCategory - 1].name
            : 'Все категории'
        "
      ></ProductCard>
    </div>
  </div>

  <div class="container">
    <div class="pagination">
      <button class="btn" :disabled="currentPage === 1" @click="previousPage">
        Назад
      </button>
      <span class="pagination__pages">{{ currentPage }}/{{ totalPages }}</span>
      <button
        class="btn"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Вперёд
      </button>
    </div>
  </div>
</template>

<style scoped></style>

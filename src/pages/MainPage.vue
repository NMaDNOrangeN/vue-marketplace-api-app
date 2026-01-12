<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";

const API_URL = "https://nti.urfu.ru/api_exam";

const products = ref([]);

async function getProducts(page = 1) {
  const response = await fetch(
    `${API_URL}/product?api_key=8R2S3r3aR5KIb2zR&page=${page}&category_id=${selectedCategory.value}`
  );
  return response.json();
}

const categories = ref([]);
const selectedCategory = ref(0);

async function getCategories() {
  const response = await fetch(`${API_URL}/category?api_key=8R2S3r3aR5KIb2zR`);
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

  <div class="products">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    ></ProductCard>
  </div>

  <div class="pagingation">
    <button
      class="pagination__previous"
      :disabled="currentPage === 1"
      @click="previousPage"
    >
      Назад
    </button>
    <span class="pagination__pages">{{ currentPage }}/{{ totalPages }}</span>
    <button
      class="pagination__next"
      :disabled="currentPage === totalPages"
      @click="nextPage"
    >
      Вперёд
    </button>
  </div>
</template>

<style scoped></style>

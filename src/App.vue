<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Товары</RouterLink>
      <RouterLink to="/cart">Корзина</RouterLink>
    </nav>
  </header>

  <RouterView />
  <!-- <footer></footer> -->
</template>

<style scoped></style>

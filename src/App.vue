<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "./router";

function to_home() {
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Товары</RouterLink>
      <RouterLink to="/cart">Корзина</RouterLink>
    </nav>
  </header>

  <RouterView />
  <footer>
    <nav>
      <RouterLink to="/">Товары</RouterLink>
      <RouterLink to="/cart">Корзина</RouterLink>
    </nav>
    <button class="button-to-home" @click="to_home">↑В начало↑</button>
    <p>По вопросам: caesgou@mail.ru</p>
  </footer>
</template>

<style scoped></style>

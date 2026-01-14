<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from "@/router";

function to_home() {
  return window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<template>
  <div class="app">
    <header>
      <nav class="container nav">
        <RouterLink to="/">Товары</RouterLink>
        <RouterLink to="/cart">Корзина</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer>
      <div class="container footer-content">
        <button class="btn" @click="to_home">↑ В начало ↑</button>
        <p>По вопросам: caesgou@mail.ru</p>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>

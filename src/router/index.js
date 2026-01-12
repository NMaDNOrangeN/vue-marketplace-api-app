import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

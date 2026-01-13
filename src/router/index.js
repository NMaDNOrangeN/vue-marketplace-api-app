import { createRouter, createWebHashHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CartPage from "@/pages/CartPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/product/:id",
    component: ProductPage,
  },
  {
    path: "/cart",
    component: CartPage,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});

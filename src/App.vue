<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/ProductStore";
const productStore = useProductStore();

//with destruct and reactive
// import { storeToRefs } from "pinia";
// const { products } = storeToRefs(useProductStore());

// panggil fungsi fill pada ProductStore.js
productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
      />
    </ul>
  </div>
</template>

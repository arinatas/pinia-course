<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

//with destruct and reactive
// import { storeToRefs } from "pinia";
// const { products } = storeToRefs(useProductStore());

// panggil fungsi fill pada ProductStore.js
productStore.fill();
// const addToCart = (count, product) => {
//   count = parseInt(count);
//   cartStore.$patch((state) => {
//     for(let index = 0; index < count; index++){
//       state.items.push(product)
//     }
//   });
// }

</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
        <!-- @addToCart="addToCart($event, product)" -->
    </ul>
  </div>
</template>

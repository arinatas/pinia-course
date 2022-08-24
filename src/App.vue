<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
import AppButton from "./components/AppButton.vue";

const productStore = useProductStore();
const cartStore = useCartStore();


cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
})=>{
  if(name == 'addItems'){
    after(() => {
      console.log(args[0]);
    });
    onError((error)=> {
      console.log("this error: ", error.message);
    });
  }
})

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
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
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

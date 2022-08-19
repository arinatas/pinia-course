import { defineStore } from "pinia";

// syncronus import from file product.json
// import productlists from "@/data/products.json";

export const useProductStore = defineStore("ProductStore", {
  // state
  state: () => {
    return {
      products:[],
    };
  },

  // action
  actions:{
    // asyncronus function import data from product.json
    async fill(){
      // cara asyncronus
      this.products = (await import("@/data/products.json")).default;

      // product state diisi dengan product dari json file (cara syncronus)
      // this.products = productlists;
    }
  }

  // getters
});

import { isEmpty } from "lodash";
import { groupBy } from "lodash";
import { defineStore, acceptHMRUpdate } from "pinia";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items:[],
        }
    },
    getters: {
        // arrow function way underhere
        count: (state) => state.items.length,
        isEmpty: (state) => state.count == 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, (item) => item.name);
            const sorted = Object.keys(grouped).sort();
            let in0rder = {};
            sorted.forEach((key) => in0rder[key] = grouped[key]);
            return in0rder;
        },
        groupCount: (state) => (name) => state.grouped[name].length,
        total: (state) => state.items.reduce((p, c) => p + c.price, 0),

        // normal function way under here
        // count() {
        //     return this.items.length;
        // },
        // isEmpty(){
        //     return this.count == 0;
        // }
    },

    actions: {
        checkout(){
            const authUserStore = useAuthUserStore();
            alert(
                `${authUserStore.username} just bought ${this.count} items at a total of ${this.total}`
            )
        },
        addItems(count, item) {
            count = parseInt(count);
            for(let index = 0; index < count; index++){
                this.items.push({...item})
              }
        },
        clearItem(itemName){
            this.items = this.items.filter(item => item.name != itemName)
        },
        setItemCount(item, count){
            this.clearItem(item.name);
            this.addItems(count, item);
        }
    }
});

// make sure to pass the right store definition, `useCartStore` in this case. biar ga perlu refresh page pake ini accpetHMRUpdate
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
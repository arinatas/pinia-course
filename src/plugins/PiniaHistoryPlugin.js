import { ref, reactive } from "vue";

export function PiniaHistoryPlugin({pinia, app, store, options}){

    if (!options.historyEnabled) return;
    const history = reactive([]);
    const future = reactive([]);
    const doingHistory = ref(false);

    history.push(JSON.stringify(store.$state));

    // const redo = () => {
    //     const latestSate = future.pop();
    //     if(!latestSate) return;
    //     doingHistory.value = true;
    //     history.push(latestSate);
    //     store.$state = JSON.parse(latestSate);
    //     doingHistory.value = false;
    // }

    // const undo = () => {
    //     if(history.length == 1) return
    //     doingHistory.value = true
    //     future.push(history.pop()); 
    //     store.$state = JSON.parse(history.at(-1))
    //     doingHistory.value = false
    // }

    store.$subscribe((mutation, state) => {
    if(!doingHistory.value) {
        history.push(JSON.stringify(state));
        future.splice(0, future.length);
    }
    });

    return {
        history,
        future,
        undo: () => {
            if(history.length == 1) return
            doingHistory.value = true
            future.push(history.pop()); 
            store.$state = JSON.parse(history.at(-1))
            doingHistory.value = false
        },
        redo: () => {
            const latestSate = future.pop();
            if(!latestSate) return;
            doingHistory.value = true;
            history.push(latestSate);
            store.$state = JSON.parse(latestSate);
            doingHistory.value = false;
        }
    }

}
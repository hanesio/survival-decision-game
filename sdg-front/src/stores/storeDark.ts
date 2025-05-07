import { defineStore } from 'pinia';

interface DarkState {
    dark: Boolean;
}

export const useStoreDark = defineStore('storeDark', {
    state: (): DarkState => {
        return {
            dark: false,
        };
    },
    actions: {},
    getters: {},
});

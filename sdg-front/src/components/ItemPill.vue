<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div
        class="fade-in flex items-center gap-2 rounded-full bg-cyan-100 p-2 transition duration-300 ease-out active:scale-90 active:opacity-0"
    >
        <button
            class="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-cyan-400 p-2"
        >
            +
        </button>
        <p class="pr-2">{{ label }}</p>
    </div>
</template>

<style scoped>
.fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.3s;
}

@keyframes fadeInOpacity {
    0% {
        opacity: 0;
        scale: 90%;
    }
    100% {
        opacity: 1;
        scale: 100%;
    }
}
</style>

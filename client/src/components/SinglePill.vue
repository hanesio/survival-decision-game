<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    username: {
        type: String,
        required: true,
    },
});

const isActive = ref(false);
</script>
<template>
    <p
        @click="isActive = !isActive"
        :class="[
            isActive
                ? 'bg-primary-300  border-primary-500'
                : 'bg-primary-100 border-transparent text-gray-400 dark:bg-gray-800 dark:text-gray-600',
        ]"
        class="cursor-pointer rounded-full border-2 px-4 py-1 text-xl"
    >
        {{ username }}
    </p>
</template>

<style scoped></style>

<script setup lang="ts">
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <button
        class="cursor-pointer rounded-lg border-2 px-4 py-2 text-2xl transition duration-300 ease-out hover:bg-gray-500 active:scale-95 dark:hover:bg-gray-400"
        :class="[
            isActive
                ? ' from-primary-700 to-primary-300 border-primary-500 bg-gradient-to-br lg:-translate-y-5 '
                : ' border-transparent bg-gray-100 text-gray-400 hover:-translate-y-0.5 lg:text-gray-100 dark:bg-gray-800 dark:text-gray-600 dark:lg:text-gray-800',
        ]"
    >
        {{ label }}
    </button>
</template>

<style scoped></style>

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
        class="cursor-pointer rounded-lg border-2 px-4 py-2 text-2xl transition duration-300 ease-out hover:bg-gray-500 active:scale-95"
        :class="[
            isActive
                ? ' from-primary-700 to-primary-300 border-primary-500 -translate-y-5 bg-gradient-to-br '
                : ' border-transparent bg-gray-100 text-gray-100 hover:-translate-y-0.5',
        ]"
    >
        {{ label }}
    </button>
</template>

<style scoped></style>

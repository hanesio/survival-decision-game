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
    <div
        class="flex cursor-pointer rounded-t-lg px-3 py-1"
        :class="[
            isActive
                ? 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'
                : 'border-transparent bg-gray-50 text-gray-400 dark:bg-gray-950 dark:text-gray-600',
        ]"
    >
        {{ label }}
    </div>
</template>

<style scoped></style>

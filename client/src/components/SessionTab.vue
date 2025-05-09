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
    isLarge: { type: Boolean, default: false },
});
</script>
<template>
    <div
        class="mb-1 flex h-12 w-8 cursor-pointer items-center justify-center rounded-l-lg px-3 py-1 lg:mb-0 lg:h-full lg:min-w-max lg:rounded-t-lg lg:rounded-bl-none"
        :class="[
            isActive
                ? 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'
                : 'border-transparent bg-gray-50 text-gray-400 dark:bg-gray-950 dark:text-gray-600',
        ]"
    >
        {{ isLarge ? label : label.slice(0, 1) }}
    </div>
</template>

<style scoped></style>

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
        class="cursor-pointer rounded-t-lg px-3 py-1"
        :class="[isActive ? 'bg-gray-100' : 'border-transparent bg-gray-50 text-gray-400']"
    >
        {{ label }}
    </div>
</template>

<style scoped></style>

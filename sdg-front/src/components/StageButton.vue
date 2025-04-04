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
        class="cursor-pointer rounded-lg px-4 py-2 border-2 text-2xl transition duration-300 hover:bg-gray-500  active:scale-95 ease-out "
        :class="[isActive ? ' bg-gradient-to-br from-cyan-500 to-pink-400 border-cyan-500 -translate-y-5 ' : ' hover:-translate-y-0.5 border-transparent bg-gray-100 text-gray-100']"
    >
        {{ label }}
    </button>
</template>

<style scoped></style>

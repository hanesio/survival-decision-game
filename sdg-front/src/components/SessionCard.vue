<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
});

const newDate = new Date(props.date);
const formattedDate = newDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
</script>
<template>
    <div
        class="lg:w-74 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-cyan-900"
    >
        <div class="mt-6 text-3xl text-gray-100">{{ name }}</div>
        <div class="text-lg text-gray-100">{{ formattedDate }}</div>
        <div class="mt-1 rounded-full border-2 border-green-600 bg-green-300 p-2" v-if="isActive">
            aktiv
        </div>
    </div>
</template>

<style scoped></style>

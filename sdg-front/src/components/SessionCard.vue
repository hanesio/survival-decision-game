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
        class="lg:w-74 hover:scale-102 relative flex h-40 w-full cursor-pointer flex-col items-center rounded-2xl border-2 border-cyan-200 bg-cyan-900 transition hover:bg-cyan-700"
    >
        <div
            class="absolute -top-0 flex h-6 w-14 items-center justify-center rounded-b-xl border-2 border-t-0 border-green-600 bg-green-300 p-2 text-center text-sm font-semibold"
            v-if="isActive"
        >
            aktiv
        </div>
        <div class="mt-10 text-3xl text-gray-100">{{ name }}</div>
        <div class="text-lg text-gray-100">{{ formattedDate }}</div>
    </div>
</template>

<style scoped></style>

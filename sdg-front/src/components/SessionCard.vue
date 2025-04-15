<script setup lang="ts">
import { computed } from 'vue';

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

const nameLength = computed(() => {
    return props.name.length;
});
</script>
<template>
    <div
        class="lg:w-74 hover:scale-102 relative flex h-40 w-full cursor-pointer flex-col items-center justify-between rounded-2xl border-2 border-cyan-200 bg-cyan-900 p-4 pb-6 transition hover:bg-cyan-700"
    >
        <div
            class="absolute -top-0 flex h-6 w-14 items-center justify-center rounded-b-xl border-2 border-t-0 border-green-600 bg-green-300 p-2 text-center text-sm font-semibold"
            v-if="isActive"
        >
            aktiv
        </div>
        <div
            v-if="name.length < 18"
            class="flex h-full w-full items-center justify-center p-2 text-center text-3xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 18 && name.length < 38"
            class="flex h-full w-full items-center justify-center hyphens-auto p-2 text-center text-2xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 38"
            class="flex h-full items-center justify-center hyphens-auto p-2 text-center text-xl text-gray-100"
        >
            {{ name }}
        </div>

        <div class="text-cyan-500">{{ formattedDate }}</div>
    </div>
</template>

<style scoped></style>

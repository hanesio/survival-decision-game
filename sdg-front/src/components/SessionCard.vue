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
    singlesCount: {
        type: Number,
        default: 0,
    },
    groupCount: {
        type: Number,
        default: 0,
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
        class="lg:w-74 hover:scale-102 relative flex h-40 w-full cursor-pointer flex-col items-center justify-between rounded-2xl border-2 border-cyan-200 bg-cyan-900 transition hover:bg-cyan-700"
    >
        <div
            class="absolute -top-0 flex h-6 w-14 items-center justify-center rounded-b-xl border-2 border-t-0 border-green-600 bg-green-300 p-2 text-center text-sm font-semibold"
            v-if="isActive"
        >
            aktiv
        </div>
        <div
            v-if="name.length < 18"
            class="flex h-full w-full items-center justify-center px-2 pt-3 text-center text-3xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 18 && name.length < 38"
            class="flex h-full w-full items-center justify-center hyphens-auto px-2 pt-3 text-center text-2xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 38"
            class="flex h-full items-center justify-center hyphens-auto px-2 pt-3 text-center text-xl text-gray-100"
        >
            {{ name }}
        </div>
        <div class="flex w-full justify-center gap-4 bg-cyan-800 p-1">
            <div class="flex gap-2">
                <p class="text-cyan-500">{{ singlesCount }}</p>
                <p class="text-white">Spieler</p>
            </div>
            <div class="flex gap-2">
                <p class="text-cyan-500">{{ groupCount }}</p>
                <p class="text-white">Gruppen</p>
            </div>
        </div>

        <div class="py-2 text-sm text-cyan-200">{{ formattedDate }}</div>
    </div>
</template>

<style scoped></style>

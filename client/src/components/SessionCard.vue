<template>
    <div
        class="shutter-in lg:w-74 hover:scale-102 bg-primary-900 hover:bg-primary-950 group relative flex h-40 w-full cursor-pointer flex-col items-center justify-between rounded-2xl transition"
    >
        <div
            class="absolute -top-0 flex h-6 w-14 items-center justify-center rounded-b-xl border-2 border-t-0 border-green-600 bg-green-300 p-2 text-center text-sm font-semibold"
            v-if="isActive"
        >
            aktiv
        </div>
        <div
            v-if="name.length < 18"
            class="flex h-full w-full items-center justify-center px-3 pt-4 text-center text-3xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 18 && name.length < 38"
            class="flex h-full w-full items-center justify-center hyphens-auto px-3 pt-4 text-center text-2xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            v-if="name.length >= 38"
            class="flex h-full items-center justify-center hyphens-auto px-3 pt-4 text-center text-xl text-gray-100"
        >
            {{ name }}
        </div>
        <div
            class="bg-primary-700 group-hover:bg-primary-800 flex w-full items-center justify-center gap-4 p-1"
        >
            <div class="flex items-center gap-1.5">
                <p class="text-secondary-400 text-lg font-semibold">{{ singlesCount }}</p>
                <p class="text-white">Spielende</p>
            </div>
            <div class="flex items-center gap-1.5">
                <p class="text-secondary-400 text-lg font-semibold">{{ groupCount }}</p>
                <p v-if="groupCount === 1" class="text-white">Gruppe</p>
                <p v-else class="text-white">Gruppen</p>
            </div>
        </div>

        <div class="text-primary-200 py-2 text-sm">{{ formattedDate }}</div>
    </div>
</template>

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
</script>

<style scoped>
.shutter-in {
    opacity: 1;
    animation-name: shutterInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    animation-duration: 0.5s;
}

@keyframes shutterInOpacity {
    0% {
        opacity: 0;
        scale: 95%;
    }
    40% {
        translate: 0 10px;
    }
    60% {
        scale: 100%;
    }
    100% {
        opacity: 1;
        translate: 0 0;
    }
}
</style>

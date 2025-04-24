<template>
    <button
        class="text-secondary-500 hover:text-secondary-600 group mx-auto flex h-14 w-14 cursor-pointer flex-col items-center transition"
    >
        <IconRefresh class="shrink-0 transition group-active:rotate-180 group-active:scale-90" />
        <p>aktualisieren</p>
    </button>
</template>

<script setup lang="ts">
import IconRefresh from './icons/IconRefresh.vue';
</script>

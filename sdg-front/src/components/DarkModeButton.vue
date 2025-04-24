<template>
    <button @click="cycle" class="active:scale-70 h-8 w-8 cursor-pointer transition ease-in-out">
        <IconLightMode class="shrink-0" v-if="mode === 'light'" />
        <IconOSMode class="shrink-0" v-if="mode === 'OS'" />
        <IconDarkMode class="shrink-0" v-if="mode === 'dark'" />
    </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import IconLightMode from './icons/IconLightMode.vue';
import IconDarkMode from './icons/IconDarkMode.vue';
import IconOSMode from './icons/IconOSMode.vue';

const props = defineProps({
    modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const counter = ref(0);
const mode = computed(() => {
    const mod = counter.value % 3;
    if (mod === 0) return 'OS';
    if (mod === 1) return 'light';
    return 'dark';
});

function cycle() {
    counter.value++;
    emit('update:modelValue', mode.value);
}
</script>

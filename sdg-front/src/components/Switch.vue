<template>
    <div class="flex w-20 flex-col items-center">
        <p :class="[modelValue ? 'text-primary-700' : 'text-gray-400']">{{ label }}</p>
        <div
            @click="toggleSwitch"
            class="flex h-5 w-12 cursor-pointer items-center rounded-full transition duration-100"
            :class="[props.modelValue ? 'bg-primary-500 ' : 'bg-gray-200']"
        >
            <div
                class="border-1 border-primary-500 h-6 w-6 rounded-full bg-white transition duration-100 ease-out"
                :class="[props.modelValue ? 'translate-x-6' : 'translate-0']"
            ></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
    modelValue: Boolean,
});
const emit = defineEmits(['update:modelValue']);
let active = props.modelValue;

const label = computed(() => (props.modelValue ? 'aktiv' : 'aktivieren'));

function toggleSwitch() {
    active = !active;
    emit('update:modelValue', active);
}
</script>

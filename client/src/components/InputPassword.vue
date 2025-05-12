<script setup lang="ts">
import { ref } from 'vue';
import IconEye from './icons/IconEye.vue';

defineProps({
    placeholder: String,
    modelValue: String,
    passwordValid: Boolean,
    invalidMessage: String,
});

const fieldType = ref('password');
const switchVisibility = () => {
    fieldType.value = fieldType.value === 'password' ? 'text' : 'password';
};

const emit = defineEmits(['update:modelValue']);
function updateModel(event: Event) {
    const element = event.target as HTMLInputElement;
    if (!element) return;
    emit('update:modelValue', element.value);
}
</script>

<template>
    <div>
        <div class="relative">
            <input
                :value="modelValue"
                @input="(event) => updateModel(event)"
                :type="fieldType"
                :class="[
                    !passwordValid && modelValue.length > 0
                        ? 'border-rose-500'
                        : 'border-transparent',
                ]"
                class="relative w-full rounded border-2 bg-gray-200 p-1 pl-2 text-lg dark:bg-gray-800 dark:text-gray-200"
                :placeholder
            /><button
                v-if="modelValue.length > 0"
                class="absolute right-3 top-1/2 h-1/2 w-6 -translate-y-1/2 cursor-pointer"
                @click="switchVisibility"
            >
                <IconEye />
            </button>
        </div>
        <p v-if="!passwordValid && modelValue.length > 0" class="p-1 text-xs text-rose-500">
            {{ invalidMessage }}
        </p>
    </div>
</template>

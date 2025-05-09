<template>
    <dialog
        ref="dialog"
        class="flex h-48 w-80 flex-col justify-between rounded-md p-4 dark:bg-gray-900 dark:text-gray-200"
        :class="[dialogOpen ? 'visible' : 'invisible']"
    >
        <p
            class="text-primary-500 absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 text-center"
        >
            Anmelden
        </p>
        <button
            class="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-black dark:hover:text-white"
            @click="close"
        >
            <IconClose />
        </button>
        <div>
            <p class="mt-5 py-1">Admin</p>
            <input
                v-model="password"
                :class="[passwordFalse ? 'border-rose-500' : 'border-transparent']"
                class="w-full rounded border-2 bg-gray-200 p-1 pl-2 text-lg dark:bg-gray-800 dark:text-gray-200"
                placeholder="Passwort"
                type="password"
                @keyup.enter="tryLogin"
            />
            <p v-if="passwordFalse" class="p-1 text-xs text-rose-500">Passwort nicht korrekt</p>
        </div>
        <div class="flex justify-end gap-2">
            <button
                @click="close"
                class="cursor-pointer rounded-sm border-gray-300 bg-gray-50 p-2 transition hover:bg-gray-300 active:scale-95 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-500"
            >
                abbrechen
            </button>
            <button
                @click="tryLogin"
                class="border-primary-300 bg-primary-50 hover:bg-primary-400 cursor-pointer rounded-sm border-2 p-2 transition active:scale-95 dark:bg-gray-900"
            >
                Login
            </button>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    dialogOpen: {
        type: Boolean,
        required: true,
    },
    passwordFalse: {
        type: Boolean,
        default: false,
    },
    modelValue: String,
});

const emit = defineEmits(['login', 'close', 'update:modelValue']);
const dialog = ref<HTMLDialogElement>();
const password = ref('');
const show = computed(() => {
    return props.dialogOpen;
});

watch(show, () => {
    show.value ? dialog.value.showModal() : dialog.value.close();
});

function close() {
    password.value = '';
    emit('close');
}
function tryLogin() {
    emit('update:modelValue', password.value);
    emit('login');
    password.value = '';
}
</script>

<style scoped>
dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}
</style>

<template>
    <dialog
        ref="dialog"
        class="lg:w-140 flex flex-col justify-between gap-2 rounded-md p-8 px-12 dark:bg-gray-900 dark:text-gray-200"
        :class="[dialogOpen ? 'visible' : 'invisible']"
    >
        <p
            class="text-primary-500 absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2 text-center"
        >
            Passwort ändern
        </p>
        <button
            class="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-black dark:hover:text-white"
            @click="close"
        >
            <IconClose />
        </button>

        <div class="mt-8 flex flex-col gap-2">
            <InputPassword
                v-model="inputCurrentPassword"
                invalid-message="Passwort nicht korrekt"
                :password-valid="currentPasswordValid"
                placeholder="aktuelles Passwort"
            />
            <hr class="my-4" />
            <InputPassword
                v-model="newPassword"
                invalid-message="Mindestens 8 und maximal 10 Zeichen, mindestens ein Großbuchstabe, ein
                    Kleinbuchstabe, eine Zahl und ein Sonderzeichen (@$!%*?&^_-=+|[]{}.:;#)"
                :password-valid="newPasswordValid"
                placeholder="neues Passwort"
            />
            <InputPassword
                v-model="repeatPassword"
                invalid-message="Passwort nicht gleich"
                :password-valid="repeatPasswordValid"
                placeholder="Passwort wiederholen"
            />
        </div>

        <div class="flex justify-end gap-2">
            <button
                @click="close"
                class="cursor-pointer rounded-sm border-gray-300 bg-gray-50 p-2 transition hover:bg-gray-300 active:scale-95 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-500"
            >
                abbrechen
            </button>
            <button
                @click="save"
                class="border-primary-300 bg-primary-50 hover:bg-primary-400 cursor-pointer rounded-sm border-2 p-2 transition active:scale-95 dark:bg-gray-900"
            >
                Speichern
            </button>
        </div>
    </dialog>
</template>
<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue';
import { computed, ref, watch } from 'vue';
import InputPassword from './InputPassword.vue';

const props = defineProps({
    dialogOpen: {
        type: Boolean,
        required: true,
    },
    currentPassword: {
        type: String,
        required: true,
    },
    modelValue: String,
});

const emit = defineEmits(['save', 'close', 'update:modelValue']);
const dialog = ref<HTMLDialogElement>();

const inputCurrentPassword = ref('');
const newPassword = ref('');
const repeatPassword = ref('');
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\^\_\-\=\+\|\[\]\{\}\.\:\;\#])[A-Za-z\d@$!%*?&\^\_\-\=\+\|\[\]\{\}\.\:\;\#]{8,10}$/;

const show = computed(() => {
    return props.dialogOpen;
});

const currentPasswordValid = computed(() => {
    return props.currentPassword === inputCurrentPassword.value;
});
const newPasswordValid = computed(() => {
    return passwordRegex.test(newPassword.value);
});
const repeatPasswordValid = computed(() => {
    return newPassword.value === repeatPassword.value;
});

watch(show, () => {
    show.value ? dialog.value.showModal() : dialog.value.close();
});

function close() {
    inputCurrentPassword.value = '';
    newPassword.value = '';
    repeatPassword.value = '';
    emit('close');
}
function save() {
    if (currentPasswordValid && newPasswordValid && repeatPasswordValid) {
        emit('update:modelValue', newPassword.value);
        emit('save');
        close();
    }
}
</script>

<style scoped>
dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}
</style>

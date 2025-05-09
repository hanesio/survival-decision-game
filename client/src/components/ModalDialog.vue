<template>
    <dialog
        ref="dialog"
        class="flex h-48 w-80 flex-col justify-between rounded-md p-4 dark:bg-gray-900 dark:text-gray-200"
        :class="[dialogOpen ? 'visible' : 'invisible']"
    >
        <button
            class="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-black dark:hover:text-white"
            @click="$emit('close')"
        >
            <IconClose />
        </button>
        <p class="flex h-full items-center justify-center text-center">
            {{ text }}
        </p>
        <div class="flex justify-end gap-2">
            <button
                @click="$emit('close')"
                class="cursor-pointer rounded-sm border-2 border-gray-300 bg-gray-50 p-2 transition hover:bg-gray-300 active:scale-95 dark:border-gray-500 dark:bg-gray-900 dark:hover:bg-gray-500"
            >
                abbrechen
            </button>
            <button
                @click="$emit('delete')"
                class="cursor-pointer rounded-sm border-2 border-rose-300 bg-rose-50 p-2 transition hover:bg-rose-400 active:scale-95 dark:bg-gray-900"
            >
                {{ actionButtonLabel }}
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
    text: {
        type: String,
        default: 'insert text here',
    },
    actionButtonLabel: {
        type: String,
        default: 'löschen',
    },
});

const emits = defineEmits(['delete', 'close']);
const dialog = ref<HTMLDialogElement>();
const show = computed(() => {
    return props.dialogOpen;
});

watch(show, () => {
    show.value ? dialog.value.showModal() : dialog.value.close();
});
</script>

<style scoped>
dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
}
</style>

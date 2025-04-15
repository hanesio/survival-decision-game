<template>
    <article class="flex flex-col border-l-4 border-primary-500 px-4">
        <h3 class="text-xl">{{ title }}</h3>
        <h2 class="text-4xl lg:text-6xl">{{ stage }}</h2>
    </article>
    <article>
        <details class="p-2">
            <summary>Szenario</summary>
            <p>{{ description }}</p>
        </details>
    </article>
    <slot name="members"></slot>
    <div class="flex flex-col gap-2 rounded bg-gray-50 p-4">
        <div class="flex flex-col gap-2 py-2 lg:flex-row">
            <slot name="username"></slot>
        </div>
        <div class="flex flex-wrap gap-2">
            <ItemPill
                @click="addItemToDragList(item)"
                v-for="item in shuffledItems"
                :label="item.description"
            />
        </div>
        <p
            v-if="showValidation"
            class="px-2 text-xs"
            :class="[valid ? 'text-green-500' : 'text-red-600']"
        >
            {{ validationMessage }}
        </p>

        <draggable
            v-model="dragListItems"
            tag="ul"
            handle=".handle"
            animation="300"
            :force-fallback="true"
            item-key="id"
        >
            <template #item="{ element: item, index }" ">
                <li
                    class="mt-1 handle flex w-full items-center justify-between gap-0.5 rounded-sm bg-gray-200 px-1 py-0"
                >
                    <span class="w-6 bg-gray-200 py-1 pl-1 text-center font-bold">{{
                        index + 1
                    }}</span>
                    <button
                        @click="deleteFromList(item)"
                        class="w-6 shrink-0 cursor-pointer text-gray-400"
                    >
                        <IconDelete class="w-5" />
                    </button>
                    <span class="w-full border-l-2 border-white bg-gray-200 p-1 px-2">
                        {{ item.description }}
                    </span>
                    <div
                        class="mr-1 flex w-10 cursor-grab items-center justify-center rounded-sm"
                    >
                        <IconDragHandle class="text-gray-400" />
                    </div>
                </li>
            </template>
        </draggable>
        <slot name="button"></slot>
    </div>
</template>

<script setup lang="ts">
import type { RankItem } from '@/types';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';
import IconDragHandle from '@/components/icons/IconDragHandle.vue';
import ItemPill from '@/components/ItemPill.vue';
import IconDelete from './icons/IconDelete.vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    items: {
        type: Array<RankItem>,
        required: true,
    },
    modelValue: Array<RankItem>,
    valid: {
        type: Boolean,
        default: false,
    },
    showValidation: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['update:modelValue']);

console.log(props);
shuffleArray(props.items);
const shuffledItems = ref(props.items);
const dragListItems = ref([]);

const validationMessage = computed(() => {
    if (!props.valid) return 'nur ' + dragListItems.value.length + '/15 Gegenständen zugewiesen';
    return 'sieht gut aus';
});

// Fisher-Yates algorithm
function shuffleArray(array: RankItem[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function addItemToDragList(item: RankItem) {
    dragListItems.value.push(item);
    shuffledItems.value = shuffledItems.value.filter((shuffle) => shuffle.rank != item.rank);
    emit('update:modelValue', dragListItems.value);
}

function deleteFromList(item: RankItem) {
    dragListItems.value = dragListItems.value.filter((listitem) => listitem.rank != item.rank);
    shuffledItems.value.push(item);
    emit('update:modelValue', dragListItems.value);
}
</script>

<style>
.sortable-chosen {
    opacity: 0;
}
</style>

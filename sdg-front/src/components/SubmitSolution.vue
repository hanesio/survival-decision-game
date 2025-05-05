<template>
    <article class="flex flex-col border-l-4 border-primary-500 px-4">
        <h3 class="text-xl dark:text-gray-500">{{ title }}</h3>
        <h2 class="text-4xl lg:text-6xl dark:text-gray-300">{{ stage }}</h2>
    </article>
    <article>
        <details class="p-2 dark:text-gray-300 flex ">
            <summary class="cursor-pointer bg-primary-200 pl-4 w-32 rounded-full dark:bg-primary-600">Szenario</summary>
            <p class="dark:text-gray-400">{{ description }}</p>
        </details>
    </article>
    <slot name="members"></slot>
    <div class="flex flex-col gap-2 rounded bg-gray-100 dark:bg-gray-800 p-4">

            <slot name="singleDecisions">
              <div v-if="!showGroupDecision" class="flex flex-col gap-1 p-1 dark:text-gray-200 text-sm">
                <div v-for="item,index in singleItems" class="grid grid-cols-[16px_1fr] gap-3 dark:bg-gray-700 bg-gray-200 px-2 py-1.5 rounded-full">
                  <p class="w-6 flex justify-center font-bold items-center">{{ index + 1 }}</p>
                  <p class=" ">{{item.description}}</p>
                </div>
              </div>
            </slot>

        <div class="flex flex-col gap-2 py-2 lg:flex-row">
            <slot name="username"></slot>
        </div>
        <div class="flex flex-wrap gap-2">
            <ItemPill v-if="showGroupDecision"
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

        <draggable v-if="showGroupDecision"
            v-model="dragListItems"
            tag="ul"
            handle=".handle"
            animation="300"
            :force-fallback="true"
            item-key="id"
        >
            <template #item="{ element: item, index }" ">
                <li
                    class="mt-1  flex w-full items-center justify-between gap-0.5 rounded-sm dark:text-gray-200 dark:bg-gray-700 bg-gray-200 px-1 py-0 " :class="[isLargeScreen && 'handle cursor-grab']"                >
                    <span class="w-6  py-1 pl-1 text-center font-bold">{{
                        index + 1
                    }}</span>
                    <button
                        @click="deleteFromList(item)"
                        class="w-6 shrink-0 cursor-pointer  text-gray-400"
                    >
                        <IconDelete class="w-5" />
                    </button>
                    <span class="w-full border-l-2 border-white dark:border-gray-900  p-1 px-2">
                        {{ item.description }}
                    </span>
                    <div
                        class="mr-1 flex w-10 cursor-grab items-center justify-center rounded-sm handle"
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
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 1024px)')

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
    showGroupDecision: {
        type: Boolean,
        default: true,
    },
    singleItems:Array<RankItem>,

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

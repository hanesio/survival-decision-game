<script setup lang="ts">
import SingleStage from './stages/SingleStage.vue';
import GroupStage from './stages/GroupStage.vue';
import ResultStage from './stages/ResultStage.vue';
import { useStorage } from '@vueuse/core';
import { useStoreActive } from '@/stores/storeActive';
import { AxiosHelper } from '@/AxiosHelper';
import { ref } from 'vue';

const axiosHelper = new AxiosHelper();

const storeActive = useStoreActive();
const active = ref({ sessionId: null, stage: 'single' });
getActive();
const singleApplied = useStorage('single-applied', false);
const groupApplied = useStorage('group-applied', false);

function resetApply() {
    singleApplied.value = false;
    groupApplied.value = false;
}

async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
    console.log(active.value);
}
</script>

<template>
    <div
        class="bg-primary-50 absolute left-1/2 top-1/2 flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg p-4 dark:bg-gray-700 dark:text-gray-200"
        v-if="
            active.sessionId === null ||
            (active.stage === 'single' && singleApplied) ||
            (active.stage === 'group' && groupApplied)
        "
    >
        <p class="p-4">
            Es ist keine Spiel-Session aktiv oder du hast dein Ergebnis bereits abgegeben. Warte auf
            die Anweisungen des Spielleiters.
        </p>
        <button
            @click="resetApply"
            class="bg-primary-500 hover:bg-primary-600 cursor-pointer rounded-md p-2 text-white"
        >
            erneut abgeben
        </button>
    </div>
    <div v-else>
        <SingleStage v-if="active.stage === 'single'" />
        <GroupStage v-if="active.stage === 'group'" />
        <ResultStage v-if="active.stage === 'results'" />
    </div>
</template>

<template>
    <div
        v-if="
            active.sessionId === null ||
            (active.stage === 'single' && singleApplied) ||
            (active.stage === 'group' && groupApplied)
        "
    >
        <ButtonRefresh
            class="bottom-1/5 absolute left-1/2 -translate-x-1/2 translate-y-1/2"
            @click="getActive"
        />

        <div
            class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg p-2 dark:text-gray-200"
        >
            <p class="text-center text-4xl dark:text-gray-300" v-if="username">
                Danke
                <span class="dark:text-secondary-400 text-secondary-600">{{ username }}</span> !
            </p>

            <p v-if="active.sessionId === null" class="p-2 text-center">
                Es ist keine Spiel-Session aktiv
            </p>
            <div class="flex flex-col items-center gap-4" v-else>
                <p class="p-2 text-center">
                    Dein Ergebnis wurde eingereicht. <br />Warte auf die Anweisungen des
                    Spielleiters.
                </p>
                <button
                    @click="resetApply"
                    class="bg-primary-500 hover:bg-primary-600 cursor-pointer rounded-md p-2 text-white"
                >
                    erneut abgeben
                </button>
            </div>
        </div>
    </div>

    <div v-else>
        <SingleStage v-if="active.stage === 'single'" />
        <GroupStage v-if="active.stage === 'group'" />
        <ResultStage v-if="active.stage === 'results'" />
    </div>
</template>

<script setup lang="ts">
import SingleStage from './stages/SingleStage.vue';
import GroupStage from './stages/GroupStage.vue';
import ResultStage from './stages/ResultStage.vue';
import { useStorage } from '@vueuse/core';
import { AxiosHelper } from '@/AxiosHelper';
import { ref } from 'vue';
import ButtonRefresh from '@/components/ButtonRefresh.vue';

const axiosHelper = new AxiosHelper();

const active = ref({ sessionId: null, stage: 'single' });
getActive();
const singleApplied = useStorage('single-applied', false);
const groupApplied = useStorage('group-applied', false);
const username = useStorage('username', '');

function resetApply() {
    singleApplied.value = false;
    groupApplied.value = false;
}

async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
}
</script>

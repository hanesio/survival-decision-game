<script setup lang="ts">
import { useStorePresets } from '@/stores/storePresets';
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';
import { AxiosHelper } from '@/AxiosHelper';

const axiosHelper = new AxiosHelper();

const storeActive = useStoreActive();
const active = storeActive.active;

const router = useRouter();

const storeSessions = useStoreSessions();

const selectedPresetId = ref(0);
const storePresets = useStorePresets();
const presets = storePresets.presets;

let items: RankItem[] = [];
const presetTitle = ref(presets[selectedPresetId.value].title);
const presetDescription = ref(presets[selectedPresetId.value].description);
getPreset();

const sessionName = ref('');
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
const year = currentDate.getFullYear();

function getPreset() {
    const output: RankItem[] = [];
    storePresets.presets[selectedPresetId.value].items.forEach((item) => {
        const outitem = reactive({
            description: item.description,
            explanation: item.explanation,
            rank: item.rank,
        });
        output.push(outitem);
    });
    items = output;
    presetTitle.value = presets[selectedPresetId.value].title;
    presetDescription.value = presets[selectedPresetId.value].description;
}

async function applySession() {
    const data = {
        sessionname: sessionName.value,
        date: currentDate,
        title: presetTitle.value,
        description: presetDescription.value,
        items,
    };
    const responseSession = await axiosHelper.post('sessions/create', data);
    console.log(responseSession);
    const sessionId = responseSession.data._id;
    const activityData = { sessionId: sessionId, stage: 'single' };
    const responseActive = await axiosHelper.post('actives/create', activityData);
    console.log(responseActive);

    router.push('/admin');
}
</script>

<template>
    <h1 class="text-6xl">NEUE SESSION</h1>
    <div class="flex items-center gap-2 py-2">
        <label for="presets">preset:</label>
        <select
            @change="getPreset"
            class="rounded bg-gray-200 p-2"
            v-model="selectedPresetId"
            name="presets"
        >
            <option class="p-4" v-for="preset in presets" :value="preset.id">
                {{ preset.title }}
            </option>
        </select>
    </div>

    <div class="mx-auto flex gap-2 rounded bg-gray-50 p-2">
        <div class="flex w-1/5 flex-col gap-2">
            <div class="flex flex-col gap-2">
                <label for="">Sessionname: </label>
                <input
                    v-model="sessionName"
                    class="w-full rounded bg-gray-200 p-2 text-2xl"
                    type="text"
                    placeholder="Sessionname"
                />
            </div>
            <div>
                <label for="">Datum:</label>
                <p class="text-2xl">{{ `${day}-${month}-${year}` }}</p>
            </div>
        </div>

        <form class="w-4/5">
            <div class="flex gap-6">
                <div class="flex w-2/3 flex-col justify-between gap-2">
                    <label for="">Gegenstände:</label>
                    <div class="flex" v-for="(item, index) in items">
                        <label class="py flex h-full w-4 justify-center rounded px-3">{{
                            index + 1
                        }}</label>
                        <div class="flex w-full gap-0.5">
                            <input
                                class="w-full rounded bg-gray-200 p-1 text-sm"
                                v-model="item.description"
                                type="text"
                            />
                            <input
                                class="w-full rounded bg-gray-100 p-1 text-xs"
                                v-model="item.explanation"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex w-1/3 flex-col gap-2">
                    <label for="title">Titel: </label>
                    <input
                        class="block w-full rounded bg-gray-200 p-2.5 text-sm"
                        v-model="presetTitle"
                    /><br />
                    <label class="" for="description">Beschreibung: </label>
                    <textarea
                        class="block h-full w-full rounded bg-gray-200 p-4 text-sm"
                        v-model="presetDescription"
                    ></textarea>

                    <div
                        @click="applySession"
                        class="mt-4 w-full rounded bg-blue-600 p-4 hover:bg-blue-500"
                    >
                        anlegen
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

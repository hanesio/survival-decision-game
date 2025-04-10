<template>
    <h1 class="py-4 text-6xl">NEUE SESSION</h1>

    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <input
                v-model="sessionName"
                class="border-b-3 flex bg-gray-50 p-2 text-2xl focus:bg-cyan-50 focus:outline-0"
                :class="[
                    showNameValidation
                        ? nameIsFree && nameIsValid
                            ? 'border-cyan-500'
                            : 'border-red-600'
                        : 'border-cyan-500',
                ]"
                type="text"
                placeholder="Sessionname eingeben"
            />
            <div
                @click="applySession"
                class="group flex cursor-pointer items-center gap-1 rounded py-3 text-gray-500 hover:text-cyan-600"
            >
                <p class="text-lg transition group-hover:font-bold">anlegen</p>
                <IconArrowRight
                    class="group-hover:translate-0 duration-50 w-8 -translate-x-2 opacity-0 transition group-hover:opacity-100"
                />
            </div>
        </div>
        <p
            v-if="showNameValidation"
            class="px-2 text-xs"
            :class="[nameIsValid && nameIsFree ? 'text-green-500' : 'text-red-600']"
        >
            {{ nameValidationMessage }}
        </p>
    </div>

    <div v-if="presets" class="mx-auto mt-2 flex flex-col gap-2 rounded bg-gray-200 p-4">
        <div class="flex gap-2">
            <select
                @change="getPreset"
                class="rounded bg-cyan-50 p-2"
                v-model="selectedPresetId"
                name="presets"
            >
                <option class="p-4" v-for="preset in presets" :value="preset._id">
                    {{ preset.title }}
                </option>
            </select>
            <div class="flex w-full justify-between">
                <div>
                    <button
                        v-if="savePresetEnabled"
                        @click="savePreset"
                        class="flex h-12 cursor-pointer items-center justify-center rounded border-2 border-cyan-600 bg-cyan-500 p-4 hover:bg-cyan-400"
                    >
                        Preset speichern
                    </button>
                    <button
                        v-else
                        class="flex h-12 items-center justify-center rounded border-2 border-transparent bg-gray-300 p-4 text-gray-400"
                    >
                        Preset speichern
                    </button>
                </div>
                <div>
                    <button
                        v-if="savePresetEnabled"
                        class="flex h-12 items-center justify-center rounded bg-gray-300 p-4 text-gray-400"
                    >
                        Preset löschen
                    </button>
                    <button
                        v-else
                        @click="deletePreset"
                        class="flex h-12 cursor-pointer items-center justify-center rounded bg-rose-300 p-4 hover:bg-rose-400"
                    >
                        Preset löschen
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div class="flex gap-2">
                <div class="flex w-2/3 flex-col justify-between gap-2 rounded-md bg-gray-300 p-2">
                    <label for="">Gegenstände:</label>
                    <div class="flex" v-for="(item, index) in items">
                        <label
                            class="py flex h-full w-4 items-center justify-center rounded px-3"
                            >{{ index + 1 }}</label
                        >
                        <div class="flex w-full gap-0.5">
                            <input
                                class="w-2/5 rounded-l bg-white p-1 px-2 text-sm"
                                v-model="item.description"
                                type="text"
                            />
                            <input
                                class="w-3/5 rounded-r bg-gray-50 p-1 px-2 text-sm"
                                v-model="item.explanation"
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <div class="flex w-1/3 flex-col gap-2">
                    <div class="flex flex-col gap-1 rounded-md bg-gray-300 p-2">
                        <label for="title">Titel: </label>
                        <input
                            class="block w-full rounded bg-white p-2 text-lg"
                            v-model="presetTitle"
                        />
                    </div>
                    <div class="flex h-full flex-col gap-1 rounded-md bg-gray-300 p-2">
                        <label class="" for="description">Beschreibung: </label>
                        <textarea
                            class="block h-full w-full rounded bg-white p-4 text-sm"
                            v-model="presetDescription"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { RankItem } from '@/types';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AxiosHelper } from '@/AxiosHelper';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

const axiosHelper = new AxiosHelper();
const router = useRouter();

const presets = ref();
const sessions = ref();

const selectedPresetId = ref('');
let items: RankItem[] = [];
const presetTitle = ref('');
const presetDescription = ref('');

start();
const sessionName = ref('');
const currentDate = new Date();
// const day = currentDate.getDate();
// const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
// const year = currentDate.getFullYear();

const showNameValidation = ref(false);

const nameIsValid = computed(() => {
    return sessionName.value.length > 0;
});
const nameIsFree = computed(() => {
    return (
        sessions.value.find((session) => session.sessionname === sessionName.value) === undefined
    );
});

const presetTitleIsValid = computed(() => {
    return presetTitle.value.length > 0;
});
const presetTitleIsFree = computed(() => {
    return presets.value.find((preset) => preset.title === presetTitle.value) === undefined;
});

const savePresetEnabled = computed(() => {
    return presetTitleIsFree.value && presetTitleIsValid.value;
});

const nameValidationMessage = computed(() => {
    if (!nameIsValid.value) return 'Gib einen Namen ein';
    if (!nameIsFree.value) return 'Der Name ist bereits vergeben';
    return 'sieht gut aus';
});

function getPreset() {
    const output: RankItem[] = [];
    presets.value
        .find((preset) => preset._id === selectedPresetId.value)
        .items.forEach((item) => {
            const outitem = reactive({
                description: item.description,
                explanation: item.explanation,
                rank: item.rank,
            });
            output.push(outitem);
        });
    items = output;
    presetTitle.value = presets.value.find((preset) => preset._id === selectedPresetId.value).title;
    presetDescription.value = presets.value.find(
        (preset) => preset._id === selectedPresetId.value,
    ).description;
}

async function applySession() {
    if (nameIsFree.value && nameIsValid.value) {
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
    } else {
        showNameValidation.value = true;
    }
}

async function savePreset() {
    const data = {
        title: presetTitle.value,
        description: presetDescription.value,
        items,
    };
    const response = await axiosHelper.post('presets/create', data);
    console.log(response);
    await getPresets();
    selectedPresetId.value = response.data._id;
}

async function deletePreset() {
    const response = await axiosHelper.get('presets/delete/' + selectedPresetId.value);
    console.log(response);
    await getPresets();
    selectedPresetId.value = presets.value[0]._id;
    getPreset();
}

async function getPresets() {
    const response = await axiosHelper.get('presets/find');
    presets.value = response.data;
    console.log(response.data);
}
async function getSessions() {
    const response = await axiosHelper.get('sessions/find');
    sessions.value = response.data;
}

async function start() {
    await getPresets();
    selectedPresetId.value = presets.value[0]._id;
    getPreset();
    getSessions();
}
</script>

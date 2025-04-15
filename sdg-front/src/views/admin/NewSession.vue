<template>
    <dialog
        ref="dialog"
        class="m-auto flex h-48 w-80 flex-col justify-between rounded-md p-4"
        :class="[dialogOpen ? 'visible' : 'invisible']"
    >
        <button
            class="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-black"
            @click="closeDialog"
        >
            <IconClose />
        </button>
        <p class="flex h-full items-center justify-center text-center">
            Möchten Sie das Preset wirklich löschen?
        </p>
        <div class="flex justify-end gap-2">
            <button
                @click="closeDialog"
                class="cursor-pointer rounded-sm border-2 border-gray-300 bg-gray-50 p-2 transition hover:bg-gray-300 active:scale-95"
            >
                abbrechen
            </button>
            <button
                @click="deletePreset"
                class="cursor-pointer rounded-sm border-2 border-rose-300 bg-rose-50 p-2 transition hover:bg-rose-400 active:scale-95"
            >
                löschen
            </button>
        </div>
    </dialog>
    <h1 class="py-4 text-6xl">NEUE SESSION</h1>

    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
            <input
                v-model="sessionName"
                class="border-b-3 focus:border-primary-500 flex bg-gray-50 p-2 text-2xl focus:outline-0"
                :class="[
                    showNameValidation
                        ? nameIsFree && nameIsValid
                            ? 'border-gray-400'
                            : 'border-rose-600'
                        : 'border-gray-400',
                ]"
                type="text"
                placeholder="Sessionname eingeben"
            />
            <div
                @click="applySession"
                class="bg-primary-700 hover:bg-primary-900 group flex cursor-pointer items-center gap-1 rounded px-4 py-2 text-white"
            >
                <p class="text-lg transition">anlegen</p>
                <IconArrowRight class="w-8 transition duration-100 group-hover:translate-x-2" />
            </div>
        </div>
        <p
            v-if="showNameValidation"
            class="px-2 text-xs"
            :class="[nameIsValid && nameIsFree ? 'text-green-500' : 'text-rose-600']"
        >
            {{ nameValidationMessage }}
        </p>
    </div>

    <div v-if="presets" class="mx-auto mt-2 flex flex-col gap-2 rounded bg-gray-200 p-4">
        <div class="flex gap-2">
            <select
                @change="getPreset"
                class="bg-primary-50 rounded p-2"
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
                        class="border-primary-500 bg-primary-50 hover:bg-primary-600 flex h-12 cursor-pointer items-center justify-center rounded border-2 p-4 hover:text-white"
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
                        @click="openDialog"
                        class="flex h-12 cursor-pointer items-center justify-center rounded border-2 border-rose-300 bg-rose-50 p-4 hover:bg-rose-400"
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
import IconClose from '@/components/icons/IconClose.vue';

const axiosHelper = new AxiosHelper();
const router = useRouter();

const presets = ref();
const sessions = ref();
const dialog = ref<HTMLDialogElement>();
const dialogOpen = ref(false);

const selectedPresetId = ref('');
let items: RankItem[] = [];
const presetTitle = ref('');
const presetDescription = ref('');

start();
const sessionName = ref('');
const currentDate = new Date();

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
    closeDialog();
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

function openDialog() {
    dialogOpen.value = true;
    dialog.value.showModal();
}
function closeDialog() {
    dialogOpen.value = false;
    dialog.value.close();
}
</script>

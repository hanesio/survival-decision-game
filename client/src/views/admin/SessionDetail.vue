<template>
    <button
        @click="router.push('/admin')"
        class="hover:text-primary-400 flex cursor-pointer gap-2 text-gray-700 dark:text-gray-400"
    >
        <IconArrowRight class="w-4 rotate-180" />
        <p>Sessions</p>
    </button>

    <div class="flex flex-col justify-between gap-2 py-2 lg:flex-row">
        <div class="flex flex-col gap-2 lg:flex-row">
            <div>
                <h1 class="text-2xl lg:text-4xl dark:text-gray-200" v-if="session">
                    {{ session.sessionname }}
                </h1>
                <h2 class="lg:text-left dark:text-gray-300">{{ formattedDate }}</h2>
            </div>
            <div class="flex justify-between gap-2">
                <Switch v-model="isActive" />
                <button
                    class="h-10 cursor-pointer self-center rounded-full border-2 border-green-600 bg-green-300 px-3 transition active:scale-90"
                    @click="exportCSV"
                >
                    CSV-Export
                </button>
            </div>
        </div>
        <button
            class="mt-10 cursor-pointer rounded-sm border-2 border-rose-300 p-2 transition hover:bg-rose-400 hover:text-black active:scale-95 lg:mt-0 dark:bg-gray-800 dark:text-rose-400"
            @click="openSessionDialog"
        >
            Session löschen
        </button>
    </div>

    <div class="flex flex-col gap-1 py-8 lg:flex-row lg:items-center lg:gap-4">
        <StageButton
            @click="setStage(Stages.Einzel)"
            :isActive="stage === 'single'"
            label="Einzelphase"
        />
        <p class="hidden text-2xl text-gray-400 lg:visible dark:text-gray-600">></p>
        <StageButton
            @click="setStage(Stages.Gruppe)"
            :isActive="stage === 'group'"
            label="Gruppenphase"
        />
        <p class="hidden text-2xl text-gray-400 lg:visible dark:text-gray-600">></p>
        <StageButton
            @click="setStage(Stages.Reflektion)"
            :isActive="stage === 'results'"
            label="Auswertung"
        />
    </div>
    <div class="flex flex-row lg:flex-col">
        <div class="flex flex-col lg:flex-row">
            <SessionTab
                :is-large="isLargeScreen"
                @click="tabindex = 0"
                :isActive="tabindex === 0"
                label="Präsentation"
            />
            <SessionTab
                @click="tabindex = 1"
                :isActive="tabindex === 1"
                label="Gruppenorganisation"
                :is-large="isLargeScreen"
            />
            <SessionTab
                @click="tabindex = 2"
                :isActive="tabindex === 2"
                label="Analyse"
                :is-large="isLargeScreen"
            />
            <SessionTab
                @click="tabindex = 3"
                :isActive="tabindex === 3"
                label="Lösung"
                :is-large="isLargeScreen"
            />
        </div>
        <div class="w-full rounded-lg rounded-tl-none bg-gray-100 p-2 lg:p-4 dark:bg-gray-800">
            <section
                v-if="tabindex === 0"
                name="presentation"
                class="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-4"
            >
                <div class="flex flex-col gap-4 lg:w-1/4 lg:p-4">
                    <p
                        class="dark:bg-secondary-400 bg-secondary-500 rounded-md p-2 text-center text-2xl"
                    >
                        {{ originURL }}
                    </p>
                    <!-- <img class="scale-130 w-full mix-blend-multiply" :src="qrcode" alt="QR Code" /> -->
                    <QRCode class="dark:text-secondary-400 text-secondary-700 w-full" />
                </div>
                <div class="lg:w-3/4 lg:p-4 lg:pr-6" v-if="session">
                    <h2
                        class="dark:decoration-secondary-400 decoration-secondary-500 pb-8 text-center text-3xl underline lg:text-left lg:text-6xl dark:text-gray-300"
                        v-html="session.title"
                    ></h2>
                    <p
                        class="text-justify lg:text-2xl dark:text-gray-300"
                        v-html="session.description"
                    ></p>
                </div>
            </section>

            <section
                v-if="tabindex === 1"
                name="group organization"
                class="flex flex-col gap-4 dark:text-gray-200"
            >
                <div v-if="loadingGroups" class="flex items-center justify-center p-4">
                    <IconSpinner class="text-primary-500 size-10 animate-spin" />
                </div>
                <div v-else class="flex flex-col gap-3">
                    <div v-if="groups">
                        <h3 class="pb-2 text-2xl">
                            <span class="text-primary-400 font-bold">{{ groups.length }} </span>
                            Gruppen
                        </h3>
                        <div
                            class="flex flex-col flex-wrap gap-4 lg:flex-row lg:items-start lg:gap-4"
                        >
                            <div
                                class="group flex flex-col rounded border border-gray-300 p-2"
                                v-for="group in groups"
                            >
                                <div class="flex items-center justify-between gap-2">
                                    <h2 class="text-3xl font-semibold">{{ group.groupname }}</h2>
                                    <ButtonTrash
                                        class="transition group-hover:opacity-100 lg:opacity-0"
                                        @click="openGroupDialog(group._id)"
                                    />
                                </div>
                                <div class="mt-1 rounded-sm bg-gray-200 p-2 dark:bg-gray-700">
                                    <draggable
                                        v-model="group.members"
                                        tag="ul"
                                        handle=".handle"
                                        animation="300"
                                        :force-fallback="true"
                                        item-key="id"
                                        group="people"
                                        @change="updateGroups"
                                    >
                                        <template #item="{ element: item }">
                                            <li>
                                                <div
                                                    class="handle mb-1 flex cursor-grab justify-between gap-2 rounded-sm bg-gray-300 p-0.5 dark:bg-gray-600"
                                                >
                                                    <button
                                                        @click="deleteFromGroup(item, group._id)"
                                                        class="w-6 shrink-0 cursor-pointer px-2 text-gray-400"
                                                    >
                                                        <IconDelete class="w-5" />
                                                    </button>
                                                    <p class="px-2 text-lg">
                                                        {{
                                                            singles.find(
                                                                (single) => single._id === item,
                                                            ).username
                                                        }}
                                                    </p>
                                                    <IconDragHandle class="mr-1 text-gray-500" />
                                                </div>
                                            </li>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                            <div class="group flex flex-col rounded border border-gray-500 p-2">
                                <div class="flex items-center gap-2">
                                    <h2 class="text-3xl text-gray-500">nicht zugeordnet</h2>
                                </div>
                                <div class="mt-1 rounded-sm bg-gray-200 p-2 dark:bg-gray-700">
                                    <draggable
                                        v-model="ungrouped"
                                        tag="ul"
                                        handle=".handle"
                                        animation="300"
                                        :force-fallback="true"
                                        item-key="id"
                                        group="people"
                                        @change="updateGroups"
                                    >
                                        <template #item="{ element: item }">
                                            <li>
                                                <div
                                                    class="handle mb-1 flex cursor-grab justify-between gap-2 rounded-sm bg-gray-300 p-0.5 dark:bg-gray-600"
                                                >
                                                    <p class="px-2 text-lg text-gray-400">
                                                        {{
                                                            singles.find(
                                                                (single) => single._id === item,
                                                            ).username
                                                        }}
                                                    </p>
                                                    <IconDragHandle class="mr-1 text-gray-500" />
                                                </div>
                                            </li>
                                        </template>
                                    </draggable>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="singles">
                        <h3 class="pb-2 text-2xl">
                            <span class="text-primary-400 font-bold">{{ singles.length }} </span>
                            Spielende
                        </h3>
                        <div class="rounded-sm bg-gray-200 p-2 dark:bg-gray-700">
                            <div v-for="single in singles" class="group flex gap-2">
                                <p class="text-lg">
                                    {{ single.username }}
                                </p>
                                <ButtonTrash
                                    class="transition group-hover:opacity-100 lg:opacity-0"
                                    @click="openSingleDialog(single)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="tabindex === 2" name="analyzation" class="dark:text-gray-300">
                <div class="flex flex-col gap-8 rounded-lg" v-if="singleData.length > 0">
                    <fieldset class="flex gap-10 rounded bg-gray-200 p-2 dark:bg-gray-900">
                        <legend class="rounded bg-gray-300 px-2 py-1 dark:bg-gray-950">
                            Einstellungen
                        </legend>
                        <div class="flex items-center gap-2">
                            <label class="text-secondary-700 dark:text-secondary-500"
                                >Abweichungstoleranz</label
                            >

                            <input
                                type="number"
                                class="rounded-xs w-14 bg-gray-100 px-2 py-1 dark:bg-gray-700"
                                name="tolerance"
                                v-model="tolerance"
                            />
                        </div>
                        <div class="flex items-center gap-2">
                            <label class="text-secondary-700 dark:text-secondary-500"
                                >Stark verbessert ab</label
                            >

                            <input
                                type="number"
                                class="rounded-xs w-14 bg-gray-100 px-2 py-1 dark:bg-gray-700"
                                name="tolerance"
                                v-model="strongThreshold"
                            />
                            <p class="text-secondary-700 dark:text-secondary-500">Punkte</p>
                        </div>
                    </fieldset>

                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div class="flex flex-col gap-4 rounded-t-md">
                            <h4 class="text-lg font-bold">Ergebnis Einzel</h4>

                            <div class="h-64 w-full">
                                <BarChart :chart_data="singleData" :tolerance />
                            </div>

                            <SummaryText type="single" :single-data="singleData" :tolerance />
                        </div>
                        <div class="flex flex-col gap-4 rounded-t-md" v-if="groupData.length > 0">
                            <h4 class="text-lg font-bold">Ergebnis Gruppen</h4>
                            <div class="h-64 w-full">
                                <BarChart :chart_data="groupData" :tolerance />
                            </div>
                            <SummaryText
                                type="group"
                                :group-data="groupData"
                                :single-data="singleData"
                                :tolerance
                            />
                        </div>
                    </div>
                    <div class="rounded-t-md" v-if="groupData.length > 0 && singlesAnonym">
                        <h4 class="py-2 text-lg font-bold">Ergebnisunterschied zur Gruppe</h4>
                        <div class="w-full">
                            <BarChartDifference :groupData :singles="singlesAnonym" />
                        </div>
                        <SummaryText
                            type="compare"
                            :single-data="singleData"
                            :group-data="groupData"
                            :strongThreshold
                        />
                    </div>
                </div>
                <div v-if="loadingComment" class="flex items-center justify-center p-4">
                    <IconSpinner class="text-primary-500 size-10 animate-spin" />
                </div>
                <div v-else class="mt-2 flex flex-col gap-1">
                    <label for="comment">Kommentar:</label>
                    <textarea
                        placeholder="Beobachtungen über die Gruppe"
                        class="h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-200"
                        name="comment"
                        v-model="comment"
                        type="text"
                    />
                    <button
                        @click="saveComment"
                        class="border-primary-500 bg-primary-50 hover:bg-primary-600 flex h-12 cursor-pointer items-center justify-center self-start rounded border-2 p-4 hover:text-white dark:bg-gray-900 dark:text-gray-200"
                    >
                        Kommentar speichern
                    </button>
                </div>
            </section>
            <section v-if="tabindex === 3" name="solution">
                <div class="overflow w-full overflow-scroll rounded-lg sm:w-full lg:overflow-clip">
                    <table class="table-auto border-collapse lg:w-full">
                        <thead>
                            <tr
                                class="bg-gray-400 text-left text-white dark:bg-gray-900 dark:text-gray-300"
                            >
                                <th>Platz</th>
                                <th>Gegenstand</th>
                                <th>Erklärung</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in session.items"
                                class="hover:bg-primary-400 dark:hover:bg-primary-900 bg-gray-50 odd:bg-gray-200 hover:text-white dark:bg-gray-600 dark:text-gray-300 dark:odd:bg-gray-700"
                            >
                                <td class="text-center">{{ item.rank + 1 }}</td>
                                <td v-html="item.description"></td>
                                <td class="break-all sm:break-normal sm:break-words">
                                    {{ item.explanation }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>

    <ModalDialog
        class="m-auto"
        @delete="deleteSession"
        @close="closeSessionDialog"
        action-button-label="Session löschen"
        text="Möchten Sie die Session wirklich löschen?"
        :dialog-open="sessionDialogOpen"
    />
    <ModalDialog
        class="m-auto"
        @delete="deleteGroup(groupToDelete)"
        @close="closeGroupDialog"
        action-button-label="Gruppe löschen"
        text="Möchten Sie die Gruppe wirklich löschen?"
        :dialog-open="groupDialogOpen"
    />
    <ModalDialog
        class="m-auto"
        @delete="deleteSingle(singleToDelete._id)"
        @close="closeSingleDialog"
        action-button-label="löschen"
        :text="`Möchten Sie ${singleToDeleteUsername} wirklich löschen?`"
        :dialog-open="singleDialogOpen"
    />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref, watch } from 'vue';
import { Single, Stages } from '@/types';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import SessionTab from '@/components/SessionTab.vue';
// import { useQRCode } from '@vueuse/integrations/useQRCode';
import { shallowRef } from 'vue';
import StageButton from '@/components/StageButton.vue';
import Switch from '@/components/Switch.vue';
import { AxiosHelper } from '@/AxiosHelper';
import ModalDialog from '@/components/ModalDialog.vue';
import QRCode from '@/components/icons/QRCode.vue';
import draggable from 'vuedraggable';
import { useMediaQuery } from '@vueuse/core';
import ButtonTrash from '@/components/ButtonTrash.vue';
import IconDragHandle from '@/components/icons/IconDragHandle.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import SummaryText from '@/components/SummaryText.vue';
import IconSpinner from '@/components/icons/IconSpinner.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

const isLargeScreen = useMediaQuery('(min-width: 1024px)');

const axiosHelper = new AxiosHelper();

const route = useRoute();
const id = route.params.id;
const router = useRouter();

const session = ref();
const active = ref();
const singles = ref();
const groups = ref();
const ungrouped = ref();
const groupToDelete = ref();
const singleToDelete = ref();
const singleToDeleteUsername = ref('');
const sessionDialogOpen = ref(false);
const groupDialogOpen = ref(false);
const singleDialogOpen = ref(false);
const tolerance = ref(30);
const strongThreshold = ref(10);

start();

const originURL = shallowRef(window.location.origin); // getting the current base URL
// const qrcode = useQRCode(originURL);
const tabindex = ref(0);

const comment = ref();

const singleData = computed(() => {
    return singles.value
        ? singles.value.map((single, index) => {
              return { x: index + 1, y: single.result, groupId: single.groupId, _id: single._id };
          })
        : undefined;
});

const singlesAnonym = computed(() => {
    return singles.value
        ? singles.value.map((single, index) => {
              return {
                  _id: single._id,
                  username: index + 1,
                  result: single.result,
                  groupId: single.groupId,
              };
          })
        : undefined;
});

const groupData = computed(() => {
    return groups.value
        ? groups.value.map((group, index) => {
              return {
                  x: 'Gruppe ' + (index + 1),
                  y: group.result,
                  _id: group._id,
                  members: group.members,
              };
          })
        : undefined;
});

const formattedDate = computed(() => {
    return session.value === undefined
        ? '-'
        : new Date(session.value.date).toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          });
});

const stage = ref('results');

const isActive = ref(false);
const loadingComment = ref();
const loadingGroups = ref();

watch(isActive, () => {
    setActiveSession();
});

async function start() {
    await getSession();
    await getActive();
    await getSingles();
    await getGroups();
    getUngrouped();
}
async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + id);
    session.value = sessionData.data;
    comment.value = session.value.comment;
}

async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
    stage.value = active.value.stage;
    isActive.value = id === active.value.sessionId;
}

async function getSingles() {
    const data = await axiosHelper.get('singles/find-by-session/' + id);
    singles.value = data.data;
    console.log(singles.value);
}

async function getGroups() {
    const data = await axiosHelper.get('groups/find-by-session/' + id);
    groups.value = data.data;
}

async function getUngrouped() {
    ungrouped.value = singles.value
        .filter((single) => single.groupId === null)
        .map((single) => single._id);
}

async function updateGroups() {
    ungrouped.value.forEach(async (id) => {
        await axiosHelper.put('singles/update/' + id, { groupId: null });
    });
    groups.value.forEach(async (group) => {
        const data = await axiosHelper.put('groups/update/' + group._id, {
            members: group.members,
        });
        group.members.forEach(async (member) => {
            await axiosHelper.put('singles/update/' + member, { groupId: group._id });
        });
    });

    router.push('#');
}

async function setActiveSession() {
    if (isActive.value) {
        const activityData = { sessionId: id, stage: stage.value };
        const responseActive = await axiosHelper.post('actives/create', activityData);
    } else {
        const activityData = { sessionId: null, stage: stage.value };
        const responseActive = await axiosHelper.post('actives/create', activityData);
    }
    localStorage.removeItem('username');
}

async function setStage(st: Stages) {
    const activityData = { sessionId: id, stage: st };
    const responseActive = await axiosHelper.post('actives/create', activityData);
    stage.value = st;
}

async function deleteSession() {
    closeSessionDialog();
    const response = axiosHelper.get('sessions/delete/' + id);
    router.push('/admin');
}
async function deleteGroup(grId: string) {
    loadingGroups.value = true;
    closeGroupDialog();
    singles.value.forEach(async (single) => {
        if (single.groupId === grId)
            await axiosHelper.put('singles/update/' + single._id, { groupId: null });
    });
    const response = await axiosHelper.get('groups/delete/' + grId);
    await getGroups();
    await getSingles();
    getUngrouped();
    loadingGroups.value = false;
}
async function deleteSingle(sId: string) {
    loadingGroups.value = true;
    closeSingleDialog();
    const response = await axiosHelper.get('singles/delete/' + sId);
    groups.value.forEach(async (group) => {
        const data = await axiosHelper.put('groups/update/' + group._id, {
            members: group.members.filter((member) => member != sId),
        });
    });

    await getSingles();
    await getGroups();
    getUngrouped();
    loadingGroups.value = false;
}

async function deleteFromGroup(sId: string, grId: string) {
    loadingGroups.value = true;
    const group = groups.value.find((group) => group._id === grId);

    const data = await axiosHelper.put('groups/update/' + grId, {
        members: group.members.filter((member) => member != sId),
    });
    await getGroups();
    let otherGroupId = null;
    groups.value.forEach((group) => {
        if (group.members.includes(sId)) {
            otherGroupId = group._id;
        }
    });

    await axiosHelper.put('singles/update/' + sId, { groupId: otherGroupId });

    await getSingles();
    getUngrouped();
    loadingGroups.value = false;
}

async function saveComment() {
    loadingComment.value = true;
    const response = await axiosHelper.put('sessions/update/' + id, { comment: comment.value });
    loadingComment.value = false;
}

function openSessionDialog() {
    sessionDialogOpen.value = true;
}
function closeSessionDialog() {
    sessionDialogOpen.value = false;
}
function openGroupDialog(id: string) {
    groupDialogOpen.value = true;
    groupToDelete.value = id;
}
function openSingleDialog(single: Single) {
    singleDialogOpen.value = true;
    singleToDelete.value = single;
    singleToDeleteUsername.value = single.username;
}
function closeGroupDialog() {
    groupDialogOpen.value = false;
}
function closeSingleDialog() {
    singleDialogOpen.value = false;
}

function exportCSV() {
    let data = [];
    data.push({ Name: '---EINZEL---', Ergebnis: '', Gruppe: '', Unterschied: '' });
    singles.value.forEach((single) => {
        const name = single.username;
        const result = single.result;
        let groupname;
        let difference;

        if (groups.value.find((group) => group._id === single.groupId) != undefined) {
            groupname = groups.value.find((group) => group._id === single.groupId).groupname;
            difference =
                single.result - groups.value.find((group) => group._id === single.groupId).result;
        } else {
            groupname = '';
            difference = '';
        }
        data.push({ Name: name, Ergebnis: result, Gruppe: groupname, Unterschied: difference });
    });

    data.push({ Name: '---GRUPPEN---', Ergebnis: '', Gruppe: '', Unterschied: '' });
    groups.value.forEach((group) => {
        const name = group.groupname;
        const result = group.result;
        data.push({ Name: name, Ergebnis: result, Gruppe: '', Unterschied: '' });
    });

    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export_data.csv');
    link.click();
}

function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const rows = data.map((obj) => headers.map((header) => obj[header]));
    const headerRow = headers.join(';');
    const csvRows = [headerRow, ...rows.map((row) => row.join(';'))];
    return csvRows.join('\n');
}
</script>

<style>
td,
th {
    padding: 8px 16px;
}
@media (max-width: 500px) {
    td,
    th {
        padding: 2px 4px;
    }
}
</style>

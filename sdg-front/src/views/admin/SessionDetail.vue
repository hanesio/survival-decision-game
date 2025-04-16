<template>
    <div class="flex items-center justify-between py-2">
        <div class="flex items-end gap-2">
            <h1 class="text-4xl dark:text-gray-300" v-if="session">{{ session.sessionname }}</h1>

            <Switch v-model="isActive" />
        </div>

        <button
            class="cursor-pointer rounded-sm border-2 border-rose-300 p-2 transition hover:bg-rose-400 hover:text-black active:scale-95 dark:bg-gray-800 dark:text-rose-400"
            @click="openDialog"
        >
            Session löschen
        </button>
    </div>
    <h2 class="dark:text-gray-300">{{ formattedDate }}</h2>

    <div class="flex flex-col items-center gap-4 py-8 lg:flex-row">
        <StageButton
            @click="setStage(Stages.Einzel)"
            :isActive="stage === 'single'"
            label="Einzelphase"
        />
        <p class="text-2xl text-gray-400 dark:text-gray-600">></p>
        <StageButton
            @click="setStage(Stages.Gruppe)"
            :isActive="stage === 'group'"
            label="Gruppenphase"
        />
        <p class="text-2xl text-gray-400 dark:text-gray-600">></p>
        <StageButton
            @click="setStage(Stages.Reflektion)"
            :isActive="stage === 'results'"
            label="Auswertung"
        />
    </div>

    <div class="flex">
        <SessionTab @click="tabindex = 0" :isActive="tabindex === 0" label="Präsentation" />
        <SessionTab @click="tabindex = 1" :isActive="tabindex === 1" label="Analyse" />
        <SessionTab @click="tabindex = 2" :isActive="tabindex === 2" label="Lösung" />
    </div>
    <div class="b rounded-lg rounded-tl-none bg-gray-100 p-4 dark:bg-gray-800">
        <section
            v-if="tabindex === 0"
            name="presentation"
            class="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-4"
        >
            <div class="flex flex-col gap-4 p-4 lg:w-1/4">
                <p class="bg-blue-400 py-2 text-center text-2xl">{{ originURL }}</p>
                <img class="scale-130 w-full mix-blend-multiply" :src="qrcode" alt="QR Code" />
            </div>
            <div class="w-3/4 p-4 pr-6" v-if="session">
                <h2 class="pb-8 text-6xl underline decoration-blue-400">
                    {{ session.title }}
                </h2>
                <p class="text-justify text-2xl">{{ session.description }}</p>
            </div>
        </section>

        <section v-if="tabindex === 1" name="analyzation">
            <div
                class="mt-2 flex flex-col gap-8 rounded-lg p-4 dark:text-gray-300"
                v-if="singleData.length > 0"
            >
                <div class="rounded-t-md">
                    <h4 class="px-4 py-2 text-lg">Ergebnis Einzel</h4>
                    <div class="h-64 w-full p-4"><BarChart :chart_data="singleData" /></div>
                </div>
                <div class="rounded-t-md" v-if="groupData.length > 0">
                    <h4 class="px-4 py-2 text-lg">Ergebnis Gruppen</h4>
                    <div class="h-64 w-full p-4"><BarChart :chart_data="groupData" /></div>
                </div>
                <div class="rounded-t-md" v-if="groupData.length > 0">
                    <h4 class="px-4 py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
                    <div class="w-full p-4"><BarChartDifference :groupData :singleData /></div>

                    <div class="flex flex-col">
                        <label for="comment">Kommentar:</label>
                        <textarea
                            placeholder="Beobachtungen über die Gruppe"
                            class="h-24 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-200"
                            name="comment"
                            v-model="comment"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section v-if="tabindex === 2" name="solution">
            <div class="overlow overflow-clip rounded-lg">
                <table class="w-full table-auto border-collapse">
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
                            class="hover:bg-primary-400 dark:hover:bg-primary-900 gap-4 bg-gray-50 odd:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:odd:bg-gray-700"
                        >
                            <td class="text-center">{{ item.rank + 1 }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.explanation }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
    <dialog
        :class="[dialogOpen ? 'visible' : 'invisible']"
        ref="dialog"
        class="relative m-auto flex h-48 w-80 flex-col justify-between rounded-md p-4"
    >
        <button
            class="absolute right-2 top-2 cursor-pointer p-2 text-gray-500 hover:text-black"
            @click="closeDialog"
        >
            <IconClose />
        </button>
        <p class="flex h-full items-center justify-center text-center">
            Möchten Sie die Session wirklich löschen?
        </p>
        <div class="flex justify-end gap-2">
            <button
                @click="closeDialog"
                class="cursor-pointer rounded-sm bg-gray-200 p-2 transition hover:bg-gray-300 active:scale-95"
            >
                abbrechen
            </button>
            <button
                @click="deleteSession"
                class="cursor-pointer rounded-sm border-2 border-rose-300 bg-rose-50 p-2 transition hover:bg-rose-400 active:scale-95"
            >
                löschen
            </button>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { Stages } from '@/types';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import SessionTab from '@/components/SessionTab.vue';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { shallowRef } from 'vue';
import StageButton from '@/components/StageButton.vue';
import Switch from '@/components/Switch.vue';
import { AxiosHelper } from '@/AxiosHelper';
import IconClose from '@/components/icons/IconClose.vue';

const axiosHelper = new AxiosHelper();

const route = useRoute();
const id = route.params.id;
const router = useRouter();

const session = ref();
const active = ref();
const singles = ref();
const groups = ref();
const dialog = ref<HTMLDialogElement>();
const dialogOpen = ref(false);

getSession();
getActive();
getSingles();
getGroups();

const originURL = shallowRef(window.location.origin); // getting the current base URL
const qrcode = useQRCode(originURL);
const tabindex = ref(0);

const comment = ref('');

const singleData = computed(() => {
    return singles.value
        ? singles.value.map((single) => {
              return { x: single.username, y: single.result, groupId: single.groupId };
          })
        : undefined;
});

const groupData = computed(() => {
    console.log(groups.value);
    return groups.value
        ? groups.value.map((group) => {
              return { x: group.groupname, y: group.result, _id: group._id };
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

watch(isActive, () => {
    setActiveSession();
});

async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + id);
    session.value = sessionData.data;
    console.log(session.value);
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
    console.log(groups.value);
}

async function setActiveSession() {
    if (isActive.value) {
        const activityData = { sessionId: id, stage: stage.value };
        const responseActive = await axiosHelper.post('actives/create', activityData);
    } else {
        const activityData = { sessionId: null, stage: stage.value };
        const responseActive = await axiosHelper.post('actives/create', activityData);
    }
}

async function setStage(st: Stages) {
    const activityData = { sessionId: id, stage: st };
    const responseActive = await axiosHelper.post('actives/create', activityData);
    stage.value = st;
}

async function deleteSession() {
    closeDialog();
    const response = axiosHelper.get('sessions/delete/' + id);
    console.log(response);
    router.push('/admin');
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

<style>
td,
th {
    padding: 8px 16px;
}
</style>

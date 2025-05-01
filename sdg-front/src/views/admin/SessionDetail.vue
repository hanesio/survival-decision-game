<template>
    <div class="flex flex-col justify-between gap-2 py-2 lg:flex-row">
        <div class="flex gap-2 lg:items-end">
            <div>
                <h1 class="text-2xl lg:text-4xl dark:text-gray-200" v-if="session">
                    {{ session.sessionname }}
                </h1>
                <h2 class="lg:text-left dark:text-gray-300">{{ formattedDate }}</h2>
            </div>
            <Switch v-model="isActive" />
        </div>
        <button
            class="cursor-pointer rounded-sm border-2 border-rose-300 p-2 transition hover:bg-rose-400 hover:text-black active:scale-95 dark:bg-gray-800 dark:text-rose-400"
            @click="openDialog"
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

    <div class="flex">
        <SessionTab @click="tabindex = 0" :isActive="tabindex === 0" label="Präsentation" />
        <SessionTab @click="tabindex = 1" :isActive="tabindex === 1" label="Gruppenorganisation" />
        <SessionTab @click="tabindex = 2" :isActive="tabindex === 2" label="Analyse" />
        <SessionTab @click="tabindex = 3" :isActive="tabindex === 3" label="Lösung" />
    </div>
    <div class="rounded-lg rounded-tl-none bg-gray-100 lg:p-4 dark:bg-gray-800">
        <section
            v-if="tabindex === 0"
            name="presentation"
            class="flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-4"
        >
            <div class="flex flex-col gap-4 lg:w-1/4 lg:p-4">
                <p
                    class="dark:bg-secondary-400 bg-secondary-500 rounded-md py-2 text-center text-2xl"
                >
                    {{ originURL }}
                </p>
                <!-- <img class="scale-130 w-full mix-blend-multiply" :src="qrcode" alt="QR Code" /> -->
                <QRCode class="dark:text-secondary-400 text-secondary-500 w-full" />
            </div>
            <div class="lg:w-3/4 lg:p-4 lg:pr-6" v-if="session">
                <h2
                    class="dark:decoration-secondary-400 decoration-secondary-500 pb-8 text-center text-3xl underline lg:text-left lg:text-6xl dark:text-gray-300"
                >
                    {{ session.title }}
                </h2>
                <p class="text-justify lg:text-2xl dark:text-gray-300">{{ session.description }}</p>
            </div>
        </section>
        <section v-if="tabindex === 1" name="group organization" class="dark:text-gray-200">
            <div
                class="flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:gap-4"
                v-if="groups"
            >
                <div
                    class="flex flex-col rounded border border-gray-300 p-2"
                    v-for="group in groups"
                >
                    <h2 class="text-3xl font-semibold">{{ group.groupname }}</h2>
                    <div class="mt-1 rounded-sm bg-gray-200 p-2 dark:bg-gray-700">
                        <p class="text-lg" v-for="member in group.members">
                            {{ singles.find((single) => single._id === member).username }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="singles">
                <div class="rounded-sm bg-gray-200 p-2 dark:bg-gray-700">
                    <p class="text-lg" v-for="single in singles">
                        {{ single.username }}
                    </p>
                </div>
            </div>
        </section>

        <section v-if="tabindex === 2" name="analyzation">
            <div
                class="flex flex-col gap-8 rounded-lg dark:text-gray-300"
                v-if="singleData.length > 0"
            >
                <div class="grid grid-cols-2">
                    <div class="rounded-t-md">
                        <h4 class="py-2 text-lg">Ergebnis Einzel</h4>
                        <div class="h-64 w-full"><BarChart :chart_data="singleData" /></div>
                    </div>
                    <div class="rounded-t-md" v-if="groupData.length > 0">
                        <h4 class="py-2 text-lg">Ergebnis Gruppen</h4>
                        <div class="h-64 w-full"><BarChart :chart_data="groupData" /></div>
                    </div>
                </div>
                <div class="rounded-t-md" v-if="groupData.length > 0">
                    <h4 class="py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
                    <div class="w-full"><BarChartDifference :groupData :singleData /></div>

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
        <section v-if="tabindex === 3" name="solution">
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
    <ModalDialog
        class="m-auto"
        @delete="deleteSession"
        @close="closeDialog"
        action-button-label="Session löschen"
        text="Möchten Sie die Session wirklich löschen?"
        :dialog-open="dialogOpen"
    />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { Stages } from '@/types';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import SessionTab from '@/components/SessionTab.vue';
// import { useQRCode } from '@vueuse/integrations/useQRCode';
import { shallowRef } from 'vue';
import StageButton from '@/components/StageButton.vue';
import Switch from '@/components/Switch.vue';
import { AxiosHelper } from '@/AxiosHelper';
import IconClose from '@/components/icons/IconClose.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import QRCode from '@/components/icons/QRCode.vue';

const axiosHelper = new AxiosHelper();

const route = useRoute();
const id = route.params.id;
const router = useRouter();

const session = ref();
const active = ref();
const singles = ref();
const groups = ref();
const dialogOpen = ref(false);

start();

const originURL = shallowRef(window.location.origin); // getting the current base URL
// const qrcode = useQRCode(originURL);
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

async function start() {
    await getSession();
    await getActive();
    await getSingles();
    await getGroups();
}
async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + id);
    session.value = sessionData.data;
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
    localStorage.removeItem('username');
}

async function setStage(st: Stages) {
    const activityData = { sessionId: id, stage: st };
    const responseActive = await axiosHelper.post('actives/create', activityData);
    stage.value = st;
}

async function deleteSession() {
    closeDialog();
    const response = axiosHelper.get('sessions/delete/' + id);
    router.push('/admin');
}

function openDialog() {
    dialogOpen.value = true;
    // dialog.value.showModal();
}
function closeDialog() {
    dialogOpen.value = false;
    // dialog.value.close();
}
</script>

<style>
td,
th {
    padding: 8px 16px;
}
</style>

<template>
    <article class="border-primary-500 flex flex-col border-l-4 px-4">
        <h3 class="text-xl dark:text-gray-400">{{ session?.title }}</h3>
        <h2 class="text-4xl lg:text-6xl dark:text-gray-200">Auswertung</h2>
    </article>

    <div class="mt-6 flex gap-8">
        <section class="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 dark:text-gray-200">
            <div class="flex items-center gap-1">
                <div
                    v-if="user"
                    class="flex h-full w-1/2 flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-800"
                >
                    <h3 class="p-2 text-4xl">{{ user.username }}</h3>
                    <p
                        class="text-primary-500 dark:text-primary-400 dark:text-primary-400 text-8xl font-light"
                    >
                        {{ user.result }}
                    </p>
                    <p class="text-primary-500 dark:text-primary-400">Punkte Abstand</p>
                </div>
                <div class="grid h-full w-1/2 grid-cols-2 gap-1">
                    <div
                        v-if="group"
                        class="flex flex-col items-center rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                    >
                        <p class="h-12">{{ group.groupname }}</p>
                        <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                            {{ group.result }}
                        </p>
                    </div>
                    <div
                        v-if="group"
                        class="flex flex-col items-center rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                    >
                        <p class="h-12">Differenz Gruppe</p>
                        <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                            {{ user.result - group.result }}
                        </p>
                    </div>
                    <div
                        class="flex flex-col items-center rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                    >
                        <p class="h-12">Durchschnitt Spieler</p>
                        <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                            {{ averageSingles }}
                        </p>
                    </div>
                    <div
                        class="flex flex-col items-center rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                    >
                        <p class="h-12">Durchschnitt Gruppen</p>
                        <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                            {{ averageGroups }}
                        </p>
                    </div>
                </div>
            </div>
            <div v-if="user" class="border-primary-500 rounded-lg border p-4">
                <h4 class="px-4 py-2 text-lg">Vergleich Einzel</h4>
                <div class="h-64 w-full p-4"><BarChart :chart_data="singleData" /></div>
            </div>
            <div v-if="group" class="border-primary-500 rounded-lg border p-4">
                <h4 class="px-4 py-2 text-lg">Vergleich Gruppen</h4>
                <div class="h-64 w-full p-4"><BarChart :chart_data="groupData" /></div>
            </div>
            <div v-if="group" class="border-primary-500 rounded-lg border p-4">
                <h4 class="px-4 py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
                <div class="w-full p-4">
                    <BarChartDifference :groupData="groupDifference" :singleData />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import { AxiosHelper } from '@/AxiosHelper';
import { ref } from 'vue';

const axiosHelper = new AxiosHelper();
const route = useRoute();
const username = route.params.username;

const active = ref();
const session = ref(undefined);
const singles = ref();
const groups = ref();
const singleData = ref();
const yValuesSingles = ref();
const averageSingles = ref();
const user = ref();
const groupData = ref();
const groupDifference = ref();
const yValuesGroups = ref();
const averageGroups = ref();
const group = ref();

start();

async function start() {
    await handleRequests();
    handleSingle();
    handleGroup();
}

function handleSingle() {
    singleData.value = singles.value.map((single) => {
        return {
            x: single.username === username ? username : '',
            y: single.result,
            groupId: single.groupId,
        };
    });
    yValuesSingles.value = singleData.value.map((data) => data.y);
    averageSingles.value =
        Math.floor(
            (yValuesSingles.value.reduce((a, b) => a + b) / yValuesSingles.value.length) * 10,
        ) / 10;

    user.value = singles.value.find((single) => single.username === username);
}

function handleGroup() {
    groupData.value = groups.value.map((group) => {
        return {
            x: group._id === user.value.groupId ? group.groupname : '',
            y: group.result,
            _id: group._id,
        };
    });

    groupDifference.value = groupData.value.filter((group) => group._id === user.value.groupId);

    yValuesGroups.value = groupData.value.map((data) => data.y);
    averageGroups.value =
        Math.floor(
            (yValuesGroups.value.reduce((a, b) => a + b) / yValuesGroups.value.length) * 10,
        ) / 10;

    group.value = groups.value.find((group) => user.value.groupId === group._id);
}

async function handleRequests() {
    await getActive();
    await getSession();
    await getSinglesBySession();
    await getGroupsBySession();
}

async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
}
async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + active.value.sessionId);
    session.value = sessionData.data;
}
async function getSinglesBySession() {
    const data = await axiosHelper.get('singles/find-by-session/' + active.value.sessionId);
    singles.value = data.data;
}
async function getGroupsBySession() {
    const data = await axiosHelper.get('groups/find-by-session/' + active.value.sessionId);
    groups.value = data.data;
}
</script>

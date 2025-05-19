<template>
    <article class="border-primary-500 flex flex-col border-l-4 px-4">
        <h3 class="text-xl dark:text-gray-400">{{ session?.title }}</h3>
        <h2 class="text-4xl lg:text-6xl dark:text-gray-200">Auswertung</h2>
    </article>
    <div v-if="user">
        <div class="mt-6 flex gap-8">
            <section class="grid w-full grid-cols-1 gap-2 lg:grid-cols-2 dark:text-gray-200">
                <div class="flex flex-col items-center gap-1 lg:flex-row">
                    <div
                        v-if="user"
                        class="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-50 p-4 text-center lg:w-1/2 dark:bg-gray-800"
                    >
                        <h3 class="dark:text-secondary-500 text-secondary-600 p-2 text-4xl">
                            {{ user.username }}
                        </h3>
                        <p
                            class="text-primary-500 dark:text-primary-400 text-6xl font-light lg:text-8xl"
                        >
                            {{ user.result }}
                        </p>
                        <p class="text-primary-500 dark:text-primary-400">Punkte Abstand</p>
                    </div>
                    <div class="grid h-full w-full grid-cols-2 gap-1 lg:w-1/2">
                        <div
                            v-if="group"
                            class="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                        >
                            <p>
                                Gruppe
                                <span class="dark:text-secondary-500 text-secondary-600">{{
                                    group.groupname
                                }}</span>
                            </p>
                            <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                                {{ group.result }}
                            </p>
                            <div></div>
                        </div>
                        <div
                            v-if="group"
                            class="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                        >
                            <p>Unterschied zur Gruppe</p>
                            <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                                {{ difference > 0 ? '+' + difference : difference }}
                            </p>
                            <div></div>
                        </div>
                        <div
                            class="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                        >
                            <p>Durchschnitt aller Spielenden</p>
                            <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                                {{ averageSingles }}
                            </p>
                            <div></div>
                        </div>
                        <div
                            class="flex flex-col items-center justify-between rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800"
                        >
                            <p class="h-12">Durchschnitt Gruppen</p>
                            <p class="text-primary-500 dark:text-primary-400 p-2 text-3xl">
                                {{ averageGroups }}
                            </p>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-if="user" class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <h4 class="px-4 py-2 text-lg">Vergleich Einzel</h4>
                    <div class="lg:p-4"><BarChart :chart_data="singleData" /></div>
                </div>
                <div v-if="group" class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <h4 class="px-4 py-2 text-lg">Vergleich Gruppen</h4>
                    <div class="lg:p-4"><BarChart :chart_data="groupData" /></div>
                </div>
                <div
                    v-if="group && singlesAnonym"
                    class="rounded-lg bg-gray-50 lg:p-4 dark:bg-gray-800"
                >
                    <h4 class="px-4 py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
                    <div class="p-4">
                        <BarChartDifference
                            :groupData="groupDifference"
                            :singles="singlesAnonym"
                            :is-anonymous="false"
                        />
                    </div>
                </div>
            </section>
        </div>
        <section
            v-if="user"
            class="mt-2 flex flex-col rounded-lg bg-gray-50 p-4 dark:bg-gray-800 dark:text-gray-200"
        >
            <h4 class="px-4 py-2 text-lg">Ergebnisberechnung</h4>
            <div class="flex flex-col gap-1 p-1 text-sm dark:text-gray-200">
                <div
                    v-for="(item, index) in user.items"
                    class="00 grid grid-cols-[16px_48px_1fr] gap-3 rounded-full px-2 py-1.5"
                    :class="[
                        item.rank === index
                            ? 'bg-gray-200 dark:bg-gray-700'
                            : 'bg-gray-100 dark:bg-gray-900',
                    ]"
                >
                    <p class="flex w-6 items-center justify-center font-bold">{{ index + 1 }}</p>
                    <p
                        class="flex items-center text-center"
                        :class="[
                            item.rank === index
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-rose-400 dark:text-rose-700',
                        ]"
                    >
                        <span class="font-bold"> {{ item.rank + 1 }} </span> &nbsp;
                        <span>{{ ' (' + Math.abs(item.rank - index) + 'P)' }}</span>
                    </p>
                    <p v-html="item.description"></p>
                </div>
            </div>
        </section>
    </div>
    <div
        v-else
        class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-xl dark:text-gray-200"
    >
        <IconClose class="size-10 text-rose-500" />
        <p>
            <span class="text-rose-500">{{ username }}</span> nicht gefunden
        </p>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import { AxiosHelper } from '@/AxiosHelper';
import { computed, ref } from 'vue';
import { useTitle } from '@vueuse/core';
import IconClose from '@/components/icons/IconClose.vue';

const axiosHelper = new AxiosHelper();
const route = useRoute();
const username = route.params.username;

const active = ref();
const session = ref(undefined);
const singles = ref();
const title = useTitle();

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
const difference = ref();
const singlesAnonym = computed(() => {
    return singles.value
        ? singles.value.map((single, index) => {
              return {
                  _id: single._id,
                  username: single.username === username ? username : index + 1,
                  result: single.result,
                  groupId: single.groupId,
              };
          })
        : undefined;
});

start();

async function start() {
    await handleRequests();
    await handleSingle();
    if (user.value) {
        await handleGroup();
    }
}

function handleSingle() {
    singleData.value = singles.value.map((single, index) => {
        return {
            x: single.username === username ? username : index + 1,
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
    groupData.value = groups.value.map((group, index) => {
        return {
            x: group._id === user.value.groupId ? group.groupname : index + 1,
            y: group.result,
            _id: group._id,
            members: group.members,
        };
    });

    groupDifference.value = groupData.value.filter((group) =>
        group.members.includes(user.value._id),
    );

    yValuesGroups.value = groupData.value.map((data) => data.y);
    averageGroups.value =
        Math.floor(
            (yValuesGroups.value.reduce((a, b) => a + b) / yValuesGroups.value.length) * 10,
        ) / 10;

    group.value = groups.value.find((group) => group.members.includes(user.value._id));
    difference.value = user.value.result - group.value.result;
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
    title.value = session.value.title + ' | Auswertung';
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

<template>
    <h1 class="py-4 text-4xl dark:text-gray-200">ADMIN DASHBOARD</h1>
    <div class="mt-4 flex flex-wrap gap-2">
        <div
            @click="router.push('/admin/new-session')"
            class="lg:w-74 hover:scale-102 hover:bg-primary-950 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-200 text-gray-700 transition hover:text-gray-200 dark:bg-gray-800 dark:text-gray-400"
        >
            <p class="text-6xl">+</p>
            <p class="text-xl">NEUE SESSION</p>
        </div>
        <SessionCard
            v-if="active && singles && groups"
            @click="openSession(session._id)"
            v-for="session in sessions.slice().reverse()"
            :name="session.sessionname"
            :date="session.date"
            :is-active="active.sessionId === session._id"
            :group-count="groups.filter((group) => group.sessionId === session._id).length"
            :singles-count="singles.filter((single) => single.sessionId === session._id).length"
        />
    </div>
</template>

<script setup lang="ts">
import SessionCard from '@/components/SessionCard.vue';
import { useRouter } from 'vue-router';
import { AxiosHelper } from '@/AxiosHelper';
import { ref } from 'vue';

const axiosHelper = new AxiosHelper();

const router = useRouter();

let sessions = ref([]);
const active = ref();
const singles = ref();
const groups = ref();

getActive(); // Reihenfolge ist wichtig
getSessions();
getSingles();
getGroups();

async function getSessions() {
    const sessionData = await axiosHelper.get('sessions/find');
    sessions.value = sessionData.data;
}
async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
}

async function getSingles() {
    const data = await axiosHelper.get('singles/find');
    singles.value = data.data;
}

async function getGroups() {
    const data = await axiosHelper.get('groups/find');
    groups.value = data.data;
}
function openSession(id: number) {
    router.push(`/admin/sessions/${id}`);
}
</script>

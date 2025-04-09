<script setup lang="ts">
import SessionCard from '@/components/SessionCard.vue';
import { useRouter } from 'vue-router';
import { AxiosHelper } from '@/AxiosHelper';
import { ref } from 'vue';

const axiosHelper = new AxiosHelper();

const router = useRouter();

let sessions = ref([]);
const active = ref();

getActive(); // Reihenfolge ist wichtig
getSessions();

async function getSessions() {
    const sessionData = await axiosHelper.get('sessions/find');
    sessions.value = sessionData.data;
}
async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
}

function openSession(id: number) {
    router.push(`/admin/sessions/${id}`);
}
</script>

<template>
    <h1 class="text-4xl">ADMIN DASHBOARD</h1>
    <div class="mt-4 flex flex-wrap gap-2">
        <div
            @click="router.push('/admin/new-session')"
            class="lg:w-74 hover:scale-102 flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-cyan-400 transition hover:bg-cyan-300"
        >
            <p class="text-6xl">+</p>
            <p class="text-xl">NEUE SESSION</p>
        </div>
        <SessionCard
            @click="openSession(session._id)"
            v-for="session in sessions.slice().reverse()"
            :name="session.sessionname"
            :date="session.date"
            :is-active="active.sessionId === session._id"
        />
    </div>
</template>

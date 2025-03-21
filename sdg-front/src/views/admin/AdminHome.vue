<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import SessionCard from '@/components/SessionCard.vue';
import { useStoreActive } from '@/stores/storeActive';
import {  useRouter } from 'vue-router';

const router = useRouter();

const storeSessions = useStoreSessions()
const sessions = storeSessions.sessions

const storeActive = useStoreActive()
const active = storeActive.active

function openSession(id:number){
router.push(`/admin/sessions/${id}`)
}
</script>

<template>
  <h1 class="text-4xl">ADMIN DASHBOARD</h1>
  <div class="flex flex-wrap gap-2 mt-4">
    <div @click="router.push('/admin/new-session')" class="h-40 cursor-pointer w-full lg:w-64 flex-col border-dashed border-2 rounded-2xl flex items-center justify-center"><p class="text-6xl">+</p><p class="text-xl">NEUE SESSION</p></div>
    <SessionCard @click="openSession(session.id)" v-for="session in sessions" :name="session.name" :date="session.date" :is-active="active.sessionId === session.id"/>

  </div>
  
</template>

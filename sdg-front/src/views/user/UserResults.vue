<template>
  <article class="flex flex-col border-l-4 px-4 border-cyan-500 ">
    <h3 class=" text-xl">{{ session?.title }}</h3>
    <h2 class="  text-6xl ">Auswertung</h2>
  </article>

  <div class="flex  gap-8 mt-6">
  <section class="grid grid-cols-1 w-full lg:grid-cols-2 gap-2">
    <div class="  flex gap-1 items-center ">
      <div class="w-1/2 h-full flex flex-col items-center justify-center rounded-lg p-4  bg-gray-50  text-center">
        <h3 class=" text-4xl p-2">{{ user.username }}</h3>
        <p class="text-8xl font-light  text-cyan-500">{{ user.result }}</p>
        <p class="   text-cyan-500">Punkte Abstand</p>
      </div>
      <div class="grid grid-cols-2 gap-1 w-1/2 h-full">
        <div v-if="group" class=" rounded-lg p-3 flex items-center flex-col bg-gray-50  text-center">
          <p  class="h-12">{{ group.groupname }}</p>
          <p class=" text-cyan-500 text-3xl p-2">{{ group.result }}</p>
        </div>
        <div v-if="group" class=" rounded-lg p-3 flex items-center flex-col bg-gray-50  text-center">
          <p class="h-12">Differenz Gruppe</p>
          <p class=" text-cyan-500 text-3xl p-2">{{ user.result - group.result }}</p>
        </div>
        <div class=" rounded-lg p-3 flex items-center flex-col bg-gray-50  text-center">
          <p class="h-12">Durchschnitt Spieler</p>
          <p class=" text-cyan-500 text-3xl p-2">{{ averageSingles }}</p>
        </div>
        <div class=" rounded-lg p-3 flex items-center flex-col bg-gray-50  text-center">
          <p class="h-12">Durchschnitt Gruppen</p>
          <p class=" text-cyan-500 text-3xl p-2">{{ averageGroups }}</p>
        </div>
      </div>


  </div>
      <div class="rounded-lg p-4 border border-cyan-500">
          <h4 class="px-4 py-2 text-lg">Vergleich Einzel</h4>
          <div class="h-64 w-full p-4"><BarChart :chart_data="singleData" /></div>
      </div>
      <div v-if="group" class="rounded-lg p-4 border border-cyan-500">
          <h4 class="px-4 py-2 text-lg">Vergleich Gruppen</h4>
          <div class="h-64 w-full p-4"><BarChart :chart_data="groupData" /></div>
      </div>
      <div v-if="group" class="rounded-lg p-4 border border-cyan-500">
          <h4 class="px-4 py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
          <div class="w-full p-4"><BarChartDifference :groupData :singleData /></div>
      </div>

        </section>
  </div>

</template>

<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import {  useRoute } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';
import { useStoreGroups } from '@/stores/storeGroups';
import { useStoreSingles } from '@/stores/storeSingles';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';



const route = useRoute();
const username = route.params.username;
const storeActive = useStoreActive()
const active = storeActive.active
const storeSessions = useStoreSessions()
const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)


const storeSingles = useStoreSingles()
const singles = storeSingles.singles.filter((single) => single.sessionId === active.sessionId);
const singleData = singles.map((single) => {
    return { x: single.username === username? username : '', y: single.result, groupId: single.groupId };
});
const yValuesSingles = singleData.map((data)=>data.y)
const averageSingles = (Math.floor((yValuesSingles.reduce((a, b) => a + b) / yValuesSingles.length)*10))/10

const user = storeSingles.singles.find((single)=>single.username === username)

const storeGroups = useStoreGroups();
const groups = storeGroups.groups.filter((single) => single.sessionId === active.sessionId);
const groupData = groups.map((group) => {
    return { x: group.id===user.groupId? group.groupname : '', y: group.result, groupId: group.id };
});
const yValuesGroups = groupData.map((data)=>data.y)
const averageGroups = (Math.floor((yValuesGroups.reduce((a, b) => a + b) / yValuesGroups.length)*10))/10

const group =  storeGroups.groups.find((group)=>user.groupId === group.id)
</script>



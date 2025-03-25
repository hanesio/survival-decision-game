<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import SessionCard from '@/components/SessionCard.vue';
import { useStoreActive } from '@/stores/storeActive';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import {Stages } from '@/types';
import { useStoreSingles } from '@/stores/storeSingles';
import { useStoreGroups } from '@/stores/storeGroups';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';

const router = useRouter();
const route = useRoute()
let id = Number(route.params.id);

const storeSessions = useStoreSessions()
const sessions = storeSessions.sessions
const session = sessions.find((session)=>session.id === id)
const comment = ref("")

const storeSingles = useStoreSingles()
const singles = storeSingles.singles.filter((single)=>single.sessionId===id)
const singleData = singles.map((single)=>{return {x: single.username, y: single.result, groupId:single.groupId}})

const storeGroups = useStoreGroups()
const groups = storeGroups.groups.filter((single)=>single.sessionId===id)
const groupData = groups.map((group)=>{return {x: group.groupname, y: group.result, groupId:group.id}})

const name = session === undefined? "no session found" : session.name
const formattedDate = session === undefined? "-" : session.date.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const storeActive = useStoreActive()
const active = storeActive.active
const stage = ref(active.stage)

const stages = Object.values(Stages).slice(0,3)

function activateSession(){
  storeActive.setActiveSession(id)
}
function deactivateSession(){
  storeActive.setActiveSession(null)
}
function setStage(){
  storeActive.setStage(stage.value)
}

</script>

<template>
  <div class="flex gap-2 py-2">
    <h1 class="text-4xl">{{name}}</h1> 
    <div v-if="id !== active.sessionId" @click="activateSession" class="w-20 justify-center cursor-pointer flex border-2 border-transparent bg-blue-200 p-2 rounded-xl items-center">aktivieren</div>
    <div v-else @click="deactivateSession" class="w-20 justify-center cursor-pointer flex border-2 border-green-600 bg-green-300 p-2 rounded-xl items-center">aktiv</div>
  </div>
  <h2>{{ formattedDate }}</h2>

  <div class="py-4 mt-6 flex gap-2 items-center">
    <label for="stageSelect">Stufe:</label>
    <select name="stageSelect" @change="setStage" class="bg-gray-200 rounded p-2" v-model="stage">
          <option class="p-4" v-for="key in stages" :value="key">{{ key}}</option>
        </select>
  </div>
  

  <section>
    <h3 class="text-2xl">Graphen</h3>
    <div class="flex flex-col gap-8 mt-2  bg-gray-50 rounded-lg p-4">
      <div class="shadow rounded-t-md">
        <h4 class="py-2 px-4 text-lg">Ergebnis Einzel</h4>
        <div class="w-full h-64 p-4"><BarChart :chart_data="singleData" /></div>
        
      </div>
      <div class="shadow rounded-t-md">
        <h4 class="py-2 px-4 text-lg">Ergebnis Gruppen</h4>
        <div class="w-full h-64 p-4"><BarChart :chart_data="groupData" /></div>
      </div>
      <div class="shadow rounded-t-md">
        <h4 class="py-2 px-4 text-lg">Ergebnisunterschied zur Gruppe</h4>
        <div class="w-full h-64 p-4"><BarChartDifference :groupData :singleData/></div>
        
        <div class="flex flex-col">
          <label for="comment">Kommentar:</label>
          <textarea placeholder="Beobachtungen über die Gruppe" class="h-24 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2.5" name="comment" v-model="comment" type="text" />
        </div>
        
      </div>
    </div>
  </section>

  <div class="mt-24">
    <p>bearbeiten</p>
  <p>löschen</p>

  </div>
  


  
</template>

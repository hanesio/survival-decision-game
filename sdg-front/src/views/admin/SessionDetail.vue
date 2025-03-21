<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import SessionCard from '@/components/SessionCard.vue';
import { useStoreActive } from '@/stores/storeActive';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import {Stages } from '@/types';
import { useStoreSingles } from '@/stores/storeSingles';
import { useStoreGroups } from '@/stores/storeGroups';

const router = useRouter();
const route = useRoute()
let id = Number(route.params.id);

const storeSessions = useStoreSessions()
const sessions = storeSessions.sessions
const session = sessions.find((session)=>session.id === id)

const storeSingles = useStoreSingles()
const singles = storeSingles.singles.filter((single)=>single.sessionId===id)

const storeGroups = useStoreGroups()
const groups = storeGroups.groups.filter((single)=>single.sessionId===id)

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
    <h3>Einzelabgaben</h3>
    <div class="grid grid-cols-[150px_50px_auto] " v-for="single in singles">
      <p class="border-b-2" >{{ single.username }}</p>
      <p class="border-b-2">{{ single.result }}</p>
    </div>
  </section>
  <section class="py-4">
    <h3>Gruppenabgaben</h3>
    <div class="grid grid-cols-[150px_50px_auto] " v-for="group in groups">
      <p class="border-b-2" >{{ group.groupname }}</p>
      <p class="border-b-2">{{ group.result }}</p>
    </div>
  </section>
  <section>
    <h3>Graphen</h3>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <h4>Einzelabgaben</h4>
        <div class="bg-blue-50 rounded-lg h-64 mt-2"></div>
      </div>
      <div>
        <h4>Gruppenabgaben</h4>
        <div class="bg-blue-50 rounded-lg h-64 mt-2"></div>
      </div>
      <div>
        <h4>Vergleich</h4>
        <div class="bg-blue-50 rounded-lg h-64 mt-2"></div>
      </div>
    </div>
  </section>

  <div class="mt-24">
    <p>bearbeiten</p>
  <p>löschen</p>

  <div>Einzelwertung</div>
  <div>Gruppenwertung</div>
  <div>Endauswertung</div>
  </div>
  


  
</template>

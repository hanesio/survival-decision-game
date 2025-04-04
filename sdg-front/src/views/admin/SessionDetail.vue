<template>
    <div class="flex gap-2 py-2">
        <h1 class="text-4xl">{{ name }}</h1>
        <div
            v-if="id !== active.sessionId"
            @click="activateSession"
            class="flex w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-transparent bg-blue-200 p-2"
        >
            aktivieren
        </div>
        <div
            v-else
            @click="deactivateSession"
            class="flex w-20 cursor-pointer items-center justify-center rounded-xl border-2 border-green-600 bg-green-300 p-2"
        >
            aktiv
        </div>
    </div>
    <h2>{{ formattedDate }}</h2>

        <div class="py-8 gap-4 flex lg:flex-row flex-col items-center" >
          <StageButton @click="stage='single'" :isActive="stage === 'single'" label="Einzelphase" />
          <p class="text-2xl text-gray-400">></p>
          <StageButton @click="stage='group'" :isActive="stage === 'group'" label="Gruppenphase"/>
          <p class="text-2xl text-gray-400">></p>
          <StageButton @click="stage='results'" :isActive="stage === 'results'" label="Auswertung"/>
        </div>


    <div class="flex">
        <SessionTab @click="tabindex = 0" :isActive="tabindex === 0" label="Präsentation" />
        <SessionTab @click="tabindex = 1" :isActive="tabindex === 1" label="Analyse" />
        <SessionTab @click="tabindex = 2" :isActive="tabindex === 2" label="Lösung" />
    </div>
    <div class="b rounded-lg rounded-tl-none bg-gray-100 p-4">
        <section
            v-if="tabindex === 0"
            name="presentation"
            class="flex flex-col lg:items-start justify-center lg:flex-row lg:gap-4 items-center"
        >
            <div class="lg:w-1/4 p-4 flex flex-col gap-4">
                <p class="bg-blue-400 py-2 text-center text-2xl">{{ originURL }}</p>
                <img class="w-full scale-130 mix-blend-multiply " :src="qrcode" alt="QR Code" />
            </div>
            <div class="w-3/4 p-4 pr-6">
                <h2 class="pb-8 text-6xl underline decoration-blue-400">
                    {{ session.title }}
                </h2>
                <p class="text-justify text-2xl">{{ session.description }}</p>
            </div>
        </section>


        <section v-if="tabindex === 1" name="analyzation">
            <div class="mt-2 flex flex-col gap-8 rounded-lg bg-gray-50 p-4">
                <div class="rounded-t-md shadow">
                    <h4 class="px-4 py-2 text-lg">Ergebnis Einzel</h4>
                    <div class="h-64 w-full p-4"><BarChart :chart_data="singleData" /></div>
                </div>
                <div class="rounded-t-md shadow">
                    <h4 class="px-4 py-2 text-lg">Ergebnis Gruppen</h4>
                    <div class="h-64 w-full p-4"><BarChart :chart_data="groupData" /></div>
                </div>
                <div class="rounded-t-md shadow">
                    <h4 class="px-4 py-2 text-lg">Ergebnisunterschied zur Gruppe</h4>
                    <div class="w-full p-4"><BarChartDifference :groupData :singleData /></div>

                    <div class="flex flex-col">
                        <label for="comment">Kommentar:</label>
                        <textarea
                            placeholder="Beobachtungen über die Gruppe"
                            class="h-24 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            name="comment"
                            v-model="comment"
                            type="text"
                        />
                    </div>
                </div>
            </div>
        </section>
        <section
            v-if="tabindex === 2"
            name="solution"
        >
        <div class="rounded-lg overlow overflow-clip">
          <table class="table-auto border-collapse w-full ">
              <thead>
                <tr class="bg-gray-400 text-white text-left">
                  <th>Platz</th>
                  <th>Gegenstand</th>
                  <th>Erklärung</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in session.items" class="gap-4 odd:bg-gray-200 bg-gray-50 hover:bg-cyan-400">
                  <td class="text-center ">{{item.rank+1}}</td>
                  <td>{{item.description}}</td>
                  <td>{{ item.explanation }}</td>
                </tr>
              </tbody>
            </table>
        </div>

        </section>
    </div>

    <div class="mt-24">
        <p>bearbeiten</p>
        <p>löschen</p>
    </div>
</template>

<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import { useStoreActive } from '@/stores/storeActive';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { Stages } from '@/types';
import { useStoreSingles } from '@/stores/storeSingles';
import { useStoreGroups } from '@/stores/storeGroups';
import BarChart from '@/components/BarChart.vue';
import BarChartDifference from '@/components/BarChartDifference.vue';
import SessionTab from '@/components/SessionTab.vue';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { shallowRef } from 'vue';
import StageButton from '@/components/StageButton.vue';

const route = useRoute();

const id = Number(route.params.id);
const originURL = shallowRef(window.location.origin); // getting the current base URL
const qrcode = useQRCode(originURL);

console.log(window.location);

const tabindex = ref(0);

const storeSessions = useStoreSessions();
const sessions = storeSessions.sessions;
const session = sessions.find((session) => session.id === id);
const comment = ref('');

const storeSingles = useStoreSingles();
const singles = storeSingles.singles.filter((single) => single.sessionId === id);
const singleData = singles.map((single) => {
    return { x: single.username, y: single.result, groupId: single.groupId };
});

const storeGroups = useStoreGroups();
const groups = storeGroups.groups.filter((single) => single.sessionId === id);
const groupData = groups.map((group) => {
    return { x: group.groupname, y: group.result, groupId: group.id };
});

const name = session === undefined ? 'no session found' : session.name;
const formattedDate =
    session === undefined
        ? '-'
        : session.date.toLocaleDateString('de-DE', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          });

const storeActive = useStoreActive();
const active = storeActive.active;
const stage = ref(active.stage);

const stages = Object.values(Stages).slice(0, 3);

function activateSession() {
    storeActive.setActiveSession(id);
}
function deactivateSession() {
    storeActive.setActiveSession(null);
}
function setStage() {
    storeActive.setStage(stage.value);
}
</script>

<style>
td, th {
  padding: 8px 16px;
}

</style>

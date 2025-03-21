<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import {  ref} from 'vue';
import {  useRouter } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';
import { useStoreSingles } from '@/stores/storeSingles';
import draggable from 'vuedraggable';

const router = useRouter();

const storeActive = useStoreActive()
const active = storeActive.active
const storeSessions = useStoreSessions()
const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)
const storeSingles = useStoreSingles()

let items:RankItem[] = session === undefined ? [] : session.items
shuffleArray(items)
const shuffledItems = ref(items)
const username = ref("")
const password = ref("")
const result = ref(0)

function sendSolution(){
    calculateResult()
    if(session!= undefined){
        storeSingles.addSingle(username.value, password.value, shuffledItems.value, session.id, result.value)
    }
  router.push('/');
}

function calculateResult(){
    result.value = 0
shuffledItems.value.forEach((item,index)=>{
   result.value += Math.abs(item.rank-index)
})

}

// Fisher-Yates algorithm
function shuffleArray (array:RankItem[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
</script>

<template>
  <h1 class=" text-4xl p-2">{{ session?.title }}</h1>
  <article>
    <h2 class="text-lg p-2">Einzellösung</h2>
    <details class="p-2" >
        <summary>Szenario</summary>
        <p>{{session?.description}}</p>
    </details>
  </article>
  
  <div class=" flex flex-col gap-2 rounded p-4 bg-gray-50 ">   
      <div class=" flex gap-2 ">
        <input v-model="username" class="text-lg  bg-gray-200 rounded pl-2 p-1 w-1/2" type="text" placeholder="Name">
        <input v-model="password" class="text-lg  bg-gray-200 rounded pl-2 p-1 w-1/2" type="text" placeholder="Passwort">
      </div>
      <draggable v-model="shuffledItems" tag="ul">
        <template #item="{element:item}">
            <li class="p-1 pl-4 bg-gray-200 mt-1 rounded-full w-full cursor-grab">{{ item.description }}</li> 
        </template>
      </draggable>         
    <button @click="sendSolution" class=" bg-blue-600 rounded p-4 mt-4  hover:bg-blue-500">
          anlegen
    </button>
  </div>
</template>

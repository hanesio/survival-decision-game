<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import {  computed, ref} from 'vue';
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
const showNameValidation = ref(false)
const showPasswordValidation = ref(false)

const nameIsValid = computed(()=>{
  return username.value.length > 0
})
const nameIsFree = computed(()=>{
  return storeSingles.singles.find((single)=>single.username === username.value) === undefined
})

const nameValidationMessage = computed(()=>{
  if(!nameIsValid.value) return 'Gib einen Namen ein'
  if(!nameIsFree.value) return 'Der Name ist bereits vergeben'
  return 'sieht gut aus'
})

const passwordIsValid = computed(()=>{
  return password.value.length > 0
})

const passwordValidationMessage = computed(()=>{
  if(!passwordIsValid.value) return 'Gib ein Passwort ein'
  return 'sieht gut aus'
})


function sendSolution(){
  if(nameIsValid.value && nameIsFree.value && passwordIsValid.value){
    calculateResult()
    if(session!= undefined){
        storeSingles.addSingle(username.value, password.value, shuffledItems.value, session.id, result.value)
    }
    router.push('/');
  } else {
    if(!nameIsFree.value || !nameIsValid.value)
      showNameValidation.value = true
    if(!passwordIsValid.value)
      showPasswordValidation.value = true
  }
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
  <article class="flex flex-col border-l-4 px-4 border-cyan-500 ">
    <h3 class=" text-xl">{{ session?.title }}</h3>
    <h2 class="  text-6xl ">Einzellösung</h2>
  </article>
  <article>
    <details class="p-2" >
        <summary>Szenario</summary>
        <p>{{session?.description}}</p>
    </details>
  </article>

  <div class=" flex flex-col gap-2 rounded p-4 bg-gray-50 ">
    <div class="flex  gap-2 py-4">
      <div class=" flex flex-col gap-1 w-1/2 ">
        <input v-model="username" :class="[showNameValidation?  nameIsFree && nameIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2  bg-gray-200 rounded pl-2 p-1 " type="text" placeholder="Name">
        <p v-if="showNameValidation" class="text-xs px-2" :class="[nameIsValid && nameIsFree?'text-green-500':'text-red-600']">{{ nameValidationMessage }}</p>
      </div>
      <div class=" flex flex-col gap-1 w-1/2 ">
        <input v-model="password" :class="[showPasswordValidation?  passwordIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2  bg-gray-200 rounded pl-2 p-1 " type="password" placeholder="Passwort">
        <p v-if="showPasswordValidation" class="text-xs px-2 " :class="[passwordIsValid?'text-green-500':'text-red-600']">{{ passwordValidationMessage }}</p>
      </div>


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

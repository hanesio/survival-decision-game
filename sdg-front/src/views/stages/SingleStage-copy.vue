<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import {  computed, ref} from 'vue';
import {  useRouter } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';
import { useStoreSingles } from '@/stores/storeSingles';
import draggable from 'vuedraggable';
import IconDragHandle from '@/components/icons/IconDragHandle.vue';
import { useStorage } from '@vueuse/core'
import ItemPill from '@/components/ItemPill.vue';


const router = useRouter();

const storeActive = useStoreActive()
const active = storeActive.active
const storeSessions = useStoreSessions()
const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)
const storeSingles = useStoreSingles()
const singleApplied = useStorage('single-applied', false)

let items:RankItem[] = session === undefined ? [] : session.items
shuffleArray(items)
const shuffledItems = ref(items)
const dragListItems = ref([])
const username = ref("")
const password = ref("")
const result = ref(0)
const showNameValidation = ref(false)
const showPasswordValidation = ref(false)
const showListValidation = ref(false)

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
  if(nameIsValid.value && nameIsFree.value && listIsValid.value){
    calculateResult()
    if(session!= undefined){
        storeSingles.addSingle(username.value, password.value, dragListItems.value, session.id, result.value)
    }
    singleApplied.value = true
    router.push('/');
  } else {
    if(!nameIsFree.value || !nameIsValid.value)
      showNameValidation.value = true
    // if(!passwordIsValid.value)
    //   showPasswordValidation.value = true

    if(!listIsValid.value)
      showListValidation.value = true
    window.scrollTo(0,0);
  }
}

function calculateResult(){
  result.value = 0
  dragListItems.value.forEach((item,index)=>{
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

function addItemToDragList(item:RankItem){
  dragListItems.value.push(item)
  shuffledItems.value = shuffledItems.value.filter((shuffle)=>shuffle.rank != item.rank )
}
</script>

<template>
  <article class="flex flex-col border-l-4 px-4 border-cyan-500 ">
    <h3 class=" text-xl">{{ session?.title }}</h3>
    <h2 class=" text-4xl lg:text-6xl ">Einzellösung</h2>
  </article>
  <article>
    <details class="p-2" >
        <summary>Szenario</summary>
        <p>{{session?.description}}</p>
    </details>
  </article>

  <div class=" flex flex-col  rounded p-4 bg-gray-50 gap-2">
    <div class="flex lg:flex-row flex-col gap-2 py-2 ">
      <div class=" flex flex-col gap-1 lg:w-1/2 w-full ">
        <input v-model="username" :class="[showNameValidation?  nameIsFree && nameIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2 w-full  bg-gray-200 rounded pl-2 p-1 " type="text" placeholder="Nickname">
        <p v-if="showNameValidation" class="text-xs px-2" :class="[nameIsValid && nameIsFree?'text-green-500':'text-red-600']">{{ nameValidationMessage }}</p>
      </div>
      <!-- <div class=" flex flex-col gap-1 lg:w-1/2 w-full ">
        <input v-model="password" :class="[showPasswordValidation?  passwordIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2 w-full   bg-gray-200 rounded pl-2 p-1 " type="password" placeholder="Passwort">
        <p v-if="showPasswordValidation" class="text-xs px-2 " :class="[passwordIsValid?'text-green-500':'text-red-600']">{{ passwordValidationMessage }}</p>
      </div> -->
    </div>
    <div class="flex flex-wrap gap-2">
      <ItemPill @click="addItemToDragList(item)" v-for="item in shuffledItems" :label="item.description"/>
    </div>
    <p v-if="showListValidation" class="text-xs px-2" :class="[listIsValid?'text-green-500':'text-red-600']">{{ listValidationMessage }}</p>


      <draggable v-model="dragListItems" tag="ul" handle=".handle" animation="300">
        <template #item="{element:item, index}" >
            <li class="px-1 py-0  mt-1 flex gap-0.5 items-center justify-between rounded-sm w-full bg-gray-200 ">
              <span class="px-1 py-1  w-8 text-center bg-gray-200  ">{{ index +1 }}</span>
              <span class="p-1 px-2 bg-gray-200 w-full border-l-2 border-white">
                {{ item.description }}
              </span>
              <div class="handle  mr-1 flex items-center cursor-grab  w-10 rounded-sm justify-center ">
                <IconDragHandle class="text-gray-400" />
              </div>
            </li>
        </template>
      </draggable>
    <button @click="sendSolution" class=" bg-blue-600 rounded p-4   hover:bg-blue-500">
          abgeben
    </button>
  </div>
</template>

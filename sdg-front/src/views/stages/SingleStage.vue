<template>
  <SubmitSolution :title="session.title" stage="Einzellösung" :description="session.description" :items="items" v-model="sendItems" :valid="listIsValid" :show-validation="showListValidation">
    <template v-slot:username>
      <div class=" flex flex-col gap-1 lg:w-1/2 w-full ">
          <input v-model="username" :class="[showNameValidation?  nameIsFree && nameIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2 w-full  bg-gray-200 rounded pl-2 p-1 " type="text" placeholder="Nickname">
          <p v-if="showNameValidation" class="text-xs px-2" :class="[nameIsValid && nameIsFree?'text-green-500':'text-red-600']">{{ nameValidationMessage }}</p>
        </div>
    </template>
    <template v-slot:button>
      <button @click="submitSolution" class=" bg-blue-600 rounded p-4 cursor-pointer  hover:bg-blue-500">
            abgeben
      </button>
    </template>
  </SubmitSolution>
</template>

<script setup lang="ts">
  import { useStoreSessions } from '@/stores/storeSessions';
  import type { RankItem } from '@/types';
  import {  computed, ref} from 'vue';
  import {  useRouter } from 'vue-router';
  import { useStoreActive } from '@/stores/storeActive';
  import { useStoreSingles } from '@/stores/storeSingles';
  import { useStorage } from '@vueuse/core'
  import SubmitSolution from '@/components/SubmitSolution.vue';
  import axios from 'axios';

  const router = useRouter();

  const storeActive = useStoreActive()
  const active = storeActive.active
  const storeSessions = useStoreSessions()
  const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)
  const storeSingles = useStoreSingles()
  const singleApplied = useStorage('single-applied', false)

  let items:RankItem[] = session === undefined ? [] : session.items
  const sendItems = ref([])
  const username = ref("")
  const password = ref("")
  const result = ref(0)
  const showNameValidation = ref(false)
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

  const listIsValid = computed(()=>{
    return sendItems.value.length === 15
  })

  function submitSolution(){
    if(nameIsValid.value && nameIsFree.value && listIsValid.value){
      calculateResult()
      if(session!= undefined){
          storeSingles.addSingle(username.value, password.value, sendItems.value, session.id, result.value)
          sendData({id:0, username:username.value, items: sendItems.value, sessionId:session.id, result:result.value})




      }
      singleApplied.value = true
      router.push('/');
    } else {
      if(!nameIsFree.value || !nameIsValid.value)
        showNameValidation.value = true

      if(!listIsValid.value)
        showListValidation.value = true
      window.scrollTo(0,0);
    }
  }

  function calculateResult(){
    result.value = 0
    sendItems.value.forEach((item,index)=>{
      result.value += Math.abs(item.rank-index)
    })
  }

  async function sendData(data) {
    axios.defaults.headers.post = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }; // muss anscheinend UNBEDINGT unmittelbar vor dem request passieren

  const response = await axios.post("http://localhost:8800/api/singles/create", data)
  console.log(response);
}
</script>



<script setup lang="ts">
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import {  computed, ref} from 'vue';
import {  useRouter } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';
import { useStoreGroups } from '@/stores/storeGroups';
import { useStoreSingles } from '@/stores/storeSingles';
import draggable from 'vuedraggable';
import SinglePill from '@/components/SinglePill.vue';
import ItemPill from '@/components/ItemPill.vue';
import { useStorage } from '@vueuse/core'
import IconDragHandle from '@/components/icons/IconDragHandle.vue';

const router = useRouter();

const storeActive = useStoreActive()
const active = storeActive.active
const storeSessions = useStoreSessions()
const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)
const storeGroups = useStoreGroups()
const groupApplied = useStorage('group-applied', false)
const storeSingles = useStoreSingles()

let items:RankItem[] = session === undefined ? [] : session.items
shuffleArray(items)
const shuffledItems = ref(items)
const dragListItems = ref([])
const groupname = ref("")
const singles = storeSingles.singles
let members = ref([])
let newMembers= ref([])
const result = ref(0)
const showNameValidation = ref(false)
const showMemberValidation = ref(false)

const nameIsValid = computed(()=>{
  return groupname.value.length > 0
})
const nameIsFree = computed(()=>{
  return storeGroups.groups.find((group)=>group.groupname === groupname.value) === undefined
})
const membersChosen = computed(()=>{
  return members.value.length > 0
})

const nameValidationMessage = computed(()=>{
  if(!nameIsValid.value) return 'Gib einen Namen ein'
  if(!nameIsFree.value) return 'Der Name ist bereits vergeben'
  return 'sieht gut aus'
})
const membersValidationMessage = computed(()=>{
  if(!membersChosen.value) return 'Füge Gruppenmitglieder hinzu'
  return 'sieht gut aus'
})

function sendSolution(){
  if(nameIsValid.value && nameIsFree.value && membersChosen.value){
    calculateResult()
    if(session!= undefined){
        const groupId = storeGroups.addGroup(groupname.value, dragListItems.value, session.id, members.value, result.value)
        members.value.forEach((member)=>{
          storeSingles.setGroupId(member, groupId)
    })
    }
    groupApplied.value = true
    router.push('/');
  } else {
    if(!nameIsFree.value || !nameIsValid.value)
      showNameValidation.value = true
    if(!membersChosen.value)
      showMemberValidation.value = true
      window.scrollTo(0,0);
  }
}

function calculateResult(){
    result.value = 0
    dragListItems.value.forEach((item,index)=>{
    result.value += Math.abs(item.rank-index)
    })
}

function handleMember(singleId: number){
    if(members.value.includes(singleId)){
        newMembers.value = members.value.filter((member)=> member != singleId)
        members.value = newMembers.value
    } else
        members.value.push(singleId)
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
  <section id="input" class="flex flex-col border-l-4 px-4 border-cyan-500 ">
    <h3 class=" text-xl">{{ session?.title }}</h3>
    <h2 class=" text-4xl lg:text-6xl ">Gruppenlösung</h2>
  </section>
  <section>
    <details class="p-2" >
        <summary>Szenario</summary>
        <p>{{session?.description}}</p>
    </details>
  </section>

  <div  class="flex flex-col gap-1 p-4">
    <section class="flex gap-2 flex-wrap">
    <SinglePill @click="handleMember(single.id)" v-for="single in singles" :username="single.username"/>
  </section>
    <p v-if="showMemberValidation" class="text-xs px-2" :class="[membersChosen?'text-green-500':'text-red-600']">
      {{ membersValidationMessage }}</p>
  </div>


  <div class=" flex flex-col gap-2 rounded p-4 bg-gray-50 ">
      <div class=" flex gap-2 ">
        <div class=" flex flex-col gap-1 w-1/2 ">
        <input v-model="groupname" :class="[showNameValidation?  nameIsFree && nameIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2  bg-gray-200 rounded pl-2 p-1 " type="text" placeholder="Name">
        <p v-if="showNameValidation" class="text-xs px-2" :class="[nameIsValid && nameIsFree?'text-green-500':'text-red-600']">
          {{ nameValidationMessage }}</p>
      </div>
      </div>
      <div class="flex flex-wrap gap-2">
      <ItemPill @click="addItemToDragList(item)" v-for="item in shuffledItems" :label="item.description"/>
    </div>


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
    <button @click="sendSolution" class=" bg-blue-600 rounded p-4 mt-4  hover:bg-blue-500">
          abgeben
    </button>
  </div>
</template>

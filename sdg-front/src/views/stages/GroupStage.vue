<template>
  <SubmitSolution :title="session.title" stage="Gruppenlösung" :description="session.description" :items="items" v-model="sendItems" :valid="listIsValid" :show-validation="showListValidation">

    <template v-slot:members>
      <div  class="flex flex-col gap-1 p-4">
    <section class="flex gap-2 flex-wrap">
    <SinglePill @click="handleMember(single.id)" v-for="single in singles" :username="single.username"/>
  </section>
    <p v-if="showMemberValidation" class="text-xs px-2" :class="[membersChosen?'text-green-500':'text-red-600']">
      {{ membersValidationMessage }}</p>
  </div>
    </template>

    <template v-slot:username>
      <div class=" flex flex-col gap-1 lg:w-1/2 w-full ">
          <input v-model="groupname" :class="[showNameValidation?  nameIsFree && nameIsValid? 'border-transparent':'border-red-600':'border-transparent']" class="text-lg border-2 w-full  bg-gray-200 rounded pl-2 p-1 " type="text" placeholder="Nickname">
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
  import { useStoreGroups } from '@/stores/storeGroups';
  import SinglePill from '@/components/SinglePill.vue';

  const router = useRouter();

  const storeActive = useStoreActive()
  const active = storeActive.active
  const storeSessions = useStoreSessions()
  const session = storeSessions.sessions.find((session)=>session.id === active.sessionId)
  const storeGroups = useStoreGroups()
  const storeSingles = useStoreSingles()
  const groupApplied = useStorage('group-applied', false)

  let items:RankItem[] = session === undefined ? [] : session.items
  const sendItems = ref([])
  const groupname = ref("")
  const singles = storeSingles.singles.filter((single)=>single.sessionId === active.sessionId)
  const result = ref(0)
  let members = ref([])
let newMembers= ref([])
  const showNameValidation = ref(false)
  const showMemberValidation = ref(false)
  const showListValidation = ref(false)

  const nameIsValid = computed(()=>{
    return groupname.value.length > 0
  })
  const nameIsFree = computed(()=>{
    return storeGroups.groups.find((group)=>group.groupname === groupname.value) === undefined
})

  const nameValidationMessage = computed(()=>{
    if(!nameIsValid.value) return 'Gib einen Namen ein'
    if(!nameIsFree.value) return 'Der Name ist bereits vergeben'
    return 'sieht gut aus'
  })

  const membersChosen = computed(()=>{
  return members.value.length > 0
})

const membersValidationMessage = computed(()=>{
  if(!membersChosen.value) return 'Füge Gruppenmitglieder hinzu'
  return 'sieht gut aus'
})

  const listIsValid = computed(()=>{
    return sendItems.value.length === 15
  })

  function submitSolution(){
    if(nameIsValid.value && nameIsFree.value && membersChosen.value && listIsValid.value){
      calculateResult()
      if(session!= undefined){
        const groupId = storeGroups.addGroup(groupname.value, sendItems.value, session.id, members.value, result.value)
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

  function handleMember(singleId: number){
    if(members.value.includes(singleId)){
        newMembers.value = members.value.filter((member)=> member != singleId)
        members.value = newMembers.value
    } else
        members.value.push(singleId)
}
</script>



<script setup lang="ts">
import SingleStage from './stages/SingleStage.vue';
import GroupStage from './stages/GroupStage.vue';
import ResultStage from './stages/ResultStage.vue';
import { useStorage } from '@vueuse/core'
import { useStoreActive } from '@/stores/storeActive';

const storeActive = useStoreActive()
const active = storeActive.active
const singleApplied = useStorage('single-applied', false)
const groupApplied = useStorage('group-applied', false)

function resetApply(){
  singleApplied.value = false
  groupApplied.value = false
}

</script>

<template>
    <div class="flex justify-center items-center flex-col gap-2 bg-cyan-50 p-4 rounded-lg w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" v-if="active.sessionId === null || (active.stage === 'single' && singleApplied) || (active.stage === 'group' &&  groupApplied) ">
      <p class="p-4">Es ist keine Spiel-Session aktiv oder du hast dein Ergebnis bereits abgegeben. Warte auf die Anweisungen des Spielleiters.</p>
      <button @click="resetApply" class="bg-cyan-500 cursor-pointer p-2 rounded-md">erneut abgeben</button>
    </div>
    <div v-else>
      <SingleStage v-if="active.stage === 'single'"/>
      <GroupStage v-if="active.stage === 'group'"/>
      <ResultStage v-if="active.stage === 'results'"/>
  </div>
</template>

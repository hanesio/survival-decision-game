<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import SingleStage from './stages/SingleStage.vue';
import GroupStage from './stages/GroupStage.vue';
import ResultStage from './stages/ResultStage.vue';
import { useStoreActive } from '@/stores/storeActive';

const storeActive = useStoreActive()
const active = storeActive.active


</script>

<template>

    <div class="flex justify-center items-center " v-if="active.sessionId === null">keine Spiel-Session aktiv</div>
    <div v-else>
      <SingleStage v-if="active.stage === 'single'"/>
      <GroupStage v-if="active.stage === 'group'"/>
      <ResultStage v-if="active.stage === 'results'"/>
  </div>
</template>

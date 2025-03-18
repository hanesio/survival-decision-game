<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import SingleStage from './stages/SingleStage.vue';
import GroupStage from './stages/GroupStage.vue';
import ResultStage from './stages/ResultStage.vue';
</script>

<template>
  <div class="">
    <div>keine Spiel-Session aktiv</div>
    <SingleStage/>
    <GroupStage/>
    <ResultStage/>

  </div>
  
</template>

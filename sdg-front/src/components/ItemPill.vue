<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
    label:{
        type: String,
        required: true
    }
})


</script>
<template>
    <div class="flex p-2 bg-cyan-100 rounded-full items-center gap-2 active:scale-90 active:opacity-0 transition ease-out duration-300 ">
      <button class="p-2 h-8 cursor-pointer flex items-center justify-center w-8 bg-cyan-400 rounded-full shrink-0">+</button>
      <p class="pr-2">{{label}}</p>
    </div>
</template>


<style scoped>
</style>

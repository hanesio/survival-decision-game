<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
    username:{
        type: String,
        required: true
    }
})

const isActive = ref(false)
</script>
<template>
    <p @click="isActive=!isActive" :class="[isActive ? 'bg-blue-300  border-blue-500': 'text-gray-400 bg-blue-100 border-transparent']" class="cursor-pointer rounded-full px-4 py-1 border-2 text-xl ">{{username}}</p>
</template>


<style scoped>
</style>

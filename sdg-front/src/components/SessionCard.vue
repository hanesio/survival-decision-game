<script setup lang='ts'>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  } 
});
const formattedDate = props.date.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>
<template>
    <div class="h-40 lg:w-74 w-full   bg-cyan-900 cursor-pointer rounded-2xl flex flex-col justify-center items-center">
      <div class="mt-6 text-3xl text-gray-100">{{ name }}</div>
      <div class="text-lg text-gray-100">{{ formattedDate }}</div>
      <div class="border-2  border-green-600 bg-green-300  p-2 rounded-full mt-1" v-if="isActive">aktiv</div>
    </div>
</template>


<style scoped>
</style>
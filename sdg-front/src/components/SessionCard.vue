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
    <div class="h-40 lg:w-64 w-full border cursor-pointer rounded-2xl flex flex-col justify-center items-center">
      <div class="mt-6 text-3xl">{{ name }}</div>
      <div class="text-lg">{{ formattedDate }}</div>
      <div v-if="isActive">aktiv</div>
    </div>
</template>


<style scoped>
</style>
<template>
  <div class="flex flex-col items-center w-20">
    <p :class="[modelValue?'text-cyan-700': 'text-gray-400']">{{ label }}</p>
    <div @click="toggleSwitch" class="w-12 h-5 rounded-full items-center flex transition duration-100" :class="[props.modelValue?'bg-cyan-500 ':'bg-gray-200']">
      <div class="w-6 h-6 rounded-full border-1 border-cyan-500 bg-white transition duration-100 ease-out" :class="[props.modelValue?'translate-x-6':'translate-0']"></div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue:Boolean
})
const emit = defineEmits(['update:modelValue'])
let active = props.modelValue

const label = computed(()=>props.modelValue?'aktiv':'aktivieren')

function toggleSwitch(){
  active = !active
  emit('update:modelValue', active )
}
</script>


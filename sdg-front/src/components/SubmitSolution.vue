<template>
  <article class="flex flex-col border-l-4 px-4 border-cyan-500 ">
    <h3 class=" text-xl">{{ title }}</h3>
    <h2 class=" text-4xl lg:text-6xl ">{{stage}}</h2>
  </article>
  <article>
    <details class="p-2" >
        <summary>Szenario</summary>
        <p>{{description}}</p>
    </details>
  </article>
  <slot name="members"></slot>
  <div class=" flex flex-col  rounded p-4 bg-gray-50 gap-2">
    <div class="flex lg:flex-row flex-col gap-2 py-2 ">
      <slot name="username"></slot>
    </div>
    <div class="flex flex-wrap gap-2">
      <ItemPill @click="addItemToDragList(item)" v-for="item in shuffledItems" :label="item.description"/>
    </div>
    <p v-if="showValidation" class="text-xs px-2" :class="[valid?'text-green-500':'text-red-600']">{{ validationMessage }}</p>


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
      <slot name="button"></slot>
  </div>
</template>

<script setup lang="ts">
  import type { RankItem } from '@/types';
  import {  computed, ref} from 'vue';
  import draggable from 'vuedraggable';
  import IconDragHandle from '@/components/icons/IconDragHandle.vue';
  import ItemPill from '@/components/ItemPill.vue';

  const props = defineProps({
    title:{
      type: String,
      required:true
    },
    stage:{
      type: String,
      required:true
    },
    description:{
      type: String,
      required:true
    },
    items:{
      type: Array<RankItem>,
      required:true
    },
    modelValue:Array<RankItem>,
    valid:{
      type:Boolean,
      default:false
    },
    showValidation:{
      type:Boolean,
      default:false
    },
  })
  const emit = defineEmits(['update:modelValue'])

  shuffleArray(props.items)
  const shuffledItems = ref(props.items)
  const dragListItems = ref([])

  const validationMessage = computed(()=>{
    if(!props.valid) return 'nur ' + dragListItems.value.length + '/15 Gegenständen zugewiesen'
    return 'sieht gut aus'
  })

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
    emit('update:modelValue', dragListItems.value)
  }
</script>



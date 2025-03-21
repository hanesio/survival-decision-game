<script setup lang="ts">
import { useStorePresets } from '@/stores/storePresets';
import { useStoreSessions } from '@/stores/storeSessions';
import type { RankItem } from '@/types';
import { reactive, ref} from 'vue';
import {  useRouter } from 'vue-router';
import { useStoreActive } from '@/stores/storeActive';


const storeActive = useStoreActive()
const active = storeActive.active

const router = useRouter();

const storeSessions = useStoreSessions()

const selectedPresetId = ref(0)
const storePresets = useStorePresets();
const presets = storePresets.presets;

let items:RankItem[] = []
const presetTitle = ref(presets[selectedPresetId.value].title)
const presetDescription = ref(presets[selectedPresetId.value].description)
getPreset()

const sessionName = ref("")
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
const year = currentDate.getFullYear();

function getPreset(){
  const output:RankItem[] = []
  storePresets.presets[selectedPresetId.value].items.forEach((item)=>{
    const outitem = reactive({
      description: item.description,
      explanation: item.explanation,
      rank: item.rank
    })
    output.push(outitem)
  })
  items = output
  presetTitle.value = presets[selectedPresetId.value].title
  presetDescription.value = presets[selectedPresetId.value].description
}

function applySession(){
  const sessionId = storeSessions.addSession(sessionName.value, currentDate, presetTitle.value, presetDescription.value, items)
  storeActive.setActiveSession(sessionId)
  storeActive.setStage('single')
  router.push('/admin');
}

</script>

<template>
  <h1 class=" text-6xl">NEUE SESSION</h1>
  <div class="py-2 flex gap-2 items-center "><label for="presets">preset:</label>
        <select @change="getPreset" class="bg-gray-200 rounded p-2" v-model="selectedPresetId"  name="presets">
          <option class="p-4" v-for="(preset) in presets" :value="preset.id">{{ preset.title }}</option>
        </select>
      </div>
  
  <div class=" mx-auto flex gap-2  rounded p-2 bg-gray-50 ">
    
    <div class="w-1/5 flex flex-col gap-2">   
      <div class="flex flex-col gap-2">
        <label for="">Sessionname: </label>
        <input v-model="sessionName" class="text-2xl w-full bg-gray-200 rounded p-2" type="text" placeholder="Sessionname">
      </div>
      <div>
        <label for="">Datum:</label>
        <p class="text-2xl">{{`${day}-${month}-${year}`}}</p>
      </div>
    </div>


    <form class="w-4/5">
      
    <div class="flex gap-6">
      <div class=" w-2/3 flex flex-col justify-between gap-2  ">
          <label for="">Gegenstände:</label>
          <div class=" flex  " v-for="(item, index) in items">
            <label class="w-4 h-full flex justify-center px-3 py rounded">{{ index+1 }}</label>
            <div class="flex  gap-0.5 w-full ">
              <input class="rounded bg-gray-200 p-1 text-sm w-full" v-model="item.description" type="text">
              <input class="rounded bg-gray-100 p-1 text-xs w-full" v-model="item.explanation" type="text">
            </div>
        </div></div>
      <div class="w-1/3 flex flex-col gap-2">
        
        <label for="title">Titel: </label>
        <input class="block p-2.5 w-full text-sm rounded bg-gray-200 " v-model="presetTitle" /><br>
        <label class="" for="description">Beschreibung: </label>
        <textarea class="block  w-full h-full p-4 text-sm rounded bg-gray-200 " v-model="presetDescription"></textarea>

        <div @click="applySession" class=" bg-blue-600 rounded p-4 mt-4 w-full hover:bg-blue-500">
          anlegen
        </div>
          </div>
    </div>
  </form>
  </div>
</template>

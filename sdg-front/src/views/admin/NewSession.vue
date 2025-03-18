<script setup lang="ts">
import { useStorePresets } from '@/stores/storePresets';
import { computed, ref} from 'vue';
const selectedPresetId = ref(0)
const storePresets = useStorePresets();
const presets = storePresets.presets;

// let currentPreset = presets.find((preset)=> preset.id === selectedPresetId.value)

  




const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Add 1 as months are zero-based
const year = currentDate.getFullYear();


// function choosePresetById(presetId:number){
//   currentPreset = presets.find((preset)=> preset.id === selectedPresetId.value)
// }

</script>

<template>
  <h1 class=" text-6xl">NEUE SESSION</h1>
  <div class="py-2 flex gap-2 items-center "><label for="presets">preset:</label>
        <select class="bg-gray-300 rounded p-2" v-model="selectedPresetId"  name="presets">
          <option class="p-4" v-for="(preset) in presets" :value="preset.id">{{ preset.title }}</option>
        </select>
      </div>
  
  <div class=" mx-auto flex border-blue rounded p-2 border-2 ">
    
    <div class="w-1/5">
      
      <label for="">Sessionname: </label>
      <input class="text-4xl" type="text" placeholder="Sessionname"><br>
      <label for="">Datum:</label>
      <p class="text-4xl">{{`${day}-${month}-${year}`}}</p>
    </div>

    <form class="w-4/5">
      
    <div class="flex gap-6">
      <div class=" w-2/3 ">
          <label for="">Gegenstände</label>
          <div class=" flex gap-2 my-2 mb-4" v-for="(item, index) in storePresets.presets[selectedPresetId].items">
          <label class="w-4 h-full flex justify-center border-2 px-3 py rounded">{{ index+1 }}</label>
          <div class="flex flex-col gap-1 w-full">
            <input class="rounded bg-gray-700 text-gray-50  pl-3 py" :value="item.description" type="text">
          <input class="rounded bg-gray-500 text-gray-50  pl-3 py" :value="item.explanation" type="text">
          </div>
        </div></div>
      <div class="w-1/3">
        
        <label for="title">Titel: </label>
        <input class="block p-2.5 w-full text-sm rounded bg-gray-700 text-gray-50" :value="storePresets.presets[selectedPresetId].title" /><br>
        <label class="" for="description">Beschreibung: </label>
        <textarea class="block  w-full h-80 p-4 text-sm rounded bg-gray-700 text-gray-50" :value="storePresets.presets[selectedPresetId].description"></textarea>

        <button class=" bg-blue-600 rounded p-4 mt-4 w-full hover:bg-blue-500">
          anlegen
        </button>
          </div>
          
        
    </div>
      
    
  </form>
  </div>
  
  
  
  
</template>

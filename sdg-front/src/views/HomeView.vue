<script setup lang="ts">
import ActiveStage from './ActiveStage.vue';
import axios from 'axios';


getData()




async function getData() {
    axios.defaults.headers.post = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        }; // muss anscheinend UNBEDINGT unmittelbar vor dem request passieren

        try {
          const response = await axios.get("http://localhost:8800/api/test")
          console.log(response);
        } catch (error) {
          console.error('Error:', error);
      }
  }



</script>

<template>
  <main  >
    <ActiveStage/>
  </main>
</template>

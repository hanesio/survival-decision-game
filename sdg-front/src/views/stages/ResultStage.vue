<script setup lang="ts">
import {  useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const username = ref('')

function login(){
  router.push(`/users/${username.value}`)
}





</script>

<template>
  <form class="flex flex-col items-center rounded-lg bg-gray-50 border-2 border-green-200 p-8 w-96 h-54 m-auto absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 "  >
    <div class="flex flex-col items-center">
      <p class="py-4">Auswertung ansehen</p>
      <input placeholder="Benutzername" class="border-2 border-gray-200  rounded-md p-2" v-model="username" name="username" type="text">
    </div>
    <button @click="login" class="mt-4 cursor-pointer bg-green-400 rounded-md px-4 py-2">einloggen</button>
</form>
</template>

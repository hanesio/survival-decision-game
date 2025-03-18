<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <header class="flex justify-between items-center px-6 py-4  fixed">

      <nav class="flex gap-2">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>

  </header>
<div class="w-full px-40 "><RouterView /></div>
  
</template>


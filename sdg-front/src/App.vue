<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <header class="flex justify-between items-center px-6 py-4 fixed top-0 w-screen">

      <nav class="flex gap-2">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>

  </header>
<div class="w-full lg:px-20 h-full mt-20 px-6 "><RouterView /></div>

</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const username = ref('');

function login() {
    router.push(`/users/${username.value}`);
}
</script>

<template>
    <form
        class="h-54 absolute left-1/2 top-1/2 m-auto flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 border-green-200 bg-gray-50 p-8"
    >
        <div class="flex flex-col items-center">
            <p class="py-4">Auswertung ansehen</p>
            <input
                placeholder="Benutzername"
                class="rounded-md border-2 border-gray-200 p-2"
                v-model="username"
                name="username"
                type="text"
            />
        </div>
        <button @click="login" class="mt-4 cursor-pointer rounded-md bg-green-400 px-4 py-2">
            einloggen
        </button>
    </form>
</template>

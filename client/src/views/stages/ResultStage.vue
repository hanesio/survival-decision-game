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
        class="h-54 hover:bg-secondary-600-2 border-secondary-400 absolute left-1/2 top-1/2 m-auto flex w-96 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 bg-gray-100 p-8 dark:border-0 dark:bg-gray-800 dark:text-gray-400"
    >
        <div class="flex flex-col items-center">
            <p class="py-4">Auswertung ansehen</p>
            <input
                placeholder="Benutzername"
                class="focus:border-secondary-500 rounded-md border-2 border-gray-200 p-2 focus:outline-none dark:border-gray-700"
                v-model="username"
                name="username"
                type="text"
            />
        </div>
        <button
            @click="login"
            class="bg-secondary-400 hover:bg-secondary-600 mt-4 cursor-pointer rounded-md px-4 py-2 dark:text-black"
        >
            einloggen
        </button>
    </form>
</template>

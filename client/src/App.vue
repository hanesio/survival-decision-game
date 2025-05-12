<template>
    <header
        class="bg-primary-400 fixed top-0 z-20 flex w-screen items-center justify-between px-6 py-2"
    >
        <nav class="flex w-full items-center justify-between gap-2">
            <RouterLink to="/">Home</RouterLink>

            <ButtonDarkMode v-model="mode" class="text-primary-900" />
            <button class="cursor-pointer underline" @click="handleLoginRequest">Admin</button>
        </nav>
    </header>
    <div class="mt-20 h-full w-full px-2 lg:px-20"><RouterView /></div>
    <ModalLogin
        class="m-auto"
        :dialog-open="openLogin"
        :password-false="passwordFalse"
        @login="login"
        @close="closeLoginDialog"
        v-model="inputPassword"
    />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import ButtonDarkMode from './components/ButtonDarkMode.vue';
import { watch } from 'vue';
import { useStoreDark } from './stores/storeDark';
import { useStorage } from '@vueuse/core';
import ModalLogin from './components/ModalLogin.vue';
import router from './router';
import { AxiosHelper } from '@/AxiosHelper';

const axiosHelper = new AxiosHelper();

const adminUserName = 'admin';
const adminUser = ref();
const correctPassword = ref('');
const inputPassword = ref('');
const passwordFalse = ref(false);
const loggedIn = useStorage('logged-in', false);
const openLogin = ref(false);
const storeDark = useStoreDark();
const mode = ref('OS');

localStorage.removeItem('theme');
document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
);
storeDark.dark =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

getAdmin();

watch(mode, (newMode) => {
    if (newMode === 'OS') localStorage.removeItem('theme');
    if (newMode === 'light') localStorage.theme = 'light';
    if (newMode === 'dark') localStorage.theme = 'dark';
    document.documentElement.classList.toggle(
        'dark',
        localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches),
    );
    storeDark.dark =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
});

async function getAdmin() {
    const data = await axiosHelper.get('users/find/' + adminUserName);
    adminUser.value = data.data;
    correctPassword.value = adminUser.value.password;
}

function handleLoginRequest() {
    console.log(loggedIn.value);
    if (loggedIn.value) {
        router.push('/admin');
    } else {
        openLogin.value = true;
    }
}

function closeLoginDialog() {
    passwordFalse.value = false;
    openLogin.value = false;
}

function login() {
    console.log(inputPassword.value);

    if (correctPassword.value === inputPassword.value) {
        closeLoginDialog();
        loggedIn.value = true;
        inputPassword.value = '';
        router.push('/admin');
    } else {
        passwordFalse.value = true;
    }
}
</script>

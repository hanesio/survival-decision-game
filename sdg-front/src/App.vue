<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import DarkModeButton from './components/DarkModeButton.vue';
import { watch } from 'vue';

const mode = ref('');

watch(mode, (newMode) => {
    document.documentElement.classList.toggle(
        'dark',
        localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches),
    );
    if (newMode === 'light') localStorage.removeItem('theme');
    if (newMode === 'dark') localStorage.theme = 'light';
    if (newMode === 'OS') localStorage.theme = 'dark';
});
</script>

<template>
    <header
        class="bg-primary-400 fixed top-0 z-20 flex w-screen items-center justify-between px-6 py-2"
    >
        <nav class="flex items-center gap-2">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/admin">Admin</RouterLink>
            <DarkModeButton v-model="mode" class="text-primary-900" />
        </nav>
    </header>
    <div class="mt-20 h-full w-full px-2 lg:px-20"><RouterView /></div>
</template>

<!-- html {
  --s: 6px; /* control the size*/
  --c1: #ecbe13;
  --c2: #309292;

  --_g: radial-gradient(calc(var(--s)/2),var(--c1) 97%,#0000);
  background:
    var(--_g),var(--_g) calc(2*var(--s)) calc(2*var(--s)),
    repeating-conic-gradient(from 45deg,#0000 0 25%,var(--c2) 0 50%) calc(-.707*var(--s)) calc(-.707*var(--s)),
    repeating-linear-gradient(135deg,var(--c1) calc(var(--s)/-2) calc(var(--s)/2),var(--c2) 0 calc(2.328*var(--s)));
  background-size: calc(4*var(--s)) calc(4*var(--s));
} -->

<!-- html {
  --s: 40px; /* control the size*/
  --c1: #73c8a9;
  --c2: #dee1b6;
  --c3: #bd5532;
  --c4: #373b44;

  --c:,#0000 39%,var(--c1) 40% 93%,#0000 94%;
  --_s:calc(1.5*var(--s))/calc(4*var(--s)) calc(3*var(--s));
  background:
    radial-gradient(calc(1.5*var(--s)) at 37.5%   0%var(--c))
     calc(-.5*var(--s)) var(--_s),
    radial-gradient(calc(1.5*var(--s)) at 37.5% 100%var(--c))
     calc(1.5*var(--s)) var(--_s),
    radial-gradient(25% calc(50%/3),#0000 96%,var(--c2))
     0 0/calc(2*var(--s)) calc(3*var(--s)),
    repeating-conic-gradient(var(--c3) 0 25%,var(--c4) 0 50%)
     0 0/calc(4*var(--s)) calc(6*var(--s));
} -->

<!-- html {
  --s: 50px; /* control the size*/
  --c1: #ececec;
  --c2: #f1f1f1;

  --l:var(--c1) 20%,#0000 0;
  --g:35%,var(--c2) 0 45%,var(--c1) 0;
  background:
    linear-gradient(45deg,var(--l) 45%,var(--c1) 0 70%,#0000 0),
    linear-gradient(-45deg,var(--l) var(--g) 70%,#0000 0),
    linear-gradient(45deg,var(--c1) var(--g));
  background-size: var(--s) var(--s);
} -->
<style></style>

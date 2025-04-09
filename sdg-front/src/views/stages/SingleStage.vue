<template>
    <SubmitSolution
        v-if="session != undefined"
        :title="session.title"
        stage="Einzellösung"
        :description="session.description"
        :items="session.items"
        v-model="sendItems"
        :valid="listIsValid"
        :show-validation="showListValidation"
    >
        <template v-slot:username>
            <div class="flex w-full flex-col gap-1 lg:w-1/2">
                <input
                    v-model="username"
                    :class="[
                        showNameValidation
                            ? nameIsFree && nameIsValid
                                ? 'border-transparent'
                                : 'border-red-600'
                            : 'border-transparent',
                    ]"
                    class="w-full rounded border-2 bg-gray-200 p-1 pl-2 text-lg"
                    type="text"
                    placeholder="Nickname"
                />
                <p
                    v-if="showNameValidation"
                    class="px-2 text-xs"
                    :class="[nameIsValid && nameIsFree ? 'text-green-500' : 'text-red-600']"
                >
                    {{ nameValidationMessage }}
                </p>
            </div>
        </template>
        <template v-slot:button>
            <button
                @click="submitSolution"
                class="cursor-pointer rounded bg-cyan-500 p-4 hover:bg-cyan-400"
            >
                abgeben
            </button>
        </template>
    </SubmitSolution>
</template>

<script setup lang="ts">
import type { RankItem } from '@/types';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStoreSingles } from '@/stores/storeSingles';
import { useStorage } from '@vueuse/core';
import SubmitSolution from '@/components/SubmitSolution.vue';
import { AxiosHelper } from '@/AxiosHelper';

const axiosHelper = new AxiosHelper();

const router = useRouter();

const active = ref();
const session = ref(undefined);
getActive();
console.log('done');

const storeSingles = useStoreSingles();
const singleApplied = useStorage('single-applied', false);

const sendItems = ref([]);
const username = ref('');
const result = ref(0);
const showNameValidation = ref(false);
const showListValidation = ref(false);

const nameIsValid = computed(() => {
    return username.value.length > 0;
});
const nameIsFree = computed(() => {
    return storeSingles.singles.find((single) => single.username === username.value) === undefined;
});

const nameValidationMessage = computed(() => {
    if (!nameIsValid.value) return 'Gib einen Namen ein';
    if (!nameIsFree.value) return 'Der Name ist bereits vergeben';
    return 'sieht gut aus';
});

const listIsValid = computed(() => {
    return sendItems.value.length === 15;
});

async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + active.value.sessionId);
    session.value = sessionData.data;
    console.log(session.value);
}
async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
    console.log(active.value);

    getSession();
}

function submitSolution() {
    if (nameIsValid.value && nameIsFree.value && listIsValid.value) {
        calculateResult();
        if (session != undefined) {
            sendData({
                id: 0,
                username: username.value,
                items: sendItems.value,
                sessionId: session.value._id,
                result: result.value,
            });
        }
        singleApplied.value = true;
        router.push('/');
    } else {
        if (!nameIsFree.value || !nameIsValid.value) showNameValidation.value = true;

        if (!listIsValid.value) showListValidation.value = true;
        window.scrollTo(0, 0);
    }
}

function calculateResult() {
    result.value = 0;
    sendItems.value.forEach((item, index) => {
        result.value += Math.abs(item.rank - index);
    });
}

async function sendData(data) {
    const response = await axiosHelper.post('singles/create', data);
    console.log(response);
}
</script>

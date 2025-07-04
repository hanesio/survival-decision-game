<template>
    <SubmitSolution
        v-if="session != undefined"
        :title="session.title"
        stage="Meine Lösung"
        :description="session.description"
        :items="session.items"
        v-model="sendItems"
        :valid="listIsValid"
        :show-validation="showListValidation"
        :loading
    >
        <template v-slot:username>
            <div class="flex w-full flex-col gap-1 lg:w-1/2">
                <p class="dark:text-gray-400">
                    Merke dir deinen Nickname, du wirst ihn später noch einmal brauchen.
                </p>
                <input
                    v-model="username"
                    :class="[
                        showNameValidation
                            ? nameIsFree && nameIsValid
                                ? 'border-transparent'
                                : 'border-red-600'
                            : 'border-transparent',
                    ]"
                    class="w-full rounded border-2 bg-gray-200 p-1 pl-2 text-lg dark:bg-gray-500 dark:text-gray-200"
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
                class="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-sm p-4 text-white transition active:scale-90"
            >
                abgeben
            </button>
        </template>
    </SubmitSolution>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage, useTitle } from '@vueuse/core';
import SubmitSolution from '@/components/SubmitSolution.vue';
import { AxiosHelper } from '@/AxiosHelper';

const axiosHelper = new AxiosHelper();

const router = useRouter();
const loading = ref();

const active = ref();
const session = ref(undefined);
const singles = ref();
const usernameRegex = /^[a-zA-Z0-9.-_%]+$/;
const title = useTitle();
getActive();
getSingles();

const singleApplied = useStorage('single-applied', false);
const storeUser = useStorage('username', '');

const sendItems = ref([]);
const username = ref('');
const result = ref(0);
const showNameValidation = ref(false);
const showListValidation = ref(false);

const nameIsValid = computed(() => {
    return username.value.length > 0 && username.value.match(usernameRegex);
});
const nameIsFree = computed(() => {
    return singles.value.find((single) => single.username === username.value) === undefined;
});

const nameValidationMessage = computed(() => {
    if (!nameIsValid.value)
        return 'Gib einen Namen (ohne Sonderzeichen, Leerzeichen oder Umlaute) ein';
    if (!nameIsFree.value) return 'Der Name ist bereits vergeben';
    return 'sieht gut aus';
});

const listIsValid = computed(() => {
    return sendItems.value.length === 15;
});

async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + active.value.sessionId);
    session.value = sessionData.data;
    title.value = session.value.title + ' | Abgabe';
}
async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;

    await getSession();
}
async function getSingles() {
    const data = await axiosHelper.get('singles/find');
    singles.value = data.data;
}

function submitSolution() {
    loading.value = true;
    if (nameIsValid.value && nameIsFree.value && listIsValid.value) {
        calculateResult();
        if (session != undefined) {
            sendData({
                username: username.value,
                items: sendItems.value,
                sessionId: session.value._id,
                groupId: null,
                result: result.value,
            });
        }
        storeUser.value = username.value;
        singleApplied.value = true;
        router.push('/');
    } else {
        if (!nameIsFree.value || !nameIsValid.value) showNameValidation.value = true;

        if (!listIsValid.value) showListValidation.value = true;
        window.scrollTo(0, 0);
    }
    loading.value = false;
}

function calculateResult() {
    result.value = 0;
    sendItems.value.forEach((item, index) => {
        result.value += Math.abs(item.rank - index);
    });
}

async function sendData(data) {
    const response = await axiosHelper.post('singles/create', data);
}
</script>

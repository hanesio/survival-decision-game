<template>
    <SubmitSolution
        v-if="session"
        :title="session.title"
        stage="Gruppenlösung"
        :description="session.description"
        :items="session.items"
        v-model="sendItems"
        :valid="listIsValid"
        :show-validation="showListValidation"
        :show-group-decision="tabindex === -1"
        :single-items="singleItems"
    >
        <template v-slot:members>
            <div class="flex flex-col gap-1 p-4">
                <section class="flex flex-wrap gap-2">
                    <SinglePill
                        @click="handleMember(single._id)"
                        v-for="single in singles"
                        :username="single.username"
                    />
                </section>
                <p
                    v-if="showMemberValidation"
                    class="px-2 text-xs"
                    :class="[membersChosen ? 'text-green-500' : 'text-red-600']"
                >
                    {{ membersValidationMessage }}
                </p>
            </div>
            <div class="overflow flex w-screen overflow-scroll">
                <UserTab @click="tabindex = -1" label="Gruppe" :is-active="tabindex === -1" />
                <UserTab
                    @click="showSingleDecisions(index)"
                    v-for="(member, index) in members"
                    :is-active="tabindex === index"
                    :label="singles.find((single) => single._id === member).username"
                />
            </div>
        </template>

        <template v-if="tabindex === -1" v-slot:username>
            <div class="flex w-full flex-col gap-1 lg:w-1/2">
                <input
                    v-model="groupname"
                    :class="[
                        showNameValidation
                            ? nameIsFree && nameIsValid
                                ? 'border-transparent'
                                : 'border-red-600'
                            : 'border-transparent',
                    ]"
                    class="w-full rounded border-2 bg-gray-200 p-1 pl-2 text-lg dark:bg-gray-500 dark:text-gray-200"
                    type="text"
                    placeholder="Gruppenname"
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

        <template v-if="tabindex === -1" v-slot:button>
            <button
                @click="submitSolution"
                class="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-sm p-4 text-white"
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
import SinglePill from '@/components/SinglePill.vue';
import { AxiosHelper } from '@/AxiosHelper';
import UserTab from '@/components/UserTab.vue';

const axiosHelper = new AxiosHelper();
const router = useRouter();
const tabindex = ref(-1);

const active = ref();
const session = ref(undefined);
const singles = ref();
const groups = ref();
const groupnameRegex = /^[a-zA-Z0-9.-_%]+$/;
const title = useTitle();
handleRequests();

const groupApplied = useStorage('group-applied', false);
const singleItems = ref([]);
const sendItems = ref([]);
const groupname = ref('');
const result = ref(0);
let members = ref([]);
let newMembers = ref([]);
const showNameValidation = ref(false);
const showMemberValidation = ref(false);
const showListValidation = ref(false);

const nameIsValid = computed(() => {
    return groupname.value.length > 0 && groupname.value.match(groupnameRegex);
});

const nameIsFree = computed(() => {
    return groups.value.find((group) => group.groupname === groupname.value) === undefined;
});

const nameValidationMessage = computed(() => {
    if (!nameIsValid.value) return 'Gib einen Namen (ohne Sonderzeichen) ein';
    if (!nameIsFree.value) return 'Der Name ist bereits vergeben';
    return 'sieht gut aus';
});

const membersChosen = computed(() => {
    return members.value.length > 0;
});

const membersValidationMessage = computed(() => {
    if (!membersChosen.value) return 'Füge Gruppenmitglieder hinzu';
    return 'sieht gut aus';
});

const listIsValid = computed(() => {
    return sendItems.value.length === 15;
});

async function submitSolution() {
    if (nameIsValid.value && nameIsFree.value && membersChosen.value && listIsValid.value) {
        calculateResult();
        if (session != undefined) {
            const group = await sendData({
                groupname: groupname.value,
                items: sendItems.value,
                sessionId: session.value._id,
                members: members.value,
                result: result.value,
            });
            members.value.forEach((member) => {
                setSingles(member, group.data._id);
            });
        }
        groupApplied.value = true;
        router.push('/');
    } else {
        if (!nameIsFree.value || !nameIsValid.value) showNameValidation.value = true;

        if (!membersChosen.value) showMemberValidation.value = true;

        if (!listIsValid.value) showListValidation.value = true;
        window.scrollTo(0, 0);
    }
}

async function sendData(data) {
    const response = await axiosHelper.post('groups/create', data);
    return response;
}
async function setSingles(id: string, groupId: string) {
    const response = await axiosHelper.put('singles/update/' + id, { groupId: groupId });
    return response;
}

function calculateResult() {
    result.value = 0;
    sendItems.value.forEach((item, index) => {
        result.value += Math.abs(item.rank - index);
    });
}

function handleMember(singleId: number) {
    if (members.value.includes(singleId)) {
        newMembers.value = members.value.filter((member) => member != singleId);
        members.value = newMembers.value;
    } else members.value.push(singleId);
}

async function handleRequests() {
    await getActive();
    await getSession();
    await getSinglesBySession();
    await getGroups();
    filterSingles();
}

async function getActive() {
    const activeData = await axiosHelper.get('actives/find');
    active.value = activeData.data;
}
async function getSession() {
    const sessionData = await axiosHelper.get('sessions/find/' + active.value.sessionId);
    session.value = sessionData.data;
    title.value = session.value.title + ' | Gruppe';
}
async function getSinglesBySession() {
    const data = await axiosHelper.get('singles/find-by-session/' + active.value.sessionId);
    singles.value = data.data;
}
async function getGroups() {
    const data = await axiosHelper.get('groups/find');
    groups.value = data.data;
}
function filterSingles() {
    const singlesInGroups = [];
    groups.value.forEach((group) => {
        console.log(group.members);
        singlesInGroups.push(...group.members);
    });
    singles.value = singles.value.filter((single) => !singlesInGroups.includes(single._id));
}

function showSingleDecisions(index: number) {
    tabindex.value = index;
    singleItems.value = singles.value.find(
        (single) => single._id === members.value[tabindex.value],
    ).items;
}
</script>

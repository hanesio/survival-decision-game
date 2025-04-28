<template>
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-y-6">
        <div class="h-86 w-full min-w-0 p-4" v-for="(group, index) in singlesByGroup">
            <div class="flex">
                <div
                    class="bg-primary-200 flex justify-start gap-2 rounded-br-full rounded-tl-full px-8 py-1 text-2xl dark:bg-gray-900"
                >
                    <h3 class="dark:text-gray-00">Gruppe {{ index + 1 }}:</h3>
                    <h3 class="text-primary-600 dark:text-primary-400 font-semibold">
                        {{ group.groupvalue }}
                    </h3>
                </div>
            </div>
            <div class="l h-64">
                <BarChartDifferenceGroup :groupData="group" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BarChartDifferenceGroup from './BarChartDifferenceGroup.vue';

const props = defineProps({
    singleData: {
        type: Array<{ x: string; y: number; groupId: string }>,
        required: true,
    },
    groupData: {
        type: Array<{ x: string; y: number; _id: string }>,
        required: true,
    },
});
const singlesByGroup = [];
props.groupData.forEach((group) => {
    const compareGroup = {
        groupname: group.x,
        groupvalue: group.y,
        members: props.singleData
            .filter((single) => single.groupId === group._id)
            .map((single) => {
                return {
                    username: single.x,
                    value: single.y,
                    difference: single.y - group.y,
                    absDifference: Math.abs(single.y - group.y),
                    rest: single.y - group.y >= 0 ? group.y : single.y,
                    isBetter: single.y - group.y < 0,
                };
            }),
    };
    singlesByGroup.push(compareGroup);
});
</script>

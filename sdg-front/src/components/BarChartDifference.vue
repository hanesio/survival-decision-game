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
console.log(props.singleData);
console.log(singlesByGroup);
</script>

<template>
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <div class="h-72 p-4" v-for="group in singlesByGroup">
            <div class="h-64">
                <BarChartDifferenceGroup :groupData="group" />
            </div>
            <div class="flex justify-center">{{ group.groupname }}</div>
        </div>
    </div>
</template>

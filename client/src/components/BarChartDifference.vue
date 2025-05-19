<template>
    <div
        class="grid grid-cols-1 gap-2 lg:gap-8 lg:gap-y-6"
        :class="[groupData.length > 2 ? 'lg:grid-cols-3' : `lg:grid-cols-${groupData.length}`]"
    >
        <div class="h-76 w-full min-w-0" v-for="(group, index) in singlesByGroup">
            <div class="flex">
                <div
                    class="bg-primary-200 flex justify-start gap-2 rounded-br-full rounded-tl-full px-8 py-1 text-2xl dark:bg-gray-900"
                >
                    <h3 class="dark:text-gray-00">
                        {{ isAnonymous ? 'Gruppe ' + (index + 1) + ':' : group.groupname }}
                    </h3>
                    <h3 class="text-primary-600 dark:text-primary-400 font-semibold">
                        {{ group.groupvalue }}
                    </h3>
                </div>
            </div>
            <div class="h-64">
                <BarChartDifferenceGroup :groupData="group" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BarChartDifferenceGroup from './BarChartDifferenceGroup.vue';

const props = defineProps({
    singles: {
        type: Array<{ _id: string; username: string; result: number }>,
        required: true,
    },
    groupData: {
        type: Array<{ x: string; y: number; _id: string; members: Array<string> }>,
        required: true,
    },
    isAnonymous: {
        type: Boolean,
        default: true,
    },
});
const singlesByGroup = [];
props.groupData.forEach((group) => {
    const compareGroup = {
        groupname: group.x,
        groupvalue: group.y,
        members: props.singles
            .filter((sing) => group.members.includes(sing._id))
            .map((single) => {
                return {
                    username: single.username,
                    value: single.result,
                    difference: single.result - group.y,
                    absDifference: Math.abs(single.result - group.y),
                    rest: single.result - group.y >= 0 ? group.y : single.result,
                    isBetter: single.result - group.y < 0,
                };
            }),
    };
    singlesByGroup.push(compareGroup);
});
</script>

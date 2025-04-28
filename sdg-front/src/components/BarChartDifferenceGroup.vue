<template>
    <canvas ref="canvas"></canvas>
</template>
<script setup lang="ts">
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import { computed, onMounted, ref } from 'vue';

interface DifferenceSingle {
    username: string;
    value: number;
    difference: number;
    rest: number;
    isBetter: boolean;
}

interface SinglesByGroup {
    groupname: string;
    members: DifferenceSingle[];
}

const props = defineProps({
    groupData: {
        type: Object,
        required: true,
    },
});
const isDark = computed(() => {
    return (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
});
Chart.defaults.font.family = 'Inter, sans';
Chart.defaults.color = isDark.value ? 'white' : 'black';

const canvas = ref<HTMLCanvasElement>();
const primaryColor = '#763bff';
const primaryColorLight = '#b8a5ff';
const secondaryColor = '#fabb06';
const secondaryColorDark = '#954f0b';

const labels = props.groupData.members.map((member) => member.username);
const datasets = [];
props.groupData.members.forEach((member, index) => {
    datasets.push({
        data: [member.rest],
        backgroundColor: primaryColor,
        stack: index,
        order: 0,
        barPercentage: 0.6,
    });
    datasets.push({
        label: member.username,
        data: [member.absDifference],
        backgroundColor: member.isBetter ? primaryColorLight : secondaryColor,
        stack: index,
        order: 1,
        borderRadius: 4,
        barPercentage: 0.55,
    });
});

const data = {
    labels: [''],
    datasets,
};

const groupLine = {
    id: 'groupLine',
    afterDatasetsDraw(chart: Chart) {
        const {
            ctx,
            chartArea: { bottom, left, right, height },
            scales: { y },
        } = chart;

        const groupY =
            bottom - (height / y.ticks[y.ticks.length - 1].value) * props.groupData.groupvalue;
        const outside = right + 5;
        ctx.beginPath();
        ctx.moveTo(left, groupY);
        ctx.lineTo(right, groupY);
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        // ctx.font = '16px Inter';
        // ctx.fillStyle = primaryColor;
        // ctx.textBaseline = 'middle';
        // ctx.textAlign = 'left';
        // ctx.fillText(String(props.groupData.groupvalue), outside, groupY);

        // add total number at the end of the bar

        datasets.forEach((set, index) => {
            if (set.order === 1) {
                chart.getDatasetMeta(index).data.forEach((date, gindex) => {
                    const difference = set.data[gindex];

                    const distanceToBar = 10;
                    const diffLabel =
                        props.groupData.members[set.stack].difference > 0
                            ? '+' + props.groupData.members[set.stack].difference
                            : props.groupData.members[set.stack].difference;
                    const sumLabel = {
                        x: date.x,
                        y: date.y - distanceToBar,
                    };
                    const differenceLabel = {
                        x: date.x,
                        y: date.y + ((height / y.ticks[y.ticks.length - 1].value) * difference) / 2,
                    };
                    ctx.fillStyle = isDark.value ? 'white' : 'black';
                    ctx.textAlign = 'center';
                    ctx.font = ' normal 20px Inter';
                    ctx.fillText(diffLabel, sumLabel.x, sumLabel.y);

                    // ctx.fillStyle = 'gray';
                    // ctx.textAlign = 'center';
                    // ctx.font = ' normal 20px Inter';
                    // ctx.fillText(
                    //     String(props.groupData.members[set.stack].value),
                    //     sumLabel.x,
                    //     sumLabel.y,
                    // );

                    // ctx.font = ' bold 22px Inter';
                    // ctx.fillStyle = secondaryColorDark;
                    // ctx.fillText(
                    //     Math.abs(difference) > 10 ? String(difference) : '',
                    //     differenceLabel.x,
                    //     differenceLabel.y,
                    // );

                    ctx.font = ' normal 14px Inter';
                    ctx.fillStyle = isDark ? 'white' : 'black';
                    ctx.fillText(set.label, differenceLabel.x, bottom + 14);
                });
            }
        });
    },
};

const config: ChartConfiguration = {
    type: 'bar',
    data: data,
    plugins: [groupLine],
    options: {
        layout: {
            padding: {
                top: 30,
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: { drawTicks: false },
            },
            y: {
                stacked: true,
                grid: {
                    drawTicks: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },

            tooltip: {
                enabled: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    },
};

function displayChart() {
    if (!canvas.value) {
        console.log('no canvas');
        return;
    }

    new Chart(canvas.value, config);
}

onMounted(() => {
    displayChart();
});
</script>

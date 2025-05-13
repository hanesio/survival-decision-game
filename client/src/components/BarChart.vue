<template>
    <p class="text-primary-500 text-2xl font-semibold">Ø {{ average }}</p>
    <div class="h-58">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import { onMounted, ref, computed, watch } from 'vue';
import { useStoreDark } from '@/stores/storeDark';

const storeDark = useStoreDark();

const props = defineProps({
    chart_data: {
        type: Array<{ x: string; y: number }>,
        required: true,
    },
    tolerance: {
        type: Number,
        default: 0,
    },
});
let barchart;

const updateDark = computed(() => {
    return storeDark.dark;
});

const tol = computed(() => {
    return props.tolerance;
});
watch(updateDark, () => {
    barchart.options.scales.y.ticks.color = storeDark.dark ? 'white' : 'black';
    barchart.options.scales.x.ticks.color = storeDark.dark ? 'white' : 'black';
    barchart.update();
});

watch(tol, () => {
    barchart.update();
});

Chart.defaults.font.family = 'Inter, sans';
Chart.defaults.color = storeDark.dark ? 'white' : 'black';

const canvas = ref<HTMLCanvasElement>();
const labels = props.chart_data.map((label) => label.x);
const yValues = props.chart_data.map((data) => data.y);
const average = Math.floor((yValues.reduce((a, b) => a + b) / yValues.length) * 10) / 10;
const primaryColor = '#6913ff';

const datasets = [
    {
        data: yValues,
        backgroundColor: [
            '#ffea4a',
            '#ffdb20',
            '#fabb06',
            '#ea9902',
            '#b76706',
            '#954f0b',
            '#7a410d',
            '#462202',
            // '#b8a5ff',
            // '#9673ff',
            // '#763bff',
            // '#6913ff',
            // '#5b02ff',
            // '#5301eb',
            // '#3f03af',
            // '#240077',
        ],
        borderRadius: 2,
        barPercentage: 0.7,
    },
];

const data = {
    labels,
    datasets,
};

const averageLine = {
    id: 'averageLine',
    beforeDatasetsDraw(chart: Chart) {
        const {
            ctx,
            chartArea: { bottom, left, right, height },
            scales: { y },
        } = chart;

        const unit = height / y.ticks[y.ticks.length - 1].value;
        const averageY = bottom - unit * average;

        ctx.beginPath();
        ctx.moveTo(left, averageY);
        ctx.lineTo(right, averageY);
        ctx.strokeStyle = primaryColor + '40'; //25% opacity
        ctx.lineWidth = props.tolerance * unit;
        ctx.stroke();
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.font = '600 20px Inter';
        ctx.fillStyle = primaryColor;
        ctx.textBaseline = 'middle';
        ctx.fillText('Ø ' + String(average), right + 35, averageY);
    },
};
const numbersOnTop = {
    id: 'numbersOnTop',
    afterDatasetsDraw(chart: Chart) {
        const { ctx } = chart;

        props.chart_data.forEach((set, index) => {
            const distanceToBar = 15;
            const sumLabel = {
                x: chart.getDatasetMeta(0).data[index].x,
                y: chart.getDatasetMeta(0).data[index].y - distanceToBar,
            };

            ctx.fillStyle = storeDark.dark ? 'white' : 'black';
            ctx.textAlign = 'center';
            ctx.font = ' normal 20px Inter';
            ctx.fillText(String(set.y), sumLabel.x, sumLabel.y);
        });
    },
};

const config: ChartConfiguration = {
    type: 'bar',
    data: data,
    plugins: [averageLine, numbersOnTop],
    options: {
        layout: {
            padding: {
                // right: 70,
                top: 30,
            },
        },
        scales: {
            x: {
                grid: { drawTicks: false, color: storeDark.dark ? '#777' : '#aaa' },
            },
            y: {
                grid: {
                    drawTicks: false,
                    color: storeDark.dark ? '#777' : '#aaa',
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

    barchart = new Chart(canvas.value, config);
}

onMounted(() => {
    displayChart();
});
</script>

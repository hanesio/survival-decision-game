<script setup lang="ts">
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  chart_data: {
    type: Array<{x:string, y:number}>, 
    required:true
    },
});

Chart.defaults.font.family = 'Inter, sans';

const canvas = ref<HTMLCanvasElement>();
const labels = props.chart_data.map((label)=>label.x)
const yValues = props.chart_data.map((data)=>data.y)
const average = (Math.floor((yValues.reduce((a, b) => a + b) / yValues.length)*10))/10

const datasets = [{
    data: yValues,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
    ],}]

const data = {
  labels,
  datasets
};

const averageLine = {
    id: 'averageLine',
    afterDatasetsDraw(chart: Chart) {
        const {
            ctx,
            chartArea: { bottom, left, right, height },
            scales: { y },
        } = chart;

        const averageY = bottom - (height / y.ticks[y.ticks.length - 1].value) * average;

        ctx.beginPath();
        ctx.moveTo(left, averageY);
        ctx.lineTo(right, averageY);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = "16px Inter";
        ctx.fillStyle = "blue";
        ctx.textBaseline = "middle";
        ctx.fillText('Ø'+String(average),right +5,averageY);
    },
};

const config: ChartConfiguration = {
  type: 'bar',
  data: data,
  plugins:[averageLine],
  options: {
    layout: {
      padding: {
        right:70
      },
    },
    scales: {
      x: {
        grid: { drawTicks: false },
      },
      y: {
        grid: {
          drawTicks: false,
        },
      },
    },
    plugins: {
      legend: {
        display:false,
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

<template>
  <canvas ref="canvas"></canvas>
</template>

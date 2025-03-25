<script setup lang="ts">
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import { group } from 'console';
import {  onMounted, ref } from 'vue';

interface DifferenceSingle{
    username:string,
      value:number, 
      difference:number,
      rest: number,
      isBetter:boolean
    }

    interface SinglesByGroup {
      groupname:string;
      members:DifferenceSingle[]
    }




const props = defineProps({
  groupData: {
    type: Object, 
    required:true
    },
});

Chart.defaults.font.family = 'Inter, sans';

const canvas = ref<HTMLCanvasElement>();

const labels = props.groupData.members.map((member)=>member.username)
const datasets = []
props.groupData.members.forEach((member,index)=>{
  datasets.push({
    data:[member.rest],
    backgroundColor: 'rgb(0,200,255)',
    stack:index,
    order:0
  })
  datasets.push({
    label:member.username,
    data:[member.absDifference],
    backgroundColor:member.isBetter? 'green':'pink',
    stack:index,
    order:1,
    borderRadius:4,
  })
})

const data = {
  labels:[''],
  datasets
};

const groupLine = {
    id: 'groupLine',
    afterDatasetsDraw(chart: Chart) {
        const {
            ctx,
            chartArea: { bottom, left, right, height },
            scales: { y , x},
        } = chart;


        const groupY = bottom - (height / y.ticks[y.ticks.length - 1].value) * props.groupData.groupvalue;
        const outside = right + 5
        ctx.beginPath();
        ctx.moveTo(left, groupY);
        ctx.lineTo(right, groupY);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.font = "16px Inter";
        ctx.fillStyle = "blue";
        ctx.textBaseline = "middle";
        ctx.textAlign = "left"
        ctx.fillText(String(props.groupData.groupvalue),outside,groupY);


        // add total number at the end of the bar
        
         datasets.forEach((set,index)=>{
          if(set.order===1)
            {chart.getDatasetMeta(index).data.forEach((date,gindex)=>{
              const difference = set.backgroundColor==='green' ? set.data[gindex] * -1 :set.data[gindex]
              
              const distanceToBar = 12;
              const sumLabel = {
                        x: date.x,
                        y: date.y - distanceToBar,
                    };
              const differenceLabel = {
                        x: date.x,
                        y: date.y + ((height / y.ticks[y.ticks.length - 1].value) *difference)/2,
                    };
                    ctx.fillStyle = 'gray';
                    ctx.textAlign = "center";
                    ctx.font = ' normal 20px Inter'
                    ctx.fillText(String(props.groupData.members[set.stack].value), sumLabel.x, sumLabel.y);
                    
                    ctx.font = ' bold 22px Inter'
                    ctx.fillStyle = 'darkred';
                    ctx.fillText(Math.abs(difference)>10? String(difference):'', differenceLabel.x, differenceLabel.y);
            });}
          

         }) 
    },
};

const config: ChartConfiguration = {
  type: 'bar',
  data: data,
  plugins:[groupLine],
  options: {  
    layout: {
      padding: {
        right:30
      },
    },
    scales: {
      x: {
        stacked:true,
        grid: { drawTicks: false },
      },
      y: {
        stacked:true,
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

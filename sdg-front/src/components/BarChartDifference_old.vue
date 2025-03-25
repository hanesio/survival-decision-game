<script setup lang="ts">
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import { group } from 'console';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  singleData: {
    type: Array<{x:string, y:number, groupId:number}>, 
    required:true
    },
  groupData: {
    type: Array<{x:string, y:number, groupId:number}>, 
    required:true
    },
});

Chart.defaults.font.family = 'Inter, sans';

const canvas = ref<HTMLCanvasElement>();
const labels = props.groupData.map((label)=>label.x)
const groupValues = props.groupData.map((data)=>data.y)
console.log(groupValues);


const singlesByGroup = []
props.groupData.forEach((group)=>{
  singlesByGroup.push(props.singleData.filter((single)=>single.groupId === group.groupId).map((single)=>single.y))
})
const singlesByGroupSubstracted = []
props.groupData.forEach((group)=>{
  singlesByGroupSubstracted.push(props.singleData.filter((single)=>single.groupId === group.groupId).map((single)=>Math.abs(single.y-group.y)))
})


const groupsBySingle = []
singlesByGroup.forEach((singles:number[])=>{
  singles.forEach((single, index)=>{
    if(groupsBySingle[index] ===undefined)
    groupsBySingle[index] = [single]
  else
  groupsBySingle[index].push(single)
  })
})
const groupsBySingleSubstracted = []
singlesByGroupSubstracted.forEach((singles:number[])=>{
  singles.forEach((single, index)=>{
    if(groupsBySingleSubstracted[index] ===undefined)
    groupsBySingleSubstracted[index] = [single]
  else
  groupsBySingleSubstracted[index].push(single)
  })
})

console.log(groupsBySingleSubstracted);

const datasets = []

groupsBySingleSubstracted.forEach((stripes,index)=>{
  datasets.push({
    data:groupValues
    ,
    stack:index,
    order:0
  })
  datasets.push({
    data:stripes,
    backgroundColor:'red',
    stack:index,
    order:1
  })
})



console.log(datasets);


const data = {
  labels,
  datasets
};

const groupLine = {
    id: 'groupLine',
    afterDatasetsDraw(chart: Chart) {
        const {
          tooltip,
            ctx,
            chartArea: { bottom, left, right, height },
            scales: { y , x},
        } = chart;


        groupValues.forEach((groupValue,index)=>{
            const groupY = bottom - ((height / y.ticks[y.ticks.length - 1].value) * groupValue);
            const padding = 40

            ctx.beginPath();
            ctx.moveTo(x._gridLineItems[index].x1, groupY);
            ctx.lineTo(x._gridLineItems[index+1].x1-padding, groupY);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.font = "16px Inter";
            ctx.fillStyle = "blue";
            ctx.textBaseline = "middle";
            ctx.fillText(String(groupValue),x._gridLineItems[index+1].x1-30,groupY);
            })
        // add total number at the end of the bar
        
         datasets.forEach((set,index)=>{

          if(set.backgroundColor ==='red' ){
            chart.getDatasetMeta(index).data.forEach((date,gindex)=>{
              
              const distanceToBar = 10;
              const sumLabel = {
                        x: date.x,
                        y: date.y - distanceToBar,
                    };
              const differenceLabel = {
                        x: date.x,
                        y: date.y + date.height/2,
                    };
                    ctx.fillStyle = 'black';
                    ctx.textAlign = "center";
                    ctx.fillText(String(groupsBySingle[set.stack][gindex])+'(+' + set.data[gindex] + ')', sumLabel.x, sumLabel.y);
                    
                    // ctx.fillStyle = 'black';
                    // ctx.fillText(String(set.data[gindex]), differenceLabel.x, differenceLabel.y);
            });
          }
          
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
        // top:50,
        right:70
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

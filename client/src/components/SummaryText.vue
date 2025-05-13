<template>
    <div class="rounded-xs bg-gray-200 p-2 dark:bg-gray-900">
        <p class="">{{ text }}</p>
    </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';

const props = defineProps({
    type: { type: String, required: true },
    singleData: Object,
    groupData: Object,
    tolerance: { type: Number, default: 0 },
});

const tol = computed(() => {
    return props.tolerance;
});
watch(tol, () => {
    analyze();
});

let text;
analyze();

function analyze() {
    if (props.type === 'single') {
        text = analyzeSingles();
    }

    if (props.type === 'group') {
        text = analyzeGroups();
    }

    if (props.type === 'compare') {
        text = analyzeComparison();
    }
}

function analyzeSingles(): string {
    let outputtext = '';
    let sum = 0;
    props.singleData.forEach((single) => {
        sum += single.y;
    });
    const average = sum / props.singleData.length;
    let outlierGood = 0;
    let outlierBad = 0;

    props.singleData.forEach((single) => {
        const divergence = single.y - average;
        console.log(divergence);
        if (divergence < 0 - props.tolerance / 2) {
            outlierGood++;
            console.log(single.x);
        }
        if (divergence > 0 + props.tolerance / 2) outlierBad++;
    });

    if (outlierBad + outlierGood < props.singleData.length / 2) {
        outputtext = 'Die Ergebnisse verteilen sich um den Durchschnitt';
        if (outlierBad > 0) outputtext += ` mit ${outlierBad} Abweichungen nach oben`;
        if (outlierGood > 0) outputtext += ` und ${outlierGood} nach unten`;
        outputtext += '.';
    } else
        outputtext =
            outlierGood +
            ' sind deutlich besser als der Durchschnitt, ' +
            outlierBad +
            ' sind schlechter.';

    outputtext += ` Bei einer Toleranz von ${props.tolerance}`;
    return outputtext;
}

function analyzeGroups(): string {
    props.groupData.forEach((group) => {});

    return (
        'Die Ergebnisse unterscheiden sich stark.' + // unterscheiden sich oder sind ähnlich
        'X Gruppe n sind / ist schlechter als der Durchschnitt Einzelner.' // Gruppe schlechter als Durchschnitt singles
    );
}
function analyzeComparison(): string {
    props.groupData.forEach((group) => {});

    return (
        'Die meisten (mehr als die Hälfte) haben sich in der Gruppe verbessert,' +
        ' viele/ manche / wenige / keiner / Anzahl sehr stark (mehr als x Punkte),' +
        'keiner / Anzahl verschlechtert.' +
        ' Die Gruppe ist besser als oder gleich wie der Einzelne dieser Gruppe.'
    );
}
</script>

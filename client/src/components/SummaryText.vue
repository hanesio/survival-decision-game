<template>
    <div class="rounded-xs bg-gray-200 p-2 dark:bg-gray-900">
        <p class="">{{ text }}</p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    type: { type: String, required: true },
    singleData: Object,
    groupData: Object,
});

let text;

if (props.type === 'single') {
    text = analyzeSingles();
}

if (props.type === 'group') {
    text = analyzeGroups();
}

if (props.type === 'compare') {
    text = analyzeComparison();
}

function analyzeSingles(): string {
    let outputtext = '';
    let sum = 0;
    const tolerance = 20;
    props.singleData.forEach((single) => {
        sum += single.y;
    });
    const average = sum / props.singleData.length;
    let outlierGood = 0;
    let outlierBad = 0;

    props.singleData.forEach((single) => {
        const divergence = single.y - average;
        if (divergence < 0 - tolerance / 2) outlierGood++;
        if (divergence > 0 + tolerance / 2) outlierBad++;
    });

    if (outlierBad + outlierGood < props.singleData.length / 2)
        outputtext =
            'Die Ergebnisse verteilen sich um den Durchschnitt mit Abweichungen nach oben und unten.';
    else
        outputtext =
            outlierGood +
            ' sind deutlich besser als der Durchschnitt, ' +
            outlierBad +
            ' sind schlechter.';

    return outputtext;
}

function analyzeGroups(): string {
    props.groupData.forEach((group) => {});

    return 'Die Ergebnisse unterscheiden sich stark. Eine Gruppe ist schlechter als der Durschnitt Einzelner.';
}
function analyzeComparison(): string {
    props.groupData.forEach((group) => {});

    return 'Die meisten haben sich in der Gruppe verbessert, manche sehr stark, kener verschlechtert. Die Gruppe ist besser als oder gleich wie der Einzelne dieser Gruppe.';
}
</script>

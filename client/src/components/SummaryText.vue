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
    const average = calculateAverage(props.singleData);
    let outlierLow = 0;
    let outlierHigh = 0;

    props.singleData.forEach((single) => {
        const divergence = single.y - average;
        if (divergence < 0 - props.tolerance / 2) {
            outlierLow++;
            console.log(single.x);
        }
        if (divergence > 0 + props.tolerance / 2) outlierHigh++;
    });

    if (outlierHigh + outlierLow < props.singleData.length / 2) {
        outputtext = 'Die Ergebnisse verteilen sich um den Durchschnitt mit';
        if (outlierHigh === 1) outputtext += ` einer Abweichung nach oben`;
        if (outlierHigh > 1) outputtext += ` ${outlierHigh} Abweichungen nach oben`;

        if (outlierLow > 0 && outlierHigh > 0) outputtext += ' und ';

        if (outlierLow === 1) outputtext += ` einer Abweichung nach unten`;
        if (outlierLow > 1) outputtext += ` ${outlierLow} Abweichungen nach unten`;
        outputtext += '.';
    } else
        outputtext =
            'Die Ergebnisse unterscheiden sich stark. ' +
            outlierLow +
            ' Spieler*innen sind deutlich besser als der Durchschnitt, ' +
            outlierHigh +
            ' sind schlechter.';

    return outputtext;
}

function analyzeGroups(): string {
    let outputtext = 'Die Ergebnisse unterscheiden sich';
    const average = calculateAverage(props.groupData);

    let outliers = 0;

    props.groupData.forEach((group) => {
        const divergence = group.y - average;
        Math.abs(divergence) > props.tolerance / 2 && outliers++;
    });
    let isEqual = true;
    let tempValue = 0;
    props.groupData.forEach((group, index) => {
        if (index != 0) {
            if (tempValue != group.y) isEqual = false;
        }
        tempValue = group.y;
    });

    if (outliers === 0) {
        if (isEqual) outputtext += ' nicht.';
        else outputtext += ' kaum.';
    } else outputtext += ' stark.';
    const averageSingles = calculateAverage(props.singleData);
    let highGroups = 0;
    props.groupData.forEach((group) => {
        const difference = group.y - averageSingles;
        difference > 0 && highGroups++;
    });

    if (highGroups > 0) {
        if (highGroups === 1) outputtext += ' Eine Gruppe ist ';
        if (highGroups > 1) outputtext += ` ${highGroups} Gruppen sind `;
    } else {
        outputtext += ' Keine Gruppe ist';
    }
    outputtext += ' schlechter als der Durchschnitt Einzelner.';

    return outputtext;
}
function analyzeComparison(): string {
    const border = 10;
    let outputtext = '';
    let higherThanGroup = 0;
    let strong = 0;
    props.groupData.forEach((group) => {
        group.members.forEach((member) => {
            const memberResult = props.singleData.find((single) => single._id === member).y;
            const difference = memberResult - group.y;
            difference > 0 && higherThanGroup++;
            difference > border && strong++;
        });
    });

    const halfThePeople = props.singleData.length / 2;
    const mostImproved = halfThePeople < higherThanGroup;
    if (higherThanGroup === 0) {
        outputtext += 'Niemand hat';
    } else {
        if (mostImproved) outputtext += 'Die meisten haben';
        else outputtext += 'Weniger als die Hälfte haben';
    }

    outputtext += ' sich in der Gruppe verbessert.';

    switch (strong) {
        case 0:
            outputtext += ' Keiner';
            break;
        case 1:
            outputtext += ' Einer';
            break;
        default:
            outputtext += ' ' + strong;
    }
    outputtext += ` sehr stark (mehr als ${border} Punkte).`;
    // ' Die Gruppe ist besser als oder gleich wie der Einzelne dieser Gruppe.'
    return outputtext;
}
function calculateAverage(array: Record<string, any>): number {
    let sum = 0;
    array.forEach((item) => {
        sum += item.y;
    });
    return sum / array.length;
}
</script>

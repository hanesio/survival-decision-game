import { defineStore } from 'pinia';
import { type Preset } from '@/types';

interface PresetsState {
    presets: Preset[];
}

export const useStorePresets = defineStore('storePresets', {
    state: (): PresetsState => {
        return {
            presets: [
                {
                    _id: 'a',
                    title: 'NASA Weltraumspiel',
                    description:
                        'Ein Raumschiff hat auf dem Mond eine Bruchlandung gemacht. Es sollte auf sein Mutterschiff treffen, das sich 200 Kilometer entfernt auf der hellen (der Sonne zugewandten) Seite des Mondes befindet. Die Bruchlandung hat das Raumschiff völlig zerstört. Das Überleben der Mannschaft hängt davon ab, ob sie das Mutterschiff erreichen kann. Von der Ausrüstung sind nur 15 Gegenstände unbeschädigt geblieben. Die Teilnehmer sollen die Ausrüstungsgegenstände auswählen, die für die Überwindung der 200 Kilometer bis zum Standort ihres Mutterschiffes am wichtigsten sind. Ihre Überlebenschance hängt davon ab, ob sie in diesem Spiel die richtigen Ausrüstungsgegenstände für eine Mondexpedition auswählen können. ',
                    items: [
                        {
                            description: 'Zwei 100-Kilogramm-Tanks Sauerstoff',
                            explanation: ' Zum Atmen notwendig. ',
                            rank: 0,
                        },
                        {
                            description: '20 Liter Wasser',
                            explanation:
                                'Ersetzt Flüssigkeitsverlust, der durch Schwitzen entsteht.',
                            rank: 1,
                        },
                        {
                            description: 'Sternatlas',
                            explanation:
                                'Eines der wichtigsten Mittel, um Richtungen zu bestimmen. ',
                            rank: 2,
                        },
                        {
                            description: 'Lebensmittelkonzentrat',
                            explanation: 'Täglicher Nahrungsbedarf. ',
                            rank: 3,
                        },
                        {
                            description: 'Mit Sonnenenergie angebtriebener UKW-Sender/Empfänger',
                            explanation:
                                'Notsignal-Sender: vielleicht ist Kommunikation mit dem Mutterschiff möglich. ',
                            rank: 4,
                        },
                        {
                            description: 'Fünfzig Meter Nylonseil',
                            explanation: 'Nützlich, um Verletzte zu leiten und zum Klettern. ',
                            rank: 5,
                        },
                        {
                            description: 'Erste-Hilfe-Koffer mit Injektionsnadeln',
                            explanation: 'Wertvolle Tabletten oder Injektionen.',
                            rank: 6,
                        },
                        { description: 'Fallschirmseide', explanation: 'Sonnenschutz', rank: 7 },
                        {
                            description: 'Sich selbst aufblasendes Lebensrettungsfloß',
                            explanation:
                                'CO2-Flaschen (zum Aufblasen des Floßes) als Antrieb zum Überwinden von Klüften etc.',
                            rank: 8,
                        },
                        {
                            description: 'Signalleuchtkugeln',
                            explanation: 'Notsignal, wenn man in Sichtweite ist',
                            rank: 9,
                        },
                        {
                            description: 'Zwei Pistolen Kaliber .45',
                            explanation: 'Mit ihnen könnten Antriebsversuche gemacht werden',
                            rank: 10,
                        },
                        {
                            description: 'Trockenmilch',
                            explanation: 'Nahrung, mit Wasser gemischt trinkbar.',
                            rank: 11,
                        },
                        {
                            description: 'Tragbares Heizgerät/Kocher',
                            explanation: 'Nur auf der dunklen Seite des Mondes notwendig.',
                            rank: 12,
                        },
                        {
                            description: 'Magnetkompass',
                            explanation:
                                'Wahrscheinlich kein polarisiertes Magnetfeld auf dem Mond, daher nutzlos.',
                            rank: 13,
                        },
                        {
                            description: 'Streichhölzer',
                            explanation: 'Kein Nutzen auf dem Mond. ',
                            rank: 14,
                        },
                    ],
                },
                {
                    _id: 'b',
                    title: 'Verschollen auf See',
                    description:
                        'Du fährst mit einem Schiff über den Atlantischen Ozean. Derzeit bist du tausend Meilen vom Festland entfernt. Plötzlich tritt ein Notfall ein, das Schiff geht unter. Du kannst dich mit einigen anderen auf ein Rettungsboot retten. Dieses ist ein Ruderboot, ohne Motor. In deiner Jackentasche hast du nur einige persönliche Gegenstände (Geld, Feuerzeug, etc.). Ihr konntet aber noch weitere fünfzehn Gegenstände auf das Rettungsboot transportieren. Bewerte nun die Wichtigkeit der fünfzehn Gegenstände für euer Überleben, von 1 (am wichtigsten) bis 15 (am unwichtigsten).',
                    items: [
                        {
                            description: 'Rasierspiegel',
                            explanation: 'Zum Signalisieren an Rettungsschiffe- und Flugzeuge',
                            rank: 0,
                        },
                        {
                            description: '10 Liter Dieseltreibstoff ',
                            explanation:
                                'Erlaubt das Signalisieren (kann mittels Papier (Geldscheine!) und Feuerzeug angezündet werden)',
                            rank: 1,
                        },
                        {
                            description: '20 Liter Trinkwasser',
                            explanation:
                                'Unbedingt notwendig zum Überleben. Wasser ist viel wichtiger als Nahrung!',
                            rank: 2,
                        },
                        {
                            description: 'Notrationen (Nahrung)',
                            explanation: 'Ebenfalls sehr wichtig zum Überleben.',
                            rank: 3,
                        },
                        {
                            description: '4m² Kunststofffolie',
                            explanation:
                                'eignet sich zum Auffangen von Regenwasser (Salzwasser aus dem Meer kann nicht getrunken werden)',
                            rank: 4,
                        },
                        {
                            description: '2 Kartons Schokolade',
                            explanation: 'eignet sich als Nahrungsmittel',
                            rank: 5,
                        },
                        {
                            description: 'Angel samt Zubehör',
                            explanation:
                                'Wird niedriger eingestuft als Schokolade, da es keine Garantie dafür gibt, dass Sie Fische fangen, während Sie die Schokolade bereits zur Hand haben.',
                            rank: 6,
                        },
                        {
                            description: '5m Nylon-Seil',
                            explanation:
                                'Kann verwendet werden, um Personen oder Ausrüstung zusammenzubinden und so zu verhindern, dass sie über Bord gespült werden',
                            rank: 7,
                        },
                        {
                            description: 'Schwimmweste',
                            explanation: 'hilfreich bei stürmischer See, damit niemand ertrinkt',
                            rank: 8,
                        },
                        {
                            description: 'Harpune',
                            explanation: 'Hilfsmittel beim Fischen, Abwehr von Haien',
                            rank: 9,
                        },
                        {
                            description: '2 Liter hochprozentiger Rum (80 %)',
                            explanation:
                                'Dient zur Wunddesinfektion. Nicht zum Verzehr, da der Wasserbedarf dadurch steigt.',
                            rank: 10,
                        },
                        {
                            description: 'Transistorradio',
                            explanation:
                                'eher nutzlos, dient nur zum Empfang, kann möglicherweise keinen Sender in Reichweite erreichen',
                            rank: 11,
                        },
                        {
                            description: 'Seekarte',
                            explanation:
                                'relativ nutzlos, da die eigene Position nicht genau genug bekannt ist und das Erreichen der Küste auch bei korrekter Navigation zu lange dauern würde',
                            rank: 12,
                        },
                        {
                            description: 'Moskitonetz',
                            explanation: 'unnütz, mitten am Ozean gibt es keine Mücken',
                            rank: 13,
                        },
                        {
                            description: 'Sextant',
                            explanation:
                                'kann nur mit Uhr korrekt eingesetzt werden, Navigation ohnehin irrelevant',
                            rank: 14,
                        },
                    ],
                },
            ],
        };
    },
    actions: {},
    getters: {
        getPreset: (state) => {
            return (id: any) => {
                return state.presets.map((preset) => preset._id === id)[0];
            };
        },
    },
});

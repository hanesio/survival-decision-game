import { defineStore } from 'pinia'
import { type Preset } from '@/types'

interface PresetsState {
  presets: Preset[]
}

export const useStorePresets = defineStore('storePresets', {
  state: (): PresetsState => {
    return {
      presets: [
        {
          id: 0,
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
              explanation: 'Ersetzt Flüssigkeitsverlust, der durch Schwitzen entsteht.',
              rank: 1,
            },
            {
              description: 'Sternatlas',
              explanation: 'Eines der wichtigsten Mittel, um Richtungen zu bestimmen. ',
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
            { description: 'Streichhölzer', explanation: 'Kein Nutzen auf dem Mond. ', rank: 14 },
          ],
        },
        {
          id: 1,
          title: 'Lost at Sea',
          description:
            'You have chartered a yacht with three friends, for the holiday trip of a lifetime across the Atlantic Ocean. Because none of you have any previous sailing experience, you have hired an experienced skipper and two-person crew. Unfortunately in mid Atlantic a fierce fire breaks out in the ships galley and the skipper and crew have been lost whilst trying to fight the blaze. Much of the yacht is destroyed and is slowly sinking. Your location is unclear because vital navigational and radio equipment have been damaged in the fire. Your best estimate is that you are many hundreds of miles from the nearest landfall. You and your friends have managed to save 15 items, undamaged and intact after the fire. In addition, you have salvaged a four man rubber life craft and a box of matches. Your task is to rank the 15 items in terms of their importance for you, as you wait to be rescued. Place the number 1 by the most important item, the number 2 by the second most important and so forth until you have ranked all 15 items.',
          items: [
            {
              description: 'Rasierspiegel',
              explanation: ' Zum Atmen notwendig. ',
              rank: 0,
            },
            {
              description: '20 Liter Wasser',
              explanation: 'Ersetzt Flüssigkeitsverlust, der durch Schwitzen entsteht.',
              rank: 1,
            },
            {
              description: 'Sternatlas',
              explanation: 'Eines der wichtigsten Mittel, um Richtungen zu bestimmen. ',
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
            { description: 'Streichhölzer', explanation: 'Kein Nutzen auf dem Mond. ', rank: 14 },
          ],
        },
      ],
    }
  },
  actions: {},
  getters: {
    getPreset: (state) => {
      return (id: any) => {
        return state.presets.map((preset) => preset.id === id)[0]
      }
    },
  },
})

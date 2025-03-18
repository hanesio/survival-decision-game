import { defineStore } from 'pinia'
import { type Group } from '@/types'

interface GroupsState {
  groups: Group[]
}

export const useStoreGroups = defineStore('storeGroups', {
  state: (): GroupsState => {
    return {
      groups: [
        {
          id: 0,
          name: 'Gruppe A',
          password: '123',
          items: [
            {
              description: 'Zwei 100-Kilogramm-Tanks Sauerstoff',
              explanation: ' Zum Atmen notwendig. ',
            },
            {
              description: '20 Liter Wasser',
              explanation: 'Ersetzt Flüssigkeitsverlust, der durch Schwitzen entsteht.',
            },
            {
              description: 'Sternatlas',
              explanation: 'Eines der wichtigsten Mittel, um Richtungen zu bestimmen. ',
            },
            { description: 'Lebensmittelkonzentrat', explanation: 'Täglicher Nahrungsbedarf. ' },
            {
              description: 'Mit Sonnenenergie angebtriebener UKW-Sender/Empfänger',
              explanation:
                'Notsignal-Sender: vielleicht ist Kommunikation mit dem Mutterschiff möglich. ',
            },
            {
              description: 'Fünfzig Meter Nylonseil',
              explanation: 'Nützlich, um Verletzte zu leiten und zum Klettern. ',
            },
            {
              description: 'Erste-Hilfe-Koffer mit Injektionsnadeln',
              explanation: 'Wertvolle Tabletten oder Injektionen.',
            },
            { description: 'Fallschirmseide', explanation: 'Sonnenschutz' },
            {
              description: 'Sich selbst aufblasendes Lebensrettungsfloß',
              explanation:
                'CO2-Flaschen (zum Aufblasen des Floßes) als Antrieb zum Überwinden von Klüften etc.',
            },
            {
              description: 'Signalleuchtkugeln',
              explanation: 'Notsignal, wenn man in Sichtweite ist',
            },
            {
              description: 'Zwei Pistolen Kaliber .45',
              explanation: 'Mit ihnen könnten Antriebsversuche gemacht werden',
            },
            { description: 'Trockenmilch', explanation: 'Nahrung, mit Wasser gemischt trinkbar.' },
            {
              description: 'Tragbares Heizgerät/Kocher',
              explanation: 'Nur auf der dunklen Seite des Mondes notwendig.',
            },
            {
              description: 'Magnetkompass',
              explanation:
                'Wahrscheinlich kein polarisiertes Magnetfeld auf dem Mond, daher nutzlos.',
            },
            { description: 'Streichhölzer', explanation: 'Kein Nutzen auf dem Mond. ' },
          ],
          sessionId: 0,
          members: [1],
          result: 0,
        },
      ],
    }
  },
  actions: {},
  getters: {},
})

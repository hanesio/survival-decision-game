import { defineStore } from 'pinia'
import { type Session } from '@/types'

interface SessionsState {
  sessions: Session[]
}

export const useStoreSessions = defineStore('storeSessions', {
  state: (): SessionsState => {
    return {
      sessions: [
        {
          id: 0,
          name: 'Theodor Test',

          date: new Date(),
          title: 'NASA Weltraumspiel',
          description:
            'Ein Raumschiff hat auf dem Mond eine Bruchlandung gemacht. Es sollte auf sein Mutterschiff treffen, das sich 200 Kilometer entfernt auf der hellen (der Sonne zugewandten) Seite des Mondes befindet. Die Bruchlandung hat das Raumschiff völlig zerstört. Das Überleben der Mannschaft hängt davon ab, ob sie das Mutterschiff erreichen kann. Von der Ausrüstung sind nur 15 Gegenstände unbeschädigt geblieben. Die Teilnehmer sollen die Ausrüstungsgegenstände auswählen, die für die Überwindung der 200 Kilometer bis zum Standort ihres Mutterschiffes am wichtigsten sind. Ihre Überlebenschance hängt davon ab, ob sie in diesem Spiel die richtigen Ausrüstungsgegenstände für eine Mondexpedition auswählen können. ',
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
          stage: 0,
        },
      ],
    }
  },
  actions: {},
  getters: {},
})

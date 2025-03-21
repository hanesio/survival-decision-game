import { defineStore } from 'pinia'
import { type RankItem, type Session } from '@/types'

interface SessionsState {
  sessions: Session[]
}

export const useStoreSessions = defineStore('storeSessions', {
  state: (): SessionsState => {
    return {
      sessions: [
        {
          id: 0,
          name: 'Waldwuffels',

          date: new Date('September 5, 2023 12:24:00'),
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
      ],
    }
  },
  actions: {
    addSession(name: string, date: Date, title: string, description: string, items: RankItem[]) {
      let lastId: number

      if (this.sessions.length > 0) {
        lastId = this.sessions.slice(-1)[0].id
      } else {
        lastId = -1
      }
      const id = lastId + 1
      let session: Session = {
        id,
        name,
        date,
        title,
        description,
        items,
      }
      this.sessions.push(session)
      return id
    },
  },
  getters: {},
})

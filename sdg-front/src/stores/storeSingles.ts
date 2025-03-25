import { defineStore } from 'pinia'
import { type RankItem, type Single } from '@/types'
import { setgroups } from 'process'

export interface SinglesState {
  singles: Single[]
}
export const useStoreSingles = defineStore('storeSingles', {
  state: (): SinglesState => {
    return {
      singles: [
        {
          id: 0,
          username: 'Tim',
          password: '123',
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
          sessionId: 0,
          groupId: 0,
          result: 59,
        },
        {
          id: 1,
          username: 'Peter',
          password: '123',
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
          sessionId: 0,
          groupId: 0,
          result: 72,
        },
        {
          id: 2,
          username: 'Tarek',
          password: '123',
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
          sessionId: 0,
          groupId: 0,
          result: 48,
        },
        {
          id: 3,
          username: 'Walter',
          password: '123',
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
          sessionId: 0,
          groupId: 1,
          result: 62,
        },
        {
          id: 4,
          username: 'Orban',
          password: '123',
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
          sessionId: 0,
          groupId: 1,
          result: 85,
        },
        {
          id: 5,
          username: 'Steffi',
          password: '123',
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
          sessionId: 0,
          groupId: 1,
          result: 56,
        },
      ],
    }
  },
  actions: {
    addSingle(
      username: string,
      password: string,
      items: RankItem[],
      sessionId: number,
      result: number,
    ) {
      let lastId: number

      if (this.singles.length > 0) {
        lastId = this.singles.slice(-1)[0].id
      } else {
        lastId = -1
      }
      const id = lastId + 1
      const single: Single = {
        id,
        username,
        password,
        items,
        sessionId,
        result,
      }
      this.singles.push(single)
      return id
    },
    setGroupId(singleId: number, groupId: number) {
      // this.getSingle(singleId)
      this.singles.find((single) => single.id === singleId).groupId = groupId
    },
  },
  getters: {
    getSingle: (state) => {
      return (id: number) => {
        return state.singles.map((single) => single.id === id)[0]
      }
    },
  },
})

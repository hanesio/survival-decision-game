export interface Preset {
  id: number
  title: string
  description: string
  items: RankItem[]
}
export interface Session {
  id: number
  name: string
  date: Date
  title: string
  description: string
  items: RankItem[]
  stage: number // enum wäre sprechender
}

export interface Group {
  id: number
  name: string
  password: string
  items: RankItem[]
  sessionId: number
  members: number[]
  result: number
}

export interface Single {
  id: number
  name: string
  password: string
  items: RankItem[] // TODO shorthand oder id für bessere iteration, Lösungsbemerkung
  sessionId: number
  groupId: number
  result: number
}

export interface RankItem {
  description: string
  explanation: string
  rank?: number
}

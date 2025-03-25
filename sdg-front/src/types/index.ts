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
  comment?: string
}

export interface Group {
  id: number
  groupname: string
  items: RankItem[]
  sessionId: number
  members: number[]
  result: number
}

export interface Single {
  id: number
  username: string
  password: string
  items: RankItem[] // TODO shorthand oder id für bessere iteration, Lösungsbemerkung
  sessionId: number
  groupId?: number
  result: number
}

export interface RankItem {
  description: string
  explanation: string
  rank: number
}
export interface Setting {
  name: string
  value: any
}
export interface Active {
  stage: 'single' | 'group' | 'results'
  sessionId: number | null
}

export enum Stages {
  'Einzel' = 'single',
  'Gruppe' = 'group',
  'Reflektion' = 'results',
}

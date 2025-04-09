export interface Preset {
    _id: string;
    title: string;
    description: string;
    items: RankItem[];
}
export interface Session {
    _id: string;
    sessionname: string;
    date: Date;
    title: string;
    description: string;
    items: RankItem[];
    comment?: string;
}

export interface Group {
    id: number;
    groupname: string;
    items: RankItem[];
    sessionId: string;
    members: number[];
    result: number;
}

export interface Single {
    id: number;
    username: string;
    password: string;
    items: RankItem[]; // TODO shorthand oder id für bessere iteration, Lösungsbemerkung
    sessionId: string;
    groupId?: number;
    result: number;
}

export interface RankItem {
    description: string;
    explanation: string;
    rank: number;
}
export interface Setting {
    name: string;
    value: any;
}
export interface Active {
    stage: 'single' | 'group' | 'results';
    sessionId: string | null;
}

export enum Stages {
    'Einzel' = 'single',
    'Gruppe' = 'group',
    'Reflektion' = 'results',
}

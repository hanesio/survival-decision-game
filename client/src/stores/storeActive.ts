import { defineStore } from 'pinia';
import { type Active } from '@/types';

interface ActiveState {
    active: Active;
}

export const useStoreActive = defineStore('storeActive', {
    state: (): ActiveState => {
        return {
            active: { sessionId: null, stage: 'single' },
        };
    },
    actions: {
        setActiveSession(sessionId: string | string[] | null) {
            this.active.sessionId = sessionId;
        },
        setStage(stage: 'single' | 'group' | 'results') {
            this.active.stage = stage;
        },
    },
    getters: {},
});

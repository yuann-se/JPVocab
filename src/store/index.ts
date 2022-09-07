import { createStore } from "vuex";

export interface IWord {
    id: string,
    body: string,
    reading: string,
    translation: string,
    isChecked: boolean
}

export interface IStore {
    words: IWord[],
    searchQuery: string,
    isAddPanelOpen: boolean,
    isAnyChecked: boolean
}

export default createStore<IStore>({
    state: () => ({
        words: [],
        searchQuery: '',
        isAddPanelOpen: false,
        isAnyChecked: false
    }),
    mutations: {
        initialiseStore(state) {
            const LSData = localStorage.getItem('JPVocabStore');
            if (LSData && LSData !== null) {
                this.replaceState(Object.assign(state, JSON.parse(LSData)))
            }
        },

        addNewWord(state, word: IWord) {
            if (word.body && word.translation) {
                state.words = [...state.words, word]
            }
        },

        setIsChecked(state, word: IWord) {
            const newWords = [...state.words];
            for (const item of newWords) {
                if (item.id === word.id) {
                    item.isChecked = !item.isChecked
                    break
                }
            }
            state.words = newWords

            for (const item of state.words) {
                if (item.isChecked) {
                    state.isAnyChecked = true
                    break
                } else state.isAnyChecked = false
            }
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },

        setIsAddPanelOpen(state, isAddPanelOpen) {
            state.isAddPanelOpen = isAddPanelOpen
        },
    },
})
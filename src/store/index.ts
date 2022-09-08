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
        SET_IS_ANY_CHECKED(state, bool: boolean) {
            state.isAnyChecked = bool
        },

        SET_WORDS(state, arr: IWord[]) {
            state.words = arr
        },

        SET_SEARCH_QUERY(state, str: string) {
            state.searchQuery = str
        },

        SET_IS_ADD_PANEL_OPEN(state, bool: boolean) {
            state.isAddPanelOpen = bool
        },
    },

    actions: {
        initialiseStore() {
            const LSData = localStorage.getItem('JPVocabStore');
            if (LSData && LSData !== null) {
                this.replaceState(Object.assign(this.state, JSON.parse(LSData)))
            }
        },

        addNewWord(_, word: IWord) {
            if (word.body && word.translation) {
                const newWords = [...this.state.words, word]
                this.commit('SET_WORDS', newWords)
            }
        },

        deleteWords() {
            const newWords = this.state.words.filter(word => !word.isChecked)
            this.commit('SET_WORDS', newWords)
            this.commit('SET_IS_ANY_CHECKED', false)
        },

        setIsChecked(_, word: IWord) {
            const newWords = [...this.state.words];
            for (const item of newWords) {
                if (item.id === word.id) {
                    item.isChecked = !item.isChecked
                    break
                }
            }
            this.commit('SET_WORDS', newWords)

            for (const item of this.state.words) {
                if (item.isChecked) {
                    this.commit('SET_IS_ANY_CHECKED', true)
                    break
                } else this.commit('SET_IS_ANY_CHECKED', false)
            }
        },

        setSearchQuery(state, searchQuery: string) {
            this.commit('SET_SEARCH_QUERY', searchQuery)
        },

        setIsAddPanelOpen(state, isAddPanelOpen: boolean) {
            this.commit('SET_IS_ADD_PANEL_OPEN', isAddPanelOpen)
        },

    }
})
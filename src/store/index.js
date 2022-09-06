import { createStore } from "vuex";

export default createStore({
    state: () => ({
        words: [],
        searchQuery: ''
    }),
    mutations: {
        initialiseStore(state) {
            if (localStorage.getItem('JPVocabStore')) {
                this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('JPVocabStore'))))
            }
        },

        addNewWord(state, word) {
            state.words = [...state.words, word]
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
})
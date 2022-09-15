import { createStore } from "vuex";

export interface IWord {
    id: string,
    body: string,
    reading: string[],
    translation: string[],
    isChecked: boolean,
    progress: number
}

export enum ESortBy { createdDate = 'Created date', progress = 'Progress', alphabetical = 'Alphabetical' }
export enum ESortDirection { ascending = 'Ascending', descending = 'Descending' }

export interface IStore {
    words: IWord[],
    searchQuery: string,
    sortBy: ESortBy,
    sortDirection: ESortDirection,
    isAddPanelOpen: boolean,
    isAnyChecked: boolean,
    wordToEdit: IWord
}

export const emptyWord = { id: '', body: '', reading: [], translation: [], isChecked: false, progress: 0 }

export default createStore<IStore>({
    state: () => ({
        words: [],
        searchQuery: '',
        isAddPanelOpen: false,
        isAnyChecked: false,
        sortBy: ESortBy.createdDate,
        sortDirection: ESortDirection.ascending,
        wordToEdit: Object.assign({}, emptyWord)
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

        SET_SORT_BY(state, str: ESortBy) {
            state.sortBy = str
        },

        SET_SORT_DIRECTION(state, str: ESortDirection) {
            state.sortDirection = str
        },

        SET_WORD_TO_EDIT(state, word: IWord) {
            state.wordToEdit = word
        }
    },

    getters: {
        sortedWords(state) {
            const getSortParams = () => {
                switch (state.sortBy) {
                    case (ESortBy.alphabetical): return 'body'
                    case (ESortBy.createdDate): return 'id'
                    case (ESortBy.progress): return 'progress'
                }
            }

            let newArray: IWord[];
            if (state.sortDirection === ESortDirection.ascending) {
                newArray = [...state.words].sort((word1, word2) => word1[getSortParams()] > word2[getSortParams()] ? 1 : -1)
            } else newArray = [...state.words].sort((word1, word2) => word1[getSortParams()] < word2[getSortParams()] ? 1 : -1)

            if (state.searchQuery) newArray = newArray.filter(word => word.body.toLowerCase().includes(state.searchQuery.toLowerCase()))

            return newArray;
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
            const newWords = [...this.state.words, word]
            this.commit('SET_WORDS', newWords)
        },

        editWord(_, word: IWord) {
            const newWords: IWord[] = [];
            this.state.words.forEach((item) => {
                if (item.id === word.id) item = word
                newWords.push(item)
            })
            this.commit('SET_WORDS', newWords)
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

        setSearchQuery(_, searchQuery: string) {
            this.commit('SET_SEARCH_QUERY', searchQuery)
        },

        setIsAddPanelOpen(_, isAddPanelOpen: boolean) {
            this.commit('SET_IS_ADD_PANEL_OPEN', isAddPanelOpen)
        },

        setSortBy(_, sort: ESortBy) {
            this.commit('SET_SORT_BY', sort)
        },

        setSortDirection(_, str: ESortDirection) {
            this.commit('SET_SORT_DIRECTION', str)
        },

        setWordToEdit(_, word: IWord) {
            this.commit('SET_WORD_TO_EDIT', word)
        }

    }
})
import { createStore } from "vuex";

export interface IWord {
    id: string
    body: string
    reading: string[]
    translation: string[]
    isChecked: boolean
    progress: number
    tags: string[]
}

export enum ESortBy { createdDate = 'Created date', progress = 'Progress', alphabetical = 'Alphabetical' }
export enum ESortDirection { ascending = 'Ascending', descending = 'Descending' }

export interface IStore {
    words: IWord[]
    learnedWords: IWord[]
    searchQuery: string
    sortBy: ESortBy
    sortDirection: ESortDirection
    isAddPanelOpen: boolean
    isAnyChecked: boolean
    wordToEdit: IWord
    showLearned: boolean
}

export const emptyWord: IWord = { id: '', body: '', reading: [], translation: [], isChecked: false, progress: 0, tags: [] }
const mockData: { words: IWord[], learnedWords: IWord[] } = {
    words: [
        { id: Date.now().toString(), body: '構造', reading: ['こうぞう'], translation: ['structure', 'construction'], isChecked: false, progress: 90, tags: [] },
        { id: Date.now().toString(), body: '国内総生産', reading: ['こくないそうせいさん'], translation: ['GDP'], isChecked: false, progress: 80, tags: [] },
        { id: Date.now().toString(), body: '被る', reading: ['かぶる'], translation: ['to wear'], isChecked: false, progress: 70, tags: [] },
        { id: Date.now().toString(), body: '被る', reading: ['こうむる'], translation: ['to suffer'], isChecked: false, progress: 70, tags: [] },
        { id: Date.now().toString(), body: '辛い', reading: ['からい'], translation: ['spicy', 'hot'], isChecked: false, progress: 60, tags: [] },
        { id: Date.now().toString(), body: '辛い', reading: ['つらい'], translation: ['tough', 'hard', 'painful'], isChecked: false, progress: 60, tags: [] },
        { id: Date.now().toString(), body: '危機', reading: ['きき'], translation: ['crisis'], isChecked: false, progress: 40, tags: [] },
        { id: Date.now().toString(), body: '雰囲気', reading: ['ふんいき'], translation: ['atmosphere', 'vibe'], isChecked: false, progress: 0, tags: [] }
    ],

    learnedWords: [
        { id: Date.now().toString(), body: '戦車', reading: ['せんしゃ'], translation: ['tank'], isChecked: false, progress: 100, tags: [] },
        { id: Date.now().toString(), body: '構う', reading: ['かまう'], translation: [' to mind', 'to care about'], isChecked: false, progress: 100, tags: [] }
    ]
}

export default createStore<IStore>({
    state: () => ({
        words: [],
        learnedWords: [],
        searchQuery: '',
        isAddPanelOpen: false,
        isAnyChecked: false,
        sortBy: ESortBy.createdDate,
        sortDirection: ESortDirection.ascending,
        wordToEdit: { ...emptyWord },
        showLearned: false
    }),

    mutations: {
        SET_IS_ANY_CHECKED(state, bool: boolean) {
            state.isAnyChecked = bool
        },

        SET_WORDS(state, arr: IWord[]) {
            state.words = arr
        },

        SET_LEARNED_WORDS(state, arr: IWord[]) {
            state.learnedWords = arr
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
        },

        SET_SHOW_LEARNED(state, bool: boolean) {
            state.showLearned = bool
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

            let newArray: IWord[] = state.showLearned ? [...state.words, ...state.learnedWords] : [...state.words]

            if (state.sortDirection === ESortDirection.ascending) {
                newArray = newArray.sort((word1, word2) => word1[getSortParams()] > word2[getSortParams()] ? 1 : -1)
            } else newArray = newArray.sort((word1, word2) => word1[getSortParams()] < word2[getSortParams()] ? 1 : -1)

            if (state.searchQuery) newArray = newArray.filter(word => word.body.toLowerCase().includes(state.searchQuery.toLowerCase()))

            return newArray;
        },
    },

    actions: {
        initialiseStore() {
            const LSData = localStorage.getItem('JPVocabStore');
            if (LSData && LSData !== null) {
                this.replaceState({ ...this.state, ...JSON.parse(LSData) })
            } else {
                this.replaceState({ ...this.state, ...mockData })
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
            const newWords = [...this.state.words].filter(word => !word.isChecked)
            this.commit('SET_WORDS', newWords)
            if (this.state.showLearned) {
                const newWords = [...this.state.learnedWords].filter(word => !word.isChecked)
                this.commit('SET_LEARNED_WORDS', newWords)
            }
            this.commit('SET_IS_ANY_CHECKED', false)
        },

        addToLearned() {
            const addWords = this.state.words.filter(word => word.isChecked)
            const leftWords = this.state.words.filter(word => !word.isChecked)
            addWords.forEach((item) => {
                item.progress = 100
                item.isChecked = false
            })

            this.commit('SET_WORDS', leftWords)
            this.commit('SET_LEARNED_WORDS', [...this.state.learnedWords, ...addWords])

            for (const item of this.state.learnedWords) {
                if (item.isChecked) {
                    this.dispatch('setIsChecked', item)
                }
            }
            this.commit('SET_IS_ANY_CHECKED', false)
        },

        removeFromLearned() {
            const removeWords = this.state.learnedWords.filter(word => word.isChecked)
            const leftWords = this.state.learnedWords.filter(word => !word.isChecked)
            removeWords.forEach((item) => {
                item.progress = 50
                item.isChecked = false
            })

            this.commit('SET_WORDS', [...this.state.words, ...removeWords])
            this.commit('SET_LEARNED_WORDS', leftWords)

            for (const item of this.state.words) {
                if (item.isChecked) {
                    this.dispatch('setIsChecked', item)
                }
            }
            this.commit('SET_IS_ANY_CHECKED', false)
        },

        setIsChecked(_, word: IWord) {
            const words = [...this.state.words]
            const learnedWords = [...this.state.learnedWords]

            let isFound = false
            for (const item of words) {
                if (item.id === word.id) {
                    item.isChecked = !item.isChecked
                    this.commit('SET_WORDS', words)
                    isFound = true
                    break
                }
            }

            if (!isFound) {
                for (const item of learnedWords) {
                    if (item.id === word.id) {
                        item.isChecked = !item.isChecked
                        this.commit('SET_LEARNED_WORDS', learnedWords)
                        break
                    }
                }
            }
        },

        scanAllIfAnyChecked() {
            this.commit('SET_IS_ANY_CHECKED', false)
            for (const item of this.state.words) {
                if (item.isChecked) {
                    if (!this.state.isAnyChecked) this.commit('SET_IS_ANY_CHECKED', true)
                    break
                }
            }

            if (!this.state.isAnyChecked && this.state.showLearned) {
                for (const item of this.state.learnedWords) {
                    if (item.isChecked) {
                        if (!this.state.isAnyChecked) this.commit('SET_IS_ANY_CHECKED', true)
                        break
                    }
                }
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
        },

        setShowLearned(_, bool: boolean) {
            if (this.state.showLearned) {
                for (const item of this.state.learnedWords) {
                    if (item.isChecked) {
                        this.dispatch('setIsChecked', item)
                    }
                }
            }
            this.commit('SET_SHOW_LEARNED', bool)
            this.dispatch('scanAllIfAnyChecked')
        }
    }
})
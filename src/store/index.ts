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
    checkedCount: number
    wordToEdit: IWord
    showLearned: boolean
}

export const emptyWord: IWord = { id: '', body: '', reading: [], translation: [], isChecked: false, progress: 0, tags: [] }
const mockData: { words: IWord[], learnedWords: IWord[] } = {
    words: [
        { id: Date.now().toString(), body: '構造', reading: ['こうぞう'], translation: ['structure', 'construction'], isChecked: false, progress: 90, tags: [] },
        { id: (Date.now() + 10).toString(), body: '国内総生産', reading: ['こくないそうせいさん'], translation: ['GDP'], isChecked: false, progress: 80, tags: [] },
        { id: (Date.now() + 20).toString(), body: '被る', reading: ['かぶる'], translation: ['to wear'], isChecked: false, progress: 70, tags: [] },
        { id: (Date.now() + 30).toString(), body: '被る', reading: ['こうむる'], translation: ['to suffer'], isChecked: false, progress: 70, tags: [] },
        { id: (Date.now() + 40).toString(), body: '辛い', reading: ['からい'], translation: ['spicy', 'hot'], isChecked: false, progress: 60, tags: [] },
        { id: (Date.now() + 50).toString(), body: '辛い', reading: ['つらい'], translation: ['tough', 'hard', 'painful'], isChecked: false, progress: 60, tags: [] },
        { id: (Date.now() + 60).toString(), body: '危機', reading: ['きき'], translation: ['crisis'], isChecked: false, progress: 40, tags: [] },
        { id: (Date.now() + 70).toString(), body: '雰囲気', reading: ['ふんいき'], translation: ['atmosphere', 'vibe'], isChecked: false, progress: 0, tags: [] }
    ],

    learnedWords: [
        { id: (Date.now() + 80).toString(), body: '戦車', reading: ['せんしゃ'], translation: ['tank'], isChecked: false, progress: 100, tags: [] },
        { id: (Date.now() + 90).toString(), body: '構う', reading: ['かまう'], translation: [' to mind', 'to care about'], isChecked: false, progress: 100, tags: [] }
    ]
}

export default createStore<IStore>({
    state: () => ({
        words: [],
        learnedWords: [],
        searchQuery: '',
        isAddPanelOpen: false,
        checkedCount: 0,
        sortBy: ESortBy.createdDate,
        sortDirection: ESortDirection.ascending,
        wordToEdit: { ...emptyWord },
        showLearned: false
    }),

    mutations: {
        SET_CHECKED_COUNT(state, num: number) {
            state.checkedCount = num
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

            if (state.searchQuery) newArray = newArray.filter(word => `${word.body}${word.reading.toString().toLowerCase()}${word.translation.toString().toLowerCase()}`.includes(state.searchQuery.toLowerCase()))

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
            this.commit('SET_CHECKED_COUNT', 0)
        },

        addToLearned() {
            const addWords = this.state.words.filter(word => word.isChecked)
            const leftWords = this.state.words.filter(word => !word.isChecked)
            addWords.forEach((item) => {
                item.progress = 100
                item.isChecked = false
                this.commit('SET_CHECKED_COUNT', this.state.checkedCount - 1)
            })

            this.commit('SET_WORDS', leftWords)
            this.commit('SET_LEARNED_WORDS', [...this.state.learnedWords, ...addWords])

            this.dispatch('multipleRemoveChecked', { arr: this.state.learnedWords, stateName: 'learned' })
        },

        removeFromLearned() {
            const removeWords = this.state.learnedWords.filter(word => word.isChecked)
            const leftWords = this.state.learnedWords.filter(word => !word.isChecked)
            removeWords.forEach((item) => {
                item.progress = 50
                item.isChecked = false
                this.commit('SET_CHECKED_COUNT', this.state.checkedCount - 1)
            })

            this.commit('SET_WORDS', [...this.state.words, ...removeWords])
            this.commit('SET_LEARNED_WORDS', leftWords)

            this.dispatch('multipleRemoveChecked', { arr: this.state.words, stateName: 'notLearned' })
        },

        setIsChecked(_, word: IWord) {
            const words = [...this.state.words]
            const learnedWords = [...this.state.learnedWords]

            let isFound = false
            for (const item of words) {
                if (item.id === word.id) {
                    item.isChecked = !item.isChecked
                    item.isChecked ? this.commit('SET_CHECKED_COUNT', ++this.state.checkedCount) : this.commit('SET_CHECKED_COUNT', --this.state.checkedCount)
                    this.commit('SET_WORDS', words)
                    isFound = true
                    break
                }
            }

            if (!isFound) {
                for (const item of learnedWords) {
                    if (item.id === word.id) {
                        item.isChecked = !item.isChecked
                        item.isChecked ? this.commit('SET_CHECKED_COUNT', ++this.state.checkedCount) : this.commit('SET_CHECKED_COUNT', --this.state.checkedCount)
                        this.commit('SET_LEARNED_WORDS', learnedWords)
                        break
                    }
                }
            }
        },

        multipleRemoveChecked(_, { arr, stateName }: { arr: IWord[], stateName: string }) {
            const checkedArr = arr.filter((item) => item.isChecked)
            if (checkedArr.length) {
                const notCheckedArr = arr.filter((item) => !item.isChecked)
                checkedArr.forEach((item) => {
                    item.isChecked = false
                    this.commit('SET_CHECKED_COUNT', --this.state.checkedCount)
                })
                switch (stateName) {
                    case ('learned'): {
                        this.commit('SET_LEARNED_WORDS', [...checkedArr, ...notCheckedArr])
                        break
                    }
                    case ('notLearned'): this.commit('SET_WORDS', [...checkedArr, ...notCheckedArr])
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
                this.dispatch('multipleRemoveChecked', { arr: this.state.learnedWords, stateName: 'learned' })
            }
            this.commit('SET_SHOW_LEARNED', bool)
        }
    }
})
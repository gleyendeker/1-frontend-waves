import { createStore } from 'vuex'
import * as types from '@/store/mutation-types'

const state = {
    account: null,
}

const getters = {}

const actions = {
    setCurrentAccount: ({commit}, account) => {
        commit(types.SET_ACCOUNT, account)
    }
}

const mutations = {
    [types.SET_ACCOUNT] (state, account) {
        state.account = account
    },
}

// Create a new store instance.
export default createStore({
    state,
    getters,
    actions,
    mutations
})
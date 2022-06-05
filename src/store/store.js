import { createStore } from 'vuex'
import * as types from '@/store/mutation-types'

const state = {
    walletInstalled: null,
    walletConnected: null,
    account: null,
}

const getters = {}

const actions = {
    setWalletInstalled: ({commit}, data) => {
        commit(types.SET_WALLET_INSTALLED, data)
    },
    setWalletConnected: ({commit}, data) => {
        commit(types.SET_WALLET_CONNECTED, data)
    },
    setCurrentAccount: ({commit}, data) => {
        commit(types.SET_ACCOUNT, data)
    },
}

const mutations = {
    [types.SET_WALLET_INSTALLED] (state, data) {
        state.walletInstalled = data
    },
    [types.SET_WALLET_CONNECTED] (state, data) {
        state.walletConnected = data
    },
    [types.SET_ACCOUNT] (state, data) {
        state.account = data
    },
}

// Create a new store instance.
export default createStore({
    state,
    getters,
    actions,
    mutations
})
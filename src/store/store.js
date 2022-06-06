import { createStore } from 'vuex'
import * as types from '@/store/mutation-types'

const state = {
    walletInstalled: null,
    walletConnected: null,
    account: null,
    contractAddress: '0x082E3c0DA6776cf75e3631bCB3748Ae909383Aa1',
    wavesReceived: 0,
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
    setWavesReceived: ({commit}, data) => {
        commit(types.SET_WAVES_RECEIVED, data)
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
    [types.SET_WAVES_RECEIVED] (state, data) {
        state.wavesReceived = data
    },
}

// Create a new store instance.
export default createStore({
    state,
    getters,
    actions,
    mutations
})
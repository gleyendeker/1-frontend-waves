import {createStore} from 'vuex'
import * as types from '@/store/mutation-types'

const state = {
    walletInstalled: null,
    walletConnected: null,
    account: null,
    contractAddress: '0x9e43F2c4c7867A446EC4105b6c705D9c1bfEF4da',
    wavesReceived: 0,
    mining: false,
    cleanedWaves: [],
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
    setMining: ({commit}, data) => {
        commit(types.SET_MINING, data)
    },
    setCleanedWaves: ({commit}, data) => {
        commit(types.SET_CLEANED_WAVES, data)
    },
}

const mutations = {
    [types.SET_WALLET_INSTALLED](state, data) {
        state.walletInstalled = data
    },
    [types.SET_WALLET_CONNECTED](state, data) {
        state.walletConnected = data
    },
    [types.SET_ACCOUNT](state, data) {
        state.account = data
    },
    [types.SET_WAVES_RECEIVED](state, data) {
        state.wavesReceived = data
    },
    [types.SET_MINING](state, data) {
        state.mining = data
    },
    [types.SET_CLEANED_WAVES](state, data) {
        state.cleanedWaves = data
    },
}

// Create a new store instance.
export default createStore({
    state,
    getters,
    actions,
    mutations
})
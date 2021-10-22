import { createStore } from 'vuex'

import * as api from '../api/houses'

const housesStore = {
    namespaces: true,
    state: {
        houses: []
    },
    actions: {
        async getHouses() {
            const r = await api.getBuildList()
            console.log('r', r)
        }
    },
    mutations: {},
}

export default createStore({
    modules: {
        housesStore
    }
})
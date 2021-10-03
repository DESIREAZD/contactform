import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state :{
        items: 0,
        users : []
    },
    mutations :{
        ADD_ITEM (state, item) {
            state.users.unshift(item)
            state.items++
        },
        REMOVE_ITEM (state, itemId) {
            const ItemIndex = state.users.findIndex((p) => p.id === itemId)
            state.users.splice(ItemIndex, 1)
        },
        UPDATE_ITEM (state, item) {
            const itemIndex = state.users.findIndex((p) => p.id === item.id)
            Object.assign(state.users[itemIndex], item)
        },
    },
    actions :{
        addItem ({ commit}, item) {
            commit('ADD_ITEM', Object.assign(item, this.state.items))
        },
        removeItem ({ commit }, itemId) {
            commit('REMOVE_ITEM', itemId)
        },
        updateItem ({ commit}, item) {
            commit('UPDATE_ITEM',item)
        },
    }

})

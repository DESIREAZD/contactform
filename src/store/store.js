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
    },
    actions :{
        addItem ({ commit}, item) {
            commit('ADD_ITEM', Object.assign(item, this.state.items))
        },
    }

})

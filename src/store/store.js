import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

  const  state={
        users: [
            {
                "id": 1,
                "firstname": "Bret",
                "lastname": "Sincere@april.biz",
                "phone": "+2565655965",
            },
            {
                "id": 1,
                "firstname": "Bret",
                "lastname": "Sincere@april.biz",
                "phone": "+2565655965",
            }
        ]
    }
  const mutations={
        ADD_ITEM (state, item) {
            state.users.unshift(item)
        },
    }
  const action ={
        addItem ({ commit }, item) {
            commit('ADD_ITEM', Object.assign(item))

        },
    }
    
export default new Vuex.Store({
    state,
    action,
    mutations
})

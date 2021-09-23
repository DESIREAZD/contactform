import Vuex from 'vuex'
export default new Vuex.Store({
    state:{
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
    },
    mutations:{
        ADD_ITEM (state, item) {
            state.users.unshift(item)
        },
    },
    action:{
        addItem ({ commit }, item) {
            commit('ADD_ITEM', Object.assign(item))

        },
    },
    getters:{

    },
    module:{

    }
})
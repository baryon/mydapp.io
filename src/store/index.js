import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import showcase from './showcase'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        example,
        showcase
    }
})

export default store

import { sync } from 'vuex-router-sync'
import { store } from '../store/store'
import router from '../plugins/vue-router'

sync(store, router)

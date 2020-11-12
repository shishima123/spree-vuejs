import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue from 'vue'

Vue.use(VueAxios, axios)

axios.defaults.headers.common['X-Spree-Token'] = '894fa3111b5a8c4ff8778f2e20f067a367b665918a6eac28'

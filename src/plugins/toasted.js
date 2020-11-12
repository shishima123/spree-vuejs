import Vue from 'vue'
import Toasted from 'vue-toasted'

let options = {
  theme: 'toasted-primary',
  position: 'bottom-right',
  duration: 3000,
  singleton: true
}

Vue.use(Toasted, options)

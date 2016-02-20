import Vue from 'vue'
import App from './App.vue'

// make jQuery available for whole app
window.$ = window.jQuery = require('../bower_components/jquery/dist/jquery')

/* eslint-disable no-new */
new Vue({
  data: require('./data'),
  el: 'body',
  components: { App }
})

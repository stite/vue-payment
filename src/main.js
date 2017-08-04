import Vue from 'vue'
import App from './App.vue'
import payment from 'vue-payment';
console.log(payment)
Vue.use(payment);
new Vue({
  el: '#app',
  render: h => h(App)
})

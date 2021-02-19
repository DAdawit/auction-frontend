import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import vue_axios from 'vue-axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

require('../src/store/modules/subscriber');

// Vue.filter('snippet',function(value){
// return value.slice(0,10)+'...';
// })

export const Bus=new Vue();

import Echo from 'laravel-echo';
window.Pusher=require('pusher-js');
window.Echo =new Echo({
  broadcaster:'pusher',
  key:process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost:process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort:6001,
  forceTLS:false,
  disableStats:true,
  // cluster:'mt1',
})


axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

Vue.use(axios,vue_axios);

Vue.config.productionTip = false;

store.dispatch('attempt',localStorage.getItem('token')).then(()=>{
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app');
  
})

import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import product from './modules/product';
import admin from './modules/admin';
import user from './modules/user';
import bank from './modules/bank'

// import modules from './modules';
// const requireModule=require.context(".",false,/\.js$/);
// requireModule.keys().forEach(fileName => {
//   if(fileName==="./index.js") return;
//   const moduleName=camelCase(fileName.replace(/(\.\/|\.js)/g,""));
//   modules[moduleName]=requireModule(fileName).default;
// });

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth,product,admin,user,bank
  }
})

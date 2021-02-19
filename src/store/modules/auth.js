import axios from 'axios'
export default {
  // namespaced:true,
  state: {
    token: null,
    user: null,
    profile:null,
  },

  getters: {
    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user;
    },
    Profile(state){
      return state.profile;
    },
    UserbookNumber(state){
      return state.profile.book_number;
    }

  },

  actions: {
    async register(_,credentials){
     return await axios.post('auth/register', credentials) 
    },

    async signIn({ dispatch }, credentials) {
      let response = await axios.post('auth/signin', credentials)
        return dispatch('attempt', response.data.token);
    },

    async attempt({commit, state }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      }
      if (!state.token) {
        return
      }
      try {
        let response = await axios.get('auth/me')
        commit('SET_USER', response.data)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)   
      }

    },

    async signOut({commit}) {
      return await axios.post('auth/signout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      })
    },

    async storeProfile(_,credentials){
      // console.log(credentials)
      await axios.post('user/store_profile',credentials).then((res)=>{
          console.log(res.data)
      }) 
    },
    async findMyProfile({commit},id){
        await axios.get(`user/myProfile/${id}`).then((res)=>{
          // console.log(res.data[0])
          commit('SETPROFILE',res.data[0]);
          return;
        })
    },
    async UpdateProfile({dispatch},credentials){
      await axios.post(`user/updateProfile/${credentials.id}`,credentials).then(()=>{
        dispatch('findMyProfile',credentials.user_id)
      }).catch((err)=>{
        console.log(err);
      })
    },
    // async CheckProfileComplete({commit},data){
    //   await axios.get(`user/`)
    // }
    async CangeUserPassword(_,data){
      return await axios.post('auth/changeUserPassword',data);
    }
},
  mutations: {
    SET_TOKEN(state, token){
      state.token = token;
    },
    SET_USER(state, data){
      state.user = data;
    },
    SETPROFILE(state,data){
      state.profile=data;
    }
  }
}

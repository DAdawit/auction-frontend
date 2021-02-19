import axios from 'axios';
export default{
    state:{
        pendingAcution:{},
        approvedAcution:{},
        rejectedAcution:{},
        myAcutions:[],
        num_userPosts:'',
        My_Winnings:{}
    },
    getters:{
        PendignAcutions(state){
            return state.pendingAcution
        },
        ApprovedAcutions(state){
            return state.approvedAcution
        },
        RejectedAcutions(state){
            return state.rejectedAcution
        },
        MyAcutions(state){
            return state.myAcutions
        },
        num_user_posts(state){
            return state.num_userPosts;
          },
          my_winns(state){
              return state.My_Winnings
          }
    },
    actions:{
        async DeleteProduct({dispatch},cridentials){
            await axios.post(`user/delete/${cridentials.id}`)
            .then(()=>{
              dispatch('fetchAllMyAcutions',cridentials.user_id)
            }).catch((err)=>{
              console.log(err);
            })
          },
        async postAcution(_,cridentials){
              return await axios.post('user/create',cridentials)
            },
        async fetchAllMyAcutions({commit},user_id){
            await axios.get(`user/user_products/${user_id}`).then((res)=>{
              commit('SET_MY_ACUTIONS',res.data)
          }).catch((err)=>{
            console.log(err);
          })
        },

    async fetchUserPendingAcutions({commit},data){

        await axios.get(`user/userPendingAcutions/${data}`).then((res)=>{
            // console.log(res.data)
            commit('SET_PENDING_ACUTION',res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },
    async fetchUserApprovedAcutions({commit},data){
        console.log(data)
        await axios.get(`user/userApprovedAcutions/${data}`).then((res)=>{
            commit('SET_APPROVED_ACUTION',res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },
    async fetchUserRejectedAcutions({commit},data){
        console.log(data)
        await axios.get(`user/userRejectedAcutions/${data}`).then((res)=>{
            console.log(res.data)
            commit('SET_REJECTED_ACUTION',res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },
    async UpateProduct({dispatch},cridentials){
        await axios.post(`user/update/${cridentials.id}`,cridentials)         
         .then(() => {
           dispatch('fetchAllMyAcutions',cridentials.user_id)
         }).catch((err) => {console.log(err);})
      },
      async num_userPosts({commit},id){
        await axios.get(`user/num_acutions/${id}`).then((res)=>{
          console.log(res)
          commit('SET_NUM_USER_POSTS',res.data)
        })
      },
      async featchMyWinnings({commit},id){
        //   console.log(id)
        await axios.get(`user/myCart/${id}`).then((res)=>{
            commit('SET_MY_WINNINGS',res.data)
        })
      },
      async repost_Auction(_,data){
        return await axios.post(`user/repost/${data.post_id}`)
      }
    },

    mutations:{
        SET_MY_WINNINGS(state,data){
            state.My_Winnings=data
        },
        SET_PENDING_ACUTION(state,pending){
            state.pendingAcution=pending
        },
        SET_APPROVED_ACUTION(state,approved){
            state.approvedAcution=approved
        },
        SET_REJECTED_ACUTION(state,rejected){
            state.rejectedAcution=rejected
        },
        SET_MY_ACUTIONS(state,myAcutions){
            state.myAcutions=myAcutions
        },
        SET_NUM_USER_POSTS(state,data){
            state.num_userPosts=data;
          }
    
    }
}




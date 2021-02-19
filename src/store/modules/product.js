import axios from 'axios';
// import moment from 'moment';
export default{
    state:{
        acutions:[],
        Update_data:{},
        Product:{},
        Prices:{},
        num_userPosts:'',
        auction_time:'',
        user_booked:false,
        auctions_home:{}
    },
    getters:{
      update_data(state){
        return state.Update_data;
      },
      product(state){
        return state.Product;
      },
      offerdPrices(state){
        return state.Prices;
      },
      AuctionDate(state){
        return state.auction_time
      },
          //  user_products(state){
          //     return state.User_Products;
          //   },
        //  num_user_posts(state){
        //    return state.num_userPosts;
        //  },
      Acutions(state){
        return state.acutions;
      },
      Acution_home(state){
        return state.auctions_home;
      }

    },
    actions:{      
        async Fatch_Approved_Acutions({commit}){
            const response=await axios.get('user/Auctions')
              // let auction=response.data.map((item)=>{
              //   return{
              //     id:item.id,
              //     name:item.name,
              //     price:item.price,
              //     thumbnail:item.thumbnail,
              //     category_name:item.category_name,
              //     auction_start_time:moment(item.acution_start_date,"YYYY-MM-DD h:mmkk","GMT+3").calendar(),
              //     auction_due_time:moment(item.acution_date,"YYYY-MM-DD h:mmkk","GMT+3").calendar()
              //   }
              // })

              // console.log(response.data);

            // let acutions=response.data.map((item)=>{
            //   return{
            //       id:item.id,
            //       name:item.name,
            //       price:item.price,
            //       thumbnail:item.thumbnail,
            //       category_name:item.category_name,
            //       acution_time:item.acution_date.split(" "),
            //       acution_date:moment(item.acution_date,"YYYY-MM-DD h:mmkk").calendar()
            //   }
            // })
            // let acu=acutions.map((item)=>{
            //   return{
            //     id:item.id,
            //     name:item.name,
            //     price:item.price,
            //     thumbnail:item.thumbnail,
            //     category_name:item.category_name,
            //     acution_Y_M_D:item.acution_time[0].split("-"),
            //     acution_h_m:item.acution_time[1].split(":"),
            //     acution_date:item.acution_date
            //   }
                
            // })
            // console.log(acu);
            commit('SET_ACUTIONS',response.data)
          },
          async findAuctionDate({commit},data){
            await axios.get(`user/auction_time/${data}`).then((res)=>{
              let Auction={}
              Auction.auctionDate=res.data.split(" ");
             let AuctionDate={}
              AuctionDate.auction_y_m_d=Auction.auctionDate[0].split("-");
              AuctionDate.auction_h_m=Auction.auctionDate[1].split(":");
              // console.log(AuctionDate)
              commit('SET_AUCTION_TIME',AuctionDate)
            }).catch((err)=>{
              console.log(err)
            })
          },
          async Findproduct({commit},id){
            const res = await axios.get(`user/posts/${id}/product`)
            let result=res.data[0];
            
            commit('SET_PRODUCT',result)      
            },
  
          async storeOfferedPrice({dispatch},data){ 
              const res = await axios.post('user/Store_Offer',data)
              // console.log(res.data)
              if(res){
                    dispatch('FindOfferdProductPrice',data.post_id)
                   }
            },
           async store_price_with_Time_update (_,data){
              console.log(data)
              await axios.post(`user/store_price_update_time/${data.post_id}`,data)
            },
          async FindOfferdProductPrice({commit},id){
              const res = await axios.get(`user/post/product/${id}`);
              // console.log(res.data.length)
                commit('SET_OFFERED_PRICES',res.data)
                // console.log(res.data)
                // commit('SET_NUM_OFFERS',res.data.length)
            },

            async fetchWinner({commit},data){
              await axios.get('user/winnerProfile',data).then((res)=>{
                commit('SET_BID_WINNER',res.data[0])
              })
            },

            async removeAuction({dispatch},id){
              return await axios.post(`user/removeAuction/${id}`).then(()=>{
                dispatch('Fatch_Approved_Acutions')
              })
            },

            async saveToWinners(_,data){
               return await axios.post('user/saveWinner',data)
            },

            async Fatch_Approved_Acutions_for_home({commit}){
               const res= await axios.get('user/AuctionforHome')
                  commit('SET_AUCTION_FOR_HOME',res.data)

            },


        // async postAcution({dispatch},cridentials){
        //        await axios.post('user/create',cridentials).then(()=>{
        //         dispatch('User_products',cridentials.user_id)
        //       }).catch((e)=>{
        //         console.log(e)
        //       })
        //     },
        // async UpateProduct({dispatch},cridentials){
        //     await axios.post(`user/update/${cridentials.id}`,cridentials)         
        //      .then(() => {
        //        dispatch('User_products',cridentials.user_id)
        //      }).catch((err) => {console.log(err);})
        //   },
        // async DeleteProduct({dispatch},cridentials){
        //         await axios.post(`user/delete/${cridentials.id}`)
        //         .then(()=>{
        //           dispatch('User_products',cridentials.user_id)
        //         }).catch((err)=>{
        //           console.log(err);
        //         })
        //   },
        // async num_userPosts({commit},id){
        //   await axios.get(`user/num_acutions/${id}`).then((res)=>{
        //     console.log(res)
        //     commit('SET_NUM_USER_POSTS',res.data)
        //   })
        // }

       

    },
    mutations:{
      SET_AUCTION_FOR_HOME(state,auctions){
        state.auctions_home=auctions;
      },
      SET_ACUTIONS(state,acutions){
        state.acutions=acutions;
      },
      SET_EDIT_PRODUCT(state,product){
        state.Update_data=product;
      },
      SET_PRODUCT(state,product){
        state.Product=product
      },
      SET_OFFERED_PRICES(state,prices){
        state.Prices=prices;
      },
      SET_AUCTION_TIME(state,time){
        state.auction_time=time
      },
      SET_BID_WINNER(state,data){
        state.BidWinner=data;
      }
      // SET_CATEGORY(state,categories){
      //     state.categories=categories;
      //   },
      // SET_USER_PRODUCTS(state,product){
      //   state.User_Products=product;
      // },
      // SET_NUM_USER_POSTS(state,data){
      //   state.num_userPosts=data;
      // }
    }
}
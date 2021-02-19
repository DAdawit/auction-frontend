import axios from 'axios';
export default{
    state:{
        auctionbooked:null,
    },
    getters:{
        AuctionBooked(state){
            return state.auctionbooked;
        }
    },
    actions:{
        async bankUsers(){
            await axios.get('http://127.0.0.1:8001/api/bank/users').then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        async payAuctionBooking({dispatch},data){
            return  axios.post('http://127.0.0.1:8001/api/bank/withdrow',data).then(()=>{
                dispatch('BookAuction',data)
            })
        },

        async BookAuction(_,data){
            await axios.post('user/bookAuction',data).then(()=>{
            }).catch((err)=>{
              console.log(err)
            })
          },

        async checkUserBooked({commit},data){
                await axios.post('user/checkUserBooked',data).then((res)=>{
                    // console.log(res.data)
                        commit('SET_AUCTION_BOOKED',res.data)
                }).catch((err)=>{
                    console.log(err)
                })
        },
       async checkdata(_,data){
          return await axios.post('http://127.0.0.1:8001/api/bank/returnBiddersMoney',data).then((res)=>{
               console.log(res)
           })
       },
       async Pay_and_checkout({dispatch},data){
           return await axios.post('http://127.0.0.1:8001/api/bank/completePayment',data).then(()=>{
                dispatch('completePayement',data.id).then(()=>{
                    dispatch('featchMyWinnings',data.user_id)
                })

            })
        },
        async completePayement(_,id){
            return await axios.post(`user/completePayment/${id}`)
        }

    },
    mutations:{
        SET_AUCTION_BOOKED(state,data){
            state.auctionbooked=data
        }
    }
}
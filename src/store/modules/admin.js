import axios from 'axios';

export default{
    state:{
        categories:[],
        acutions:[],
    },
    getters:{
        categories(state){
            return state.categories;
        },
        Acutions(state){
            return state.acutions;
        },
    },
    actions:{
        async Fatch_Acutions_notApproved({commit}){
            const response=await axios.get('Admin/Acutions')
            commit('SET_ACUTIONS',response.data)
          },
  
        async fatchCategories({commit}){
            const response= await axios.get('Admin/categories')   
            commit('SET_CATEGORY',response.data)
            },    
        async DeleteCategory({dispatch},id){
            console.log(id);
            await axios.post(`Admin/deleteCategory/${id}`).then(()=>{
                dispatch('fatchCategories');
            })
        },
        async AddCategory({dispatch},data){
            await axios.post('Admin/addCategory',data).then(()=>{
                dispatch('fatchCategories');
            })
        },
        async manageAcution({dispatch},data){
            // console.log(data);
            await axios.post(`Admin/manageAcution/${data.postId}`,data).then(()=>{
                dispatch('Fatch_Acutions_notApproved')
            }).catch((err)=>{
                console.log(err)
            })
        },
        async RejectAcution({dispatch},data){
            console.log(data);
            await axios.post('Admin/rejectAcution',data).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            dispatch('Fatch_Acutions_notApproved')
        }
    },
    mutations:{
        SET_CATEGORY(state,categories){
            state.categories=categories;
          },
          SET_ACUTIONS(state,acutions){
            state.acutions=acutions;
          },
    }
}
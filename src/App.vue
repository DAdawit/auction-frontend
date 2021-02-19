<template>
    <v-app style="background: #F5F5F5;">
        <Navbar v-if="User.role=== null || User.role ==='user'" />
        <Admin_nav v-if="User.role==='admin' "  />
        <Super_Admin_nav v-if="User.role==='s_admin'" />
        <homebackimg />
        <v-main class="px-5">
            <router-view></router-view>
        </v-main>
        <foot_bar />
    </v-app>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    import Navbar from './views/nav2';
    import Admin_nav from './views/Admin/admin_nav';
    import Super_Admin_nav from './views/S_Admin/s_admin_nav';

    import foot_bar from '@/components/foot-bar.vue';
    import homebackimg from './views/homeBackground';
    export default {
        data() {
            return {
                User:{
                        role:null
                }
            }
        },
        components: {
            Navbar,
            Admin_nav,
            Super_Admin_nav,
            foot_bar,
            homebackimg
        },
        computed: {
            ...mapGetters(['user'])
        },
        mounted() {
            if(this.user===null){
                console.log('no user');
                this.User.role=null
            }else if(this.user!==null){
                this.User.role=this.user.role;
            }
            // window.Echo.channel('channel')
            //     .listen('NewMessage', (e) => {
            //         console.log(e);
            //     }),
            console.log(this.user)
        },
        updated(){
            if(this.user!==null){
                this.User.role=this.user.role;
            }
        }

    }
</script>
<style>
    #app {
        background-color: var(--v-background-base);
    }
</style>
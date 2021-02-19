<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="600" persistent>
            <v-card class="mx-auto" max-width="600" tile>
                <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg">
                    <v-row align="end" class="fill-height">
                        <v-col align-self="start" class="pa-0" cols="12">
                            <v-avatar class="profile" color="grey" size="164" tile>
                                <v-img :src="WinnerProfile.profile_image"></v-img>
                            </v-avatar>
                        </v-col>
                        <v-col class="py-0">
                            <v-list-item color="rgba(0, 0, 0, .4)" dark>
                                <v-list-item-content>
                                    <v-list-item-title class="title">Auction Winner</v-list-item-title>
                                    <v-list-item-subtitle >{{WinnerProfile.f_name}} {{WinnerProfile.l_name}}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>with price {{offerdPrices.price}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-spacer></v-spacer>
                <v-btn @click="deleteData()" text class="white--text mr-3"> close</v-btn>
                        <!-- <router-link to="/products" class="white--text subtitle-1 mr-5" >Home Auctions

                                    </router-link> -->
                    </v-row>
                </v-img>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        // props: ['offerdPrices'],
        data() {
            return {
                dialog: false,
            }
        },
        methods: {
            ...mapActions(['fechWinnerProfile']),
            deleteData(){
                this.offerdPrices=null;
                // this.offerdPrices
                // this.offerdPrices.price='';
                this.dialog=false;
                this.$router.replace({
                    name:'products'
                })
            }
        },
        computed: {
            ...mapGetters(['WinnerProfile']),
        },
        created() {
            Bus.$on('showCompleteDialog', (() => {
                this.dialog = true;
            }))
                 this.fechWinnerProfile(this.offerdPrices.user_id)  
        },
        mounted() {
                //  this.fechWinnerProfile(this.offerdPrices.user_id)  
                 console.log(this.$route.params.id);
        },
        destroyed() {
            this.offerdPrices=''
        },
    }
</script>
<template>
    <div class="mt-5">
        <v-divider></v-divider>
        <v-card text v-for="product in RejectedAcutions" :key="product.id" class="px-5 mt-5">
            <v-container>
                <v-layout row wrap :class="`pa-3 post ${product.status}`">
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Product Image</div>
                        <v-avatar>
                            <img :src="product.thumbnail" alt="John">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 md2 lg2>
                        <div class="caption grey--text ">Name /product name</div>
                        <div class="pl-2">{{product.name}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md1 lg1>
                        <div class="caption grey--text">Catagory</div>
                        <div>{{product.category_name }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md1 lg1>
                        <div class="caption grey--text">price</div>
                        <div>{{product.price}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Date Posted</div>
                        <div>{{product.created_at}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg1>
                        <div class="caption grey--text">Status</div>
                        <v-chip small :class="`${product.status} black--text caption mr-5`">{{product.status}}</v-chip>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg1>
                        <div class="caption grey--text">Message</div>
                        <div class="caption">{{product.message}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Action</div>
                            <v-btn color="primary" @click="repost(product.id)">RePost</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
import {Bus} from '../../main'
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                post:{
                    user_id:'',
                    post_id:''
                }
            }
        },
        computed: {
            ...mapGetters(['user', 'RejectedAcutions'])
        },
        methods: {
            ...mapActions(['fetchUserRejectedAcutions','repost_Auction']),
           repost(id){
               this.post.user_id=this.user.id;
               this.post.post_id=id;
               this.repost_Auction(this.post).then(()=>{
                   Bus.$emit('Acution_reposted','Acution_reposted')
                    this.fetchUserRejectedAcutions(this.user.id);
               })
           }
        },
        created() {
            this.fetchUserRejectedAcutions(this.user.id);
        },
    }
</script>
<style scoped>
    .v-chip.Rejected {
        background: #f67953;
    }

    .post.Rejected {
        border-left: 4px solid #f67953;
    }
</style>
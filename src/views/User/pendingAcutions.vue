<template>
    <div class="mt-5">
        <!-- {{pendingAcutions}} -->
<v-divider></v-divider>
        <v-card text v-for="product in pendingAcutions" :key="product.id" class="px-5 mt-5">
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
                    <v-flex xs6 sm4 md1 lg2>
                        <div class="caption grey--text">Catagory</div>
                        <div>{{product.category_name }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md1 lg2>
                        <div class="caption grey--text">price</div>
                        <div>{{product.price}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Date Posted</div>
                        <div>{{product.created_at}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Status</div>
                        <v-chip small :class="`${product.status} black--text caption mr-5`">{{product.status}}</v-chip>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import {
        // mapActions,
        mapGetters
    } from 'vuex';
    export default {
        computed: {
            ...mapGetters(['user', 'MyAcutions']),
            pendingAcutions:function(){
               return this.MyAcutions.filter((Pending)=>{
                    return Pending.status.match("Pending")
                });
            }
        },
    }
</script>
<style scoped>
    .post.Pending {
        border-left: 4px solid #FFB74D;
    }

    .v-chip.Pending {
        background: #FFB74D;
    }
</style>
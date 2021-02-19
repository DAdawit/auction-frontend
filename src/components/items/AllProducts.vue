<template>
    <div class="all">
        <br><br>
        <div class=" px-5 mb-5 ">
            <h1 class="subheading grey--text mb-5 ">All Auctions</h1>
            <v-item-group class="mb-5">
                <v-row class="pt-5">
                    <v-col v-for="product in Acutions" :key="product.product_id" cols="12" sm="6" md="4" lg="2">
                        <v-item cols="12" sm="12" md="6" lg="4">
                            <v-hover v-slot="{ hover }">
                                <v-card class="mx-auto" max-width="300" :elevation="hover ? 12 : 2"
                                    :class="{ 'on-hover': hover }">
                                    <v-img :src="product.thumbnail" lazy-src="/no_image.png" height="170px"
                                        class="d-flex align-end">
                                        <!-- <v-chip class="text-uppercase" color="cyan">{{product.name}}</v-chip> -->
                                    </v-img>
                                    <v-card-subtitle class="">
                                        {{product.category_name+' '}}
                                        {{' '+product.name}}
                                        <br>
                                        price :{{product.price}}<br>
                                        start :{{product.start}}<br>
                                        end :{{product.end}}
                                        <!-- <span class="d-flex justify-content-center">{{product.acution_date}}</span> -->
                                    </v-card-subtitle>
                                    <div class="d-flex justify-center">
                                        <!-- <counter :year="product.acution_Y_M_D[0]" :month="product.acution_Y_M_D[1]-1" :date="product.acution_Y_M_D[2]" :hour="product.acution_h_m[0]" :minute="product.acution_h_m[1]"
                                            :second="10" :millisecond="1" /> -->
                                    </div>
                                    <v-card-actions>
                                        <v-btn color="primary" block :to="{name:'test',params:{id: product.id}}">
                                            <!-- <router-link :to="{name:'test',params:{id: product.id}}" class="white--text"> -->
                                                Bid
                                            <!-- </router-link> -->
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-hover>
                        </v-item>
                    </v-col>
                </v-row>
            </v-item-group>
        </div>
    </div>
</template>
<script>
    // import counter from '../Counter';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        name: "allproductComponent",
        components: {
            // counter

        },
        data: () => ({
            show: false,

        }),
        computed: {
            ...mapGetters(['Acutions'])
        },
        methods: {
            ...mapActions(['Fatch_Approved_Acutions', 'Findproduct']),

        },
        created() {
            this.Fatch_Approved_Acutions();
        },
        mounted() {

        },


    }
</script>

<style scoped>
    .v-card {
        transition: opacity .4s ease-in-out;
    }

    .v-card:not(.on-hover) {
        opacity: 0.8;
    }

    .show-btns {
        color: rgba(255, 255, 255, 1) !important;
    }
</style>
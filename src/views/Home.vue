<template>
  <div>
    <div class="d-flex justify-center mt-1">
      <v-card>
        <v-img height="400" width="800" src="auction.jpg"></v-img>
      </v-card>
    </div>

<v-divider></v-divider>

        <div class=" px-5 mb-5 justify-space-around ">
            <h1 class="subheading grey--text mb-5 d-flex justify-center">See Auctions</h1>
            <v-item-group class="mb-5 d-flex justify-space-around">
                <v-row class="pt-5" >
                    <v-col v-for="product in Acution_home" :key="product.product_id" cols="12" sm="6" md="4" lg="2">
                        <v-item cols="12" sm="12" md="6" lg="4" >
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
<div></div>
                                </v-card>
                            </v-hover>
                        </v-item>
                    </v-col>
                </v-row>
            </v-item-group>
        </div>
<v-divider></v-divider>
    <v-container>
      <v-row class="mt-5">
        <v-col cols="6" class="d-flex justify-center">
          <v-img class="mt-5 d-flex justify-center px-5"
            src="https://image.freepik.com/free-photo/close-up-auctioneer-hand-holding-gavel-wooden-hammer-blur-group-people_28914-881.jpg">
              <span class="display-1 text--secondary overline">
                we develop a place for buyers and sellers to come together and bidding.
              </span>
          </v-img>
        </v-col>
        <v-col cols="6" class="d-flex justify-center">
        <v-img class="mt-5 d-flex justify-center px-5"
            src="https://image.freepik.com/free-photo/young-man-with-surprised-expression-won-bet_155003-19444.jpg">
              <span class="display-1 text--secondary d-flex justify-center text-uppercase">
              Start Bidding and win
              </span>
          </v-img>
        </v-col>
      </v-row>
    </v-container>



  </div>
</template>
<script>
  import {
    mapActions,mapGetters
  } from 'vuex';
  export default {
     computed: {
            ...mapGetters(['Acution_home'])
        },
        methods: {
            ...mapActions(['Fatch_Approved_Acutions_for_home', 'Findproduct','bankUsers','checkdata']),

        },
        created() {
            this.Fatch_Approved_Acutions_for_home();
            this.bankUsers();
        },

  }
</script>
<style>
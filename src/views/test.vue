<template>
  <div class="px-5">

    <!-- winner announcement dialog -->
    <div class="text-center" v-if="biddingComplete">
      <v-dialog v-model="winnerdialog" width="600">
        <v-card class="mx-auto" max-width="600" tile>
          <v-img height="100%" src="/back1.png">
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">

              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title black--text">Auction Winner</v-list-item-title>
                    <v-list-item-subtitle class="black--text" v-if="biddingLeader.user_id === user.id">You Win
                    </v-list-item-subtitle>
                    <v-list-item-subtitle class="black--text" v-if="biddingLeader.user_id !== user.id">
                      {{biddingLeader.name}} </v-list-item-subtitle>
                    <v-list-item-subtitle class="black--text">with price {{biddingLeader.price}}</v-list-item-subtitle>

                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-spacer></v-spacer>
              <v-btn @click="deleteData()" text class="white--text mr-3"> close</v-btn>
            </v-row>
          </v-img>
        </v-card>
      </v-dialog>
    </div>


    <br>
    <v-row>
      <v-col cols="12" sm="12" md="4" lg="4">
        <v-card class="mx-auto my-12" max-width="520">
          <v-img class="white--text align-end" max-height="500" :src="product.image">
            <div class="text-center">
              <div class="text-center">
                <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" small class="mb-3">
                      full image
                      <v-icon small right>open_in_full</v-icon>
                    </v-btn>
                  </template>
                  <v-img class="white--text align-end" :src="product.image">
                    <v-row class="d-flex justify-end mr-3 mb-1">
                      <v-btn color="deep-orange lighten-1 white--text" @click="dialog=false">
                        close
                      </v-btn>
                    </v-row>
                  </v-img>
                </v-dialog>
              </div>
            </div>
          </v-img>
          <v-card-title>
            {{product.category_name}}
          </v-card-title>

          <v-card-subtitle>
            {{product.name}}
            <br>
            posted at :{{product.created_at}}
            <br>
            Bidding start price:{{product.price}}
            <br>
            booking_price : {{product.booking_price}}

          </v-card-subtitle>
          <v-divider clas="px-5"></v-divider>

          <v-card-text class="black--text">
            <p>{{product.description}}</p>
          </v-card-text>
        </v-card>
      </v-col>



      <v-col cols="12" sm="12" md="8" lg="8">
        <v-card :loading="loading" class="mx-auto px-2" max-width="610">
          <v-card-title class="d-flex justify-center black--text px-5">
            <v-icon color="black" large>person_pin</v-icon>
          </v-card-title>
          <div class="d-flex justify-center">
            <template v-if="offerdPrices.length>0">
              <v-card-title class="overline font-weight-bold">
                Highst bidder: {{offerdPrices[0].name}} By {{offerdPrices[0].price}}
              </v-card-title>
            </template>
          </div>
          <v-divider></v-divider>

          <v-card-text>
            <v-simple-table fixed-header height="170px" dense light>
              <template v-slot:default>
                <thead class="indigo accent-3">
                  <tr>
                    <th class="text-left">
                      Rank
                    </th>
                    <th class="text-left">
                      Price
                    </th>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-right">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(price ,index) in offerdPrices" :key="price.id">
                    <td class="black--text">{{ index+1 }}</td>
                    <td class="black--text">{{ price.price }}</td>
                    <td class="black--text">{{ price.name }}</td>
                    <td class="text-right black--text">{{ price.created_at }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>

          <div class="d-flex justify-center">
            <counter :year="AuctionDate.auction_y_m_d[0]" :month="AuctionDate.auction_y_m_d[1]-1"
              :date="AuctionDate.auction_y_m_d[2]" :hour="AuctionDate.auction_h_m[0]"
              :minute="AuctionDate.auction_h_m[1]" :second="10" :millisecond="1" />
          </div>
          <v-card-subtitle class="d-flex justify-center black--text">
            <template v-if="offerdPrices.length>0">
              <span class="black--text overline font-weight-bold">Highst Price: {{offerdPrices[0].price}}</span>
            </template>
            <template v-else>
              <span class="black--text font-weight-bold">Bidding Start price: {{product.price}}</span>
            </template>
          </v-card-subtitle>
          <span class="d-flex justify-center caption">Bidding starts when timer is less than 1 houre</span>

          <v-divider></v-divider>
          {{role}}
          <!-- postuserid{{product.user_id}} userid{{authenticated.id}} -->
          <template v-if="!admin">
            <template v-if="authenticated">
              <template v-if="AuctionBooked===0">
                <template v-if="bid">
                  <bankAgreement v-bind:AuctionAgreementData="AuctionAgreementData" />
                </template>
              </template>
              <template v-else>
                <v-card-actions>
                  <v-row class="d-flex justify-space-around">
                    <v-col cols="12" xs="8" sm="8" md="6" lg="6" class="px-5">
                      <v-text-field class="black--text bold" color="black" type="number" v-on:keyup.enter="OfferPrice"
                        label="Next price" v-model="price" outlined>
                      </v-text-field>
                      <template v-if="hide">
                        <v-row>
                          <p class="text-danger small">{{error}}</p>
                        </v-row>
                      </template>
                    </v-col>
                    <v-col cols="12" xs="4" sm="4" md="4" lg="4" class="pt-5 d-flex justify-sm-end">
                      <v-btn color="teal lighten-1 white--text" right @click="OfferPrice">
                        <span>send</span>
                        <v-icon right color="white">send</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </template>
            </template>



            <template v-else>
              <v-card-subtitle class="d-flex justify-center black--text">
                Sign up and take part in acuthions!
              </v-card-subtitle>
              <v-card-actions class="d-flex justify-center black--text">
                <login_com />
              </v-card-actions>
            </template>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="2">
        <!-- right side -->
      </v-col>
    </v-row>



  </div>
</template>

<script>
  import {
    Bus
  } from '../main';
  import bankAgreement from './pages/bankAgreement';
  import counter from '../components/Counter';
  import login_com from '../components/dialog.vue';
  // import auctionComplete from '../views/pages/auctionComplete'

  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default {
    components: {
      counter,
      login_com,
      bankAgreement,
    },

    data: () => ({
      str_date: '',
      counter: 0,
      hide: false,
      price: null,
      bid_data: {},
      dialog: false,
      overlay: false,
      zIndex: 0,
      user: false,
      loading: false,
      selection: 1,
      winnerdialog: false,
      show: true,
      error: '',
      year: '',
      month: '',
      day: '',
      hour: '',
      min: '',
      bid: false,
      admin: false,
      biddingComplete: false,
      // biddingLeader: {},
      AuctionAgreementData: {
        post_id: null,
        user_id: null,
        min_price: null,
        book_number: null
      },
      BookedAuctionData: {
        post_id: null,
        user_id: null
      },
    }),
    computed: {
      ...mapGetters(['product', 'authenticated', 'offerdPrices', 'AuctionDate', 'Profile', 'AuctionBooked']),
      biddingLeader() {
        return this.offerdPrices[0]
      }

    },
    methods: {
      ...mapActions(['Findproduct', 'storeOfferedPrice', 'FindOfferdProductPrice', 'findAuctionDate',
        'store_price_with_Time_update', 'findMyProfile', 'checkUserBooked', 'removeAuction', 'saveToWinners'
      ]),
      listen() {
        window.Echo.channel('bid.' + this.$route.params.id)
          .listen('NewOffer', () => {
            this.FindOfferdProductPrice(this.$route.params.id);
          })
      },
      updatetime() {
        window.Echo.channel('bid.' + this.$route.params.id)
          .listen('UpdateTime', () => {
            this.findAuctionDate(this.$route.params.id)
          })
      },
      OfferPrice() {
        this.bid_data.name = this.authenticated.name;
        this.bid_data.post_id = this.$route.params.id;
        if (this.price <= this.product.price) {
          this.error = 'The price you offer is less than the starting price of the product !';

          this.hide = true;
          return;
        } else if (this.offerdPrices.length == 0) {
          console.log('from first')
          Bus.$emit("checkTime")
          // this.hide = false;
          // this.bid_data.price = this.price;
          // this.storeOfferedPrice(this.bid_data)
        } else if (this.offerdPrices[0].price >= this.price) {
          this.error = 'The price you offer must be greater than current high price !';
          this.hide = true;
          return;
        } else {
          console.log('from else')
          Bus.$emit("checkTime")

        }
      },

      sendPrice() {
        this.hide = false;
        this.bid_data.price = this.price;
        this.storeOfferedPrice(this.bid_data)
      },
      sendPrice_withCangeTime() {
        this.hide = false;
        this.bid_data.price = this.price;
        // console.log('less than 20 second')
        this.store_price_with_Time_update(this.bid_data)
      },
      checkTime(data) {
        // console.log(data)
        // if(data.hour === 0){
        //   if (data.hour === 0 && data.minute === 0 && data.second < 20 && data.second > 0) {
        //     console.log('from change time')
        //     // this.sendPrice_withCangeTime()
        //     this.sendPrice()
        //   } else if (data.minute === 0 && data.second === 0) {
        //     console.log('auction closed')
        //         return
        //   } else {
        //     console.log('correct place')
        //     this.sendPrice()
        //   }
        // }else{
        //   return ;
        // }

        if (data.hour >= 1) {
          Bus.$emit('auction_not_start', 'Auction start when remaing time is less than 1 houre')
          return
        } else if (data.hour === 0 && data.minute === 0 && data.second === 0) {
          Bus.$emit('auctionClosed', 'Auction Closed')
          return;
        } else if (data.hour === 0 && data.minute <= 59) {
          this.sendPrice();
        }

      },
      deleteData() {
        this.offerdPrices = null;
        this.dialog = false;
        this.$router.replace({
          name: 'products'
        })
      }
    },
    created() {
      this.Findproduct(this.$route.params.id);
      this.FindOfferdProductPrice(this.$route.params.id);
      this.findAuctionDate(this.$route.params.id);
      Bus.$on('checkIfBooked', (() => {
          this.checkUserBooked(this.BookedAuctionData)
        })),
        Bus.$on('CurrentAuctionTime', (data) => {
          // console.log(['time request'],[data])
          let newData = {}
          newData.hour = parseInt(data[0]);
          newData.minute = parseInt(data[1]);
          newData.second = parseInt(data[2]);
          this.checkTime(newData)
        }),
        Bus.$on('AuctionCompleted', (() => {
          this.biddingComplete = true;
          this.winnerdialog = true;
          console.log('auction winner', this.biddingLeader)
          this.saveToWinners(this.biddingLeader);
          this.removeAuction(this.$route.params.id);
        })),

        this.findMyProfile(this.authenticated.id).then(() => {
          this.AuctionAgreementData.post_id = this.$route.params.id;
          this.AuctionAgreementData.user_id = this.authenticated.id;
          this.AuctionAgreementData.book_number = this.Profile.book_number;
          this.AuctionAgreementData.min_price = this.product.price;
          this.BookedAuctionData.post_id = parseInt(this.$route.params.id);
          this.BookedAuctionData.user_id = this.authenticated.id;
          this.AuctionAgreementData.booking_price = this.product.booking_price;
        }),

        this.checkUserBooked(this.BookedAuctionData)
      this.updatetime();

      if (this.product.user_id !== this.authenticated.id) {
        this.bid = true;
      } else {
        this.bid = false;
      }
    },
    mounted() {
      this.listen();
    },
    updated() {
      if (this.product.user_id !== this.authenticated.id) {
        this.bid = true;
      } else {
        this.bid = false;
      }

      if (this.authenticated.role === 'admin')
        this.admin = true;
    },
    beforeUpdate() {
      // this.biddingLeader = this.offerdPrices[0];
    }
  }
</script>
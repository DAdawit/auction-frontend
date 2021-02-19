<template>
    <div>


        <template v-if="my_winns.length === 0">
            <v-container>
                <v-card width="1200" height="400" class="d-flex justify-center align-center">
                    <v-card-title class="text-secondary">No Auction </v-card-title>
                    <v-icon x-large>remove_shopping_cart</v-icon>
                </v-card>
            </v-container>
        </template>

        <div class="text-center">
            <v-dialog v-model="dialog" width="600">
                <v-card>
                    <v-card-title class="headline grey lighten-2">
                        Check Out
                    </v-card-title>

                    <v-card-text>
                        bidding start price : {{payementDatas.start_price}} <br>
                        booking price :{{payementDatas.booking_price}}<br>
                        bidding win by :{{payementDatas.winning_price}}<br>
                        totalPayement :{{payementDatas.totalPayement}}


                        <v-form ref="registerForm" v-model="valid" lazy-validation>
                            <v-text-field v-model="pay.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Your bank account password" hint="At least 4 characters"
                                counter @click:append="show1 = !show1" class="px-5" required>
                            </v-text-field>
                        </v-form>

                    </v-card-text>

                    <p class="text-danger small overline">{{error}}</p>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :loading="loading"
                            @click="compeletePayemetn([payementDatas.id,payementDatas.seller_book_number,payementDatas.totalPayement,payementDatas.commesion,payementDatas.winning_price,payementDatas.user_id])">
                            Ok
                        </v-btn>
                        <v-btn color="primary" text @click="dialog = false">
                            cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <v-row class="pt-5">
            <v-col v-for="product in my_winns" :key="product.product_id" cols="12" sm="6" md="6" lg="6">
                <v-item cols="12" sm="12" md="6" lg="6">
                    <template>
                        <v-card class="mx-auto" max-width="500" outlined>
                            <v-list-item three-line>
                                <v-list-item-content>
                                    <div class="overline mb-4">{{product.name}}</div>
                                    <v-list-item-title class="headline mb-1">{{product.category_name}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>{{product.description}}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle small>
                                        start price :{{product.price}}<br>
                                        winning price :{{product.winning_price}}<br>
                                        start price :{{product.price}}<br>
                                        booking price :{{parseInt(product.price)%30}}
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar tile size="130">
                                    <v-img :src="product.thumbnail"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                    <div class="overline mb-4">seller ifno</div>
                                    <v-list-item-title class="headline mb-1">{{product.f_name}} {{product.l_name}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle small>
                                        <v-icon small left>location_on</v-icon> Seller address :{{product.address}}<br>
                                        <v-icon small left>phone</v-icon> Seller phone number
                                        :{{product.phone_number}}<br>
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                            </v-list-item>

                            <v-card-actions>
                                <v-btn color="primary" @click="check_out(product)">check out
                                    <v-icon right>remove_shopping_cart</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-item>
            </v-col>
        </v-row>

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
        data() {
            return {
                payementDatas: {},
                dialog: false,
                valid: true,
                error: '',
                loading: false,
                pay: {
                    password: ''
                },
                password: '',
                show: false,
                show1: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 3) || "Min 4 characters"
                }
            }
        },
        computed: {
            ...mapGetters(['my_winns', 'user', 'UserbookNumber'])
        },
        methods: {
            ...mapActions(['featchMyWinnings', 'findMyProfile', 'Pay_and_checkout']),
            check_out(data) {
                this.payementDatas.user_id = data.user_id;
                this.payementDatas.id = data.id;
                this.payementDatas.winning_price = data.winning_price;
                this.payementDatas.start_price = data.price;
                this.payementDatas.booking_price = data.booking_price;
                this.payementDatas.totalPayement = this.payementDatas.winning_price;
                this.payementDatas.seller_book_number = data.book_number;
                this.dialog = true;
                console.log(data)
            },
            compeletePayemetn(data) {
                this.error = '';
                if (this.pay.password == '') {
                    this.error = 'please enter your bank account password';
                    return;
                }
                this.loading = true;
                this.pay.id = data[0]
                this.pay.seller_book_number = data[1];
                this.pay.buyer_book_number = this.UserbookNumber;
                this.pay.totalPayement = data[2];
                this.pay.winning_price = data[4]
                this.pay.user_id = data[5];
                console.log(this.pay)
                this.Pay_and_checkout(this.pay).then(() => {
                    this.loading = false;
                    this.dialog = false;
                    Bus.$emit('paymentCompleted', 'Payment completed ')
                }).catch((err) => {
                    this.loading = false;
                    this.error = err.response.data.error
                })
            }
        },
        created() {
            this.featchMyWinnings(this.user.id);
            this.findMyProfile(this.user.id)
        },

        updated() {

        },

    }
</script>
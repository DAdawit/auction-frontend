<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="600px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mb-5">
                    start bidding
                    <v-icon right>gavel</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Aggreement
                </v-card-title>

                <v-card-text>
                    Before you start bidding you have to book for this Auction! <b>The money is not refundable !</b>
                    Booking price is <b>{{price}} birr</b>

                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                            label="Your bank account password" hint="At least 4 characters" counter
                            @click:append="show1 = !show1" class="px-5">
                        </v-text-field>
                    </v-form>
                </v-card-text>

                <p class="text-danger small overline pl-5">{{error}}</p>


                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        cancel
                    </v-btn>
                    <v-btn color="primary" :loading="loading" text @click="bookAuction()" :disabled="!valid">
                        I agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main'
    import {
        mapActions
    } from 'vuex';
    export default {
        props: ['AuctionAgreementData'],
        data() {
            return {
                dialog: false,
                price: null,
                loading: false,
                password: '',
                error: '',
                valid: false,
                show1: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 3) || "Min 4 characters"
                }
            }
        },
        methods: {
            ...mapActions(['payAuctionBooking']),
            bookAuction() {
                this.AuctionAgreementData.password = this.password;
                this.payAuctionBooking(this.AuctionAgreementData).then(() => {

                    this.loading = false;
                    this.dialog = false;
                    Bus.$emit("checkIfBooked")
                }).catch((err) => {
                    this.error = err.response.data.error;
                    // console.log('from error ',err.response.data)
                })
            }
        },
        updated() {
            this.price = parseInt(this.AuctionAgreementData.booking_price);
            // this.AuctionAgreementData.bookingPrice = this.price;
            console.log(this.AuctionAgreementData);
        },
    }
</script>
<template>
    <div>
        <v-row class="d-flex justify-content-end px-5">
            <router-link v-if="Profile === null || Profile === undefined" to="/complete_profile"
                class="pl-5 text--blue subtitle-1">
                <v-chip class="blue--text">
                    complete your profile !
                </v-chip>
            </router-link>
        </v-row>
<!-- 
        <template v-if="Fatch_Acutions_notApproved">
            <v-container>
                <v-card width="1200" height="400" class="d-flex justify-center align-center">
                    <v-card-title class="text-secondary">No Auction </v-card-title>
                    <v-icon x-large>not_interested</v-icon>
                </v-card>
            </v-container>
        </template> -->





        <br>


        <v-snackbar v-model="snakAcutionApproved" centered color="#4DB6AC" top>
            <span class="font-weight-bold">{{snakMessage}}</span>
            <template v-slot:action="{ attrs }">
                <v-icon color="white" text v-bind="attrs" @click="snakAcutionApproved = false" small>
                    clear
                </v-icon>
            </template>
        </v-snackbar>


        <v-snackbar v-model="acutionDenied" centered color="red lighten-1" top>
            <span class="black--text">Acution time is not set , can't approve the Acution ! </span>
            <template v-slot:action="{ attrs }">
                <v-icon color="black" text v-bind="attrs" @click="acutionDenied = false" small>
                    clear
                </v-icon>
            </template>
        </v-snackbar>



        <!-- acution approve alert dialog -->
        <template v-if="showAcutionApprove">
            <div class="text-center">
                <v-dialog v-model="AcutionApproveDialog" width="550" persistent>
                    <v-alert prominent type="info">
                        <v-row class="d-flex justify-content-center">
                            Acution date set on {{acution.acution_date}}
                        </v-row>
                        <v-row class="d-flex justify-content-center">
                            Press yes to approve
                        </v-row>
                        <v-row class="d-flex justify-content-center">
                            <v-btn class="mr-3" @click="approveAcution(delet_product_data)">yes</v-btn>
                            <v-btn @click="closeAcutionApproveDialog()">No</v-btn>
                        </v-row>

                    </v-alert>
                </v-dialog>
            </div>
        </template>



        <!-- reject Acution diealog -->

        <v-dialog v-model="rejectAcutionDialog" width="600">
            <v-card>
                <v-card-title class="headline grey lighten-2 d-flex justify-content-center">
                    Reject whith message
                </v-card-title>

                <v-card-text class="px-5">
                    <v-textarea label="Message" v-model="rejectData.message" counter :rules="rules">
                    </v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="sendMessage()">
                        Reject
                        <v-icon right small>send</v-icon>
                    </v-btn>
                    <v-btn color="primary" @click="cancelReject()" text>
                        cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>




        <!-- show full image dialog -->
        <template v-if="show_full_image">
            <v-row>
                <v-dialog v-model="full_image_dialog">
                    <v-img :src="fullImage" lazy-src="/no_image.png" class="d-flex align-end">
                        <v-row class="d-flex justify-end mr-3 mb-1">
                            <v-btn color="deep-orange lighten-1 white--text" @click="closeImageDialog()">
                                close
                            </v-btn>
                        </v-row>
                    </v-img>
                </v-dialog>
            </v-row>
        </template>




        <!-- acution time seter -->
        <template v-if="show">
            <v-row justify="center">
                <v-dialog v-model="timeseter" max-width="800" persistent>
                    <v-card>
                        <v-card-title class="headline grey lighten-2 d-flex text-secondary justify-content-center">
                            Set Acution time
                        </v-card-title>
                        <v-card-subtitle>
                            <span class="overline text-secondary">{{current_time}}</span>
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col>
                                    <v-row justify="center">
                                        <v-date-picker v-model="start_date" year-icon="mdi-calendar-blank"
                                            :min='new Date().toISOString().substr(0, 10)' prev-icon="mdi-skip-previous"
                                            next-icon="mdi-skip-next"></v-date-picker>
                                    </v-row>
                                </v-col>
                                <v-col>
                                    <v-time-picker v-model="start_time" format="24hr"></v-time-picker>
                                </v-col>
                            </v-row>
                            <!-- {{start_date}} {{start_time}} -->
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="green darken-1" text @click="closetimer()">
                                Cancle
                            </v-btn>

                            <v-btn color="green darken-1" text @click="setAcutionTime()">
                                Ok
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </template>



        <v-row>
            <v-item-group class="mb-5 px-5">
                <v-row class="pt-5">
                    <v-col v-for="acution in Acutions" :key="acution.id" cols="12" sm="12" md="12" lg="6">
                        <v-item cols="12" sm="12" md="12" lg="12">
                            <v-card outlined>
                                <v-row>
                                    <v-col cols="12" sm="12" md="5" lg="5" class="imagemargin">
                                        <v-img :src="acution.image" @click="showFullImage(acution.image)"
                                            lazy-src="/no_image.png" height="250px" class="d-flex align-end pl-1 ima">
                                        </v-img>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="4" lg="4">
                                        <v-card-subtitle>
                                            <span class="font-weight-bold">Category</span>
                                            <br>
                                            <span class="pl-3"> {{acution.category_name}}</span>
                                            <br>
                                            <span class="font-weight-bold">Name</span>
                                            <br>
                                            <span class="pl-3"> {{acution.name}}</span>
                                            <br>
                                            <span class="font-weight-bold">Start price</span>
                                            <br>
                                            <span class="pl-3"> {{acution.price}}</span>
                                            <br>
                                            <span class="font-weight-bold">Posted at:</span>
                                            <br>
                                            <span class="pl-3"> {{acution.created_at}}</span>
                                            <br>
                                            <span class="font-weight-bold">Description</span>
                                            <v-btn icon @click="display = !display">
                                                <v-icon>{{ display ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                            </v-btn>

                                            <v-expand-transition>
                                                <div v-show="display">
                                                    <v-card-text>
                                                        {{acution.description}}
                                                    </v-card-text>
                                                </div>
                                            </v-expand-transition>
                                        </v-card-subtitle>

                                    </v-col>
                                    <v-col cols="12" sm="12" md="3" lg="3">
                                        <v-card-subtitle class="caption">
                                            <span class="font-weight-bold">Posted by</span>
                                            <div v-if="acution.usage==='personal'" class="pl-2">
                                                {{acution.f_name}} {{acution.l_name}}
                                            </div>
                                            <div v-if="acution.usage==='organizational'" class="pl-2">
                                                {{acution.org_name}} organization
                                            </div>
                                        </v-card-subtitle>



                                        <!-- acution poser personal info dialog -->
                                        <v-dialog v-model="dialog" width="800">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on"
                                                    @click.stop="dialog = true" x-small>
                                                    show profile
                                                    <v-icon right>person</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title
                                                    class="font-weight-bold headline text-secondary grey lighten-2 d-flex justify-content-center">
                                                    Acution poster information
                                                </v-card-title>
                                                <v-card-title class="d-flex justify-content-center">
                                                    <v-avatar size="140">
                                                        <img :src="acution.profile_image" alt="John">
                                                    </v-avatar>
                                                </v-card-title>
                                                <v-card-text class=" text-center">
                                                    <h4 v-if="acution.usage==='organizational'"
                                                        class="text-uppercase display-2 font-weight-light my-3 text-secondary">
                                                        {{acution.org_name}}
                                                    </h4>
                                                    <h4 v-if="acution.usage==='personal'"
                                                        class="text-uppercase display-2 font-weight-light mb-3 black--text">
                                                        {{acution.f_name}} {{acution.l_name}}
                                                    </h4>
                                                    <p class="caption text-weight-black text-secondary">
                                                        {{acution.about}}
                                                    </p>
                                                    <div class="d-flex justify-content-start">
                                                        <v-icon class="pr-3 mb-2">email</v-icon>
                                                        <span>{{acution.email}}</span>
                                                    </div>
                                                    <div class="d-flex justify-content-start">
                                                        <v-icon class="pr-3 mb-2">phone</v-icon>
                                                        <span>{{acution.phone_number}}</span>
                                                    </div>
                                                    <div class="d-flex justify-content-start">
                                                        <v-icon class="pr-3 mb-2">place</v-icon>
                                                        <span>{{acution.address}}</span>
                                                    </div>
                                                    <div v-if="acution.usage==='organizational'"
                                                        class="d-flex justify-content-start">
                                                        <v-icon class="pr-3 mb-2">contact_mail</v-icon>
                                                        <span>{{acution.po_box}}</span>
                                                    </div>
                                                </v-card-text>
                                            </v-card>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                                <v-row class="d-flex justify-space-around pb-4">
                                    <v-btn color="green darken-4" dark v-bind="attrs" v-on="on"
                                        @click="settime(acution.id)" small>
                                        <v-icon left>schedule</v-icon>
                                        set Auction time
                                    </v-btn>
                                    <v-btn :loading="loading" text color="teal lighten-1"
                                        @click="Alert_approveAcution(acution.id)">
                                        Approve
                                        <v-icon right>check</v-icon>
                                    </v-btn>
                                    <v-btn text color="teal lighten-1 mb-4 white--text" :loading="loading"
                                        @click="rejectAcution([acution.id,acution.user_id])">
                                        reject
                                        <v-icon right>clear</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-item-group>
        </v-row>

    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                snakMessage: '',
                rules: [v => v.length <= 25 || 'Max 25 characters'],
                rejectAcutionDialog: false,
                loading: false,
                snakAcutionApproved: false,
                display: false,
                notifications: false,
                sound: true,
                widgets: false,
                flat: true,
                ct: new Date(),
                current_time: new Date(),
                timeseter: false,
                start_date: new Date().toISOString().substr(0, 10),
                start_time: null,
                picker: new Date().toISOString().substr(0, 10),
                date: new Date().toISOString().substr(0, 10),
                menu: false,
                time: null,
                menu2: false,
                show: false,
                acution: {
                    acution_date: '',
                    status: 'Approved'
                },

                AcutionTime: {
                    start_date: '',
                    start_time: ''
                },
                show_full_image: false,
                full_image_dialog: false,
                fullImage: '',
                showAcutionApprove: false,
                AcutionApproveDialog: false,
                acutionDenied: false,
                rejectData: {
                    user_id: '',
                    post_id: '',
                    message: '',
                    status: 'Rejected'
                }

            }
        },
        computed: {
            ...mapGetters(['checkProfile', 'Profile', 'user', 'Acutions'])
        },
        methods: {
            ...mapActions(['findMyProfile', 'Fatch_Acutions_notApproved', 'manageAcution', 'RejectAcution']),
            settime(val) {
                this.acution.postId = val;
                this.show = true;
                this.timeseter = true;
            },
            closetimer() {
                this.timeseter = false
                this.show = false
            },
            setAcutionTime() {
                this.acution.acution_date = this.start_date + ' ' + this.start_time;
                this.timeseter = false;
                this.show = false;
                console.log(this.acution_date);
            },
            showFullImage(val) {
                this.show_full_image = true;
                this.full_image_dialog = true;
                this.fullImage = val

            },
            closeImageDialog() {
                this.show_full_image = false;
                this.full_image_dialog = false;
                this.fullImage = ''
            },
            Alert_approveAcution(val) {
                console.log(val)
                if (this.acution.acution_date === '') {
                    this.acutionDenied = true;
                    return;
                } else {
                    this.showAcutionApprove = true;
                    this.AcutionApproveDialog = true;
                    this.AcutionTime.status = 'Approved'
                }
            },
            approveAcution() {
                this.loading = true;
                console.log(this.acution);
                this.manageAcution(this.acution).then(() => {
                    this.loading = false;
                    this.snakMessage = 'Acution approved'
                    this.snakAcutionApproved = true;
                    this.AcutionApproveDialog = false;
                    this.showAcutionApprove = false;
                    this.acution.acution_date = ''
                    // this.AcutionTime.start_date = '';
                    // this.AcutionTime.start_time = '';
                    this.start_date = new Date().toISOString().substr(0, 10);
                    this.start_time = null
                }).catch(() => {
                    this.loading = false;
                })
            },
            closeAcutionApproveDialog() {
                this.showAcutionApprove = false;
                this.AcutionApproveDialog = false;
                this.acution.acution_date = '';
                // this.AcutionTime.start_date = '';
                // this.AcutionTime.start_time = '';
                this.start_date = new Date().toISOString().substr(0, 10);
                this.start_time = null
            },
            rejectAcution(val) {
                this.rejectAcutionDialog = true;
                this.rejectData.post_id = val[0];
                this.rejectData.user_id = val[1];
            },
            cancelReject() {
                this.rejectAcutionDialog = false;
                this.rejectData.post_id = '';
                this.rejectData.user_id = '';
            },
            sendMessage() {
                this.loading = true;
                this.RejectAcution(this.rejectData).then(() => {
                    this.snakMessage = 'Acution rejected'
                    this.rejectAcutionDialog = false;
                    this.rejectData.post_id = '';
                    this.rejectData.user_id = '';
                    this.rejectData.message = '';
                    this.snakAcutionApproved = true;
                    this.loading = false;
                })
            }
        },
        created() {
            this.findMyProfile(this.user.id)
            this.Fatch_Acutions_notApproved();
        },
    }
</script>
<style scoped>
    .ima {
        padding: 0%;
        cursor: pointer;
    }

    .imagemargin {
        margin-top: 0%;
    }
</style>
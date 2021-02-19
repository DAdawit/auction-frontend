<template>

    <div class=" px-5 mb-5 ">

        <!-- snackbar when delete acution -->
        <br><br>
        <div class="text-center" v-if="show">
            <v-dialog v-model="edit" persistent width="600">

                <!-- <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#f0f0f0" text v-bind="attrs" v-on="on">
                    </v-btn>
                </template> -->


                <!-- edit product dialog -->
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit product</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Name*" hint="Name of the product" v-model="editItems.name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Price*" hint="price of the product" v-model="editItems.price">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="8" md="8">
                                    <v-textarea label="Discription"
                                        hint="Discripton of the thate going to present on the bidding" persistent-hint
                                        required v-model="editItems.description"></v-textarea>
                                </v-col>
                                <v-col cols="12" sm="4" md="4">
                                    <v-select v-model="editItems.category_id" :items="categories"
                                        item-text="category_name" item-value="id" label="Select" persistent-hint
                                        single-line></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <input type="file" @change="imageChange" class="form-control-file">
                                    <v-img :src="productImage" lazy-src="/no_image.png" width="80px" height="80px"
                                        class="mt-1"></v-img>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="white--text" color="primary" small @click="editClose">
                            close
                        </v-btn>
                        <v-btn class="white--text" color="primary" small :loading="loading" @click="updateData()">
                            update
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </div>

        <!-- Add product -->
        <v-container class="my-5">
            <!-- delete alert dialog -->

            <template v-if="showDelet_dialog">
                <div class="text-center">
                    <v-dialog v-model="delete_dialog" width="550" persistent>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon color="red lighten-2" dark v-bind="attrs" v-on="on">
                                <!-- mdi-delete -->
                            </v-icon>
                        </template>
                        <v-alert prominent type="error">
                            <v-row align="center">
                                <v-col class="grow">
                                    Are you sure you went to delete ?
                                </v-col>
                                <v-col>
                                    <v-btn class="mr-3" @click="deleteItem(delet_product_data)">yes</v-btn>
                                    <v-btn @click="closedialog()">No</v-btn>
                                </v-col>
                            </v-row>
                        </v-alert>
                    </v-dialog>
                </div>
            </template>



            <!-- filter tooltips -->
            <!-- <div>
                <v-layout row class="mb-6 p-2">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small text color="grey" @click="SortBY('title')">
                                <v-icon left small>folder</v-icon>
                                <span>By project name</span>
                            </v-btn>
                        </template>
                        <span>sort projects by project name</span>
                    </v-tooltip>

                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" small text class="text--black" color="grey"
                                @click="SortBY('person')">
                                <v-icon left small>person</v-icon>
                                <span>By person</span>
                            </v-btn>
                        </template>
                        <span>sort projects by project person</span>
                    </v-tooltip>
                </v-layout>
            </div> -->




            <v-card text v-for="product in MyAcutions" :key="product.id" class="px-5">
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
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Status</div>
                        <v-chip small :class="`${product.status} black--text caption mr-5`">{{product.status}}</v-chip>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Actions</div>

                        <v-icon color="orange lighten-1" dark v-bind="attrs" v-on="on" @click="editdata(product)">
                            mdi-pencil
                        </v-icon>

                        <v-icon color="deep-orange accent-4" @click="showdeleteDialog(product.id)">
                            mdi-delete
                        </v-icon>

                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
            </v-card>
        </v-container>
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
                showDelet_dialog: false,
                delete_dialog: false,
                snackbar_pro_deleted: false,
                snackbar_pro_added: false,
                product_id: null,
                loading: false,
                productImage: '',
                category: [],
                editItems: {},
                show: false,
                edit: false,
                offset: true,
                dialog: false,
                delet_product_data: {}
            }
        },

        methods: {
            ...mapActions(['fetchAllMyAcutions', 'UpateProduct', 'DeleteProduct', 'fatchCategories']),
            imageChange(e) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = (e) => {
                    this.productImage = e.target.result
                    this.editItems.image = e.target.result
                }
            },

            editdata(val) {
                this.show = true;
                this.edit = true;
                this.editItems.id = val.id;
                this.productImage = val.image;
                this.editItems.name = val.name;
                this.editItems.price = val.price;
                this.editItems.description = val.description;
                this.editItems.category_id = val.category_id;
                this.editItems.image = null;
                this.editItems.user_id = this.user.id;
            },

            editClose() {
                this.show = false;
                this.edit = false;
            },
            updateData() {
                this.show = false;
                this.edit = false;
                this.UpateProduct(this.editItems)
                    .then((res) => {
                        console.log(res);
                        this.loading = false
                        Bus.$emit('Acution_edited')
                        
                    }).catch((err) => {
                        console.log(err);
                    })
            },
            showdeleteDialog(val) {
                console.log(val)
                this.showDelet_dialog = true;
                this.delet_product_data.id = val;
                this.delet_product_data.user_id = this.user.id;
                this.delete_dialog = true
            },
            deleteItem(delet_product_data) {
                this.DeleteProduct(delet_product_data).then(() => {
                    this.delete_dialog = false;
                    this.product_id = null;
                    Bus.$emit('AcutionDeleted')
                });

            },
            closedialog() {
                this.delete_dialog = false;
                this.showDelet_dialog = false;
                this.product_id = null;
            },

            SortBY(pro) {
                this.projects.sort((a, b) => a[pro] < b[pro] ? -1 : 1);
            },
        },
        computed: {
            ...mapGetters(['MyAcutions', 'user', 'categories'])
        },
        mounted() {
            this.fetchAllMyAcutions(this.user.id)
            this.fatchCategories();
            console.log(this.user.id)
        },
        created() {
            Bus.$on('refatchMyAcutions',(()=>{
                this.fetchAllMyAcutions(this.user.id);
            }))
        }


    }
</script>

<style scoped>
    .post.Approved {
        border-left: 4px solid #42A5F5;
    }

    .v-chip.Approved {
        background: #42A5F5;
    }

    .post.Pending {
        border-left: 4px solid #FFB74D;
    }

    .v-chip.Pending {
        background: #FFB74D;
    }

    .v-chip.Rejected {
        background: #f67953;
    }

    .post.Rejected {
        border-left: 4px solid #f67953;
    }
</style>
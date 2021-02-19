<template>
    <div>
        <v-snackbar v-model="snackbar_category_deleted" centered color="#4DB6AC" class="overline font-weight-bold" top>
            Category deleted !
            <template v-slot:action="{ attrs }">
                <v-icon color="white" text v-bind="attrs" @click="snackbar_category_deleted = false">
                    clear
                </v-icon>
            </template>
        </v-snackbar>

        <v-snackbar v-model="snackbar_category_added" centered color="#4DB6AC" class="overline font-weight-bold" top>
            New Category added !
            <template v-slot:action="{ attrs }">
                <v-icon color="white" text v-bind="attrs" @click="snackbar_category_deleted = false">
                    clear
                </v-icon>
            </template>
        </v-snackbar>
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
                                <v-btn class="mr-3" @click="deleteCategory()">yes</v-btn>
                                <v-btn @click="closedialog()">No</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                </v-dialog>
            </div>
        </template>

        <v-container>
            <v-row>
                <v-col cols="12" sm="12" md="8" lg="9">
                    <v-simple-table fixed-header height="300px" class="m">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">
                                        N<sub><u>O</u></sub>
                                    </th>
                                    <th class="text-left">
                                        Name
                                    </th>
                                    <th class="text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(category,index) in categories" :key="category.id">
                                    <td>{{index+1}}</td>
                                    <td>{{ category.category_name }}</td>
                                    <td>
                                        <!-- <v-icon color="orange lighten-1" dark v-bind="attrs" v-on="on"
                                            @click="editdata(category)"> mdi-pencil
                                        </v-icon> -->
                                        <v-icon color="deep-orange accent-4" @click="showdeleteDialog(category.id)">
                                            delete
                                        </v-icon>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="3">
                    <div class="d-flex justify-content-center align-center pt-5">
                        <div class="text-center">
                            <v-dialog v-model="dialog_add_category" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                        Add Category
                                        <v-icon>add</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline grey lighten-2 d-flex justify-content-center">
                                        Add category
                                    </v-card-title>

                                    <v-card-text class="pa-5">
                                        <v-text-field label="Category Name" v-model="category.category_name">
                                        </v-text-field>
                                    </v-card-text>

                                    <v-divider></v-divider>
                                    <template v-if="show">
                                        <div class="d-flex justify-content-center">
                                            <p class="text-danger overline">{{error}}</p>
                                        </div>
                                    </template>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" :loading="loading" @click="addCateogory()">
                                            Add
                                            <v-icon>add</v-icon>
                                        </v-btn>
                                        <v-btn color="primary" text @click="dialog_add_category = false">
                                            close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>
                </v-col>
            </v-row>

        </v-container>

    </div>
</template>
<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        data() {
            return {
                snackbar_category_deleted: false,
                snackbar_category_added: false,
                dialog_add_category: false,
                showDelet_dialog: false,
                delete_dialog: false,
                category_id: '',
                category: {},
                error: '',
                loading: false,
                show: false
            }
        },
        computed: {
            ...mapGetters(['categories'])
        },
        methods: {
            ...mapActions(['DeleteCategory', 'AddCategory', 'fatchCategories']),
            showdeleteDialog(val) {
                console.log(val)
                this.showDelet_dialog = true;
                this.category_id = val;
                this.delete_dialog = true
            },
            deleteCategory() {
                this.DeleteCategory(this.category_id).then(() => {
                    this.snackbar_category_deleted = true;
                });
                this.delete_dialog = false;
                this.product_id = null;
                this.snackbar_pro_deleted = true
            },
            closedialog() {
                this.delete_dialog = false;
                this.showDelet_dialog = false;
                this.product_id = null;
            },
            addCateogory() {
                const cate = this.categories.map(item => item.category_name);

                if (cate.includes(this.category.category_name)) {
                    this.error = 'Category exists !';
                    this.show = true;
                    return;
                } else {
                    this.AddCategory(this.category).then(() => {
                        this.loading = false;
                        this.dialog_add_category = false;
                        this.snackbar_category_added = true;
                        this.error = '';
                        this.show = false;
                    });
                }
            },
            created() {
                this.fatchCategories();
            },

        }
    }
</script>
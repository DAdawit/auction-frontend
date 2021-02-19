<template>
  <div>

    <v-snackbar v-model="snackbar_pro_added" centered color="#4DB6AC" class="overline font-weight-black" top>
      Auction added successfully !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar_pro_added = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>


    <v-row justify="end">
      <v-dialog v-model="dialog" persistent max-width="700px" class="d-none">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            <span right>Create Auction</span>
            <v-icon right>gavel</v-icon>
          </v-btn>
        </template>
        <v-form ref="form" v-model="valid" lazy-validation>

          <v-card>
            <v-card-title>
              <span class="headline">Add product</span>
              <v-icon>add</v-icon>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Name*" hint="Name of the product" v-model="product.name"
                      :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field label="Start Price*" hint="price of the product" v-model="product.price" type="number"
                      :rules="[rules.required]">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <v-textarea label="Discription" hint="Discripton of the thate going to present on the bidding"
                      persistent-hint required v-model="product.description" :rules="[rules.required]"></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-select v-model="product.category" :items="categories" item-text="category_name" item-value="id"
                      label="Select" persistent-hint single-line :rules="[rules.required]"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <input type="file" @change="imageChange" class="form-control-file" :rules="[rules.required]">
                  </v-col>
                </v-row>
                   <p class="text-danger d-flex justify-center">{{error}}</p>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="white--text" color="primary" small @click="dialog = false">
                Close
              </v-btn>
              <v-btn class="white--text" color="primary" :loading="loading" small @click="postProduct"
                :disabled="!valid">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>


      </v-dialog>
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
        valid: true,
        dialog: false,
        loading: false,
        error:'',
        snackbar_pro_added: false,
        product: {
          name: '',
          price: '',
          description: '',
          category: '',
          image: null
        },
        rules: {
          required: value => !!value || "Required.",
          min: v => (v && v.length >= 5) || "Min 5 characters"
        },
      }
    },
    created() {
      this.fatchCategories()
    },
    computed: {
      ...mapGetters(['categories', 'user'])
    },
    methods: {
      ...mapActions(['postAcution', 'fatchCategories', 'User_products', 'fetchUserPendingAcutions']),
      validate() {
        this.$refs.form.validate()
      },
      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.productImage = e.target.result
          this.product.image = e.target.result
          this.editItems.image = e.target.result
        }
      },
      postProduct() {

        if (this.product.name === '' || this.product.price === '' || this.product.description === '' || this.product
          .category === '') {
          this.error = 'all input filds are required !'
          return;
        }
        this.loading = true;
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }




        this.postAcution(this.product, config)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.User_products(this.user.id);
            this.fetchUserPendingAcutions(this.user.id)
            Bus.$emit('Acution_added');
          }).then(() => {
            Bus.$emit('refatchMyAcutions')
          }).catch((err)=>{
            this.loading=false;
            this.error=err.response.data.errors.image[0]
          })
      }
    },
  }
</script>
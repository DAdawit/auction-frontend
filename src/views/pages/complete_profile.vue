<template>
  <v-container>
    <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-bold" top>
      Profile informations added successfully !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar_pro_deleted = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>

    <v-alert icon="person" border="top" type="info" elevation="2" prominent colored-border
      class="ma-5 d-flex justify-content-center overline font-weight-bold">
      Please complete the following steps to complete your profile !
    </v-alert>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1" class="overline">Set use type</v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2" class="overline">Fill personal/Organization information
        </v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step step="3" class="overline">Upload profile image</v-stepper-step>
      </v-stepper-header>


      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="d-flex justify-content-center mt-5">
            <p class="text-secondary overline font-weight-bold">Use for</p>
          </div>
          <v-card class="mb-12 d-flex justify-content-center" height="200px" required>
            <v-radio-group v-model="profile.usage" row>
              <v-radio class="text-secondary overline" label="Personal" value="personal" @click="check()"></v-radio>
              <v-radio class="text-secondary overline" label="Organization" value="organizational" @click="check()">
              </v-radio>
            </v-radio-group>
          </v-card>
          <template v-if="show">
            <v-btn color="primary" @click="e1 = 2">
              Continue
            </v-btn>
          </template>


          <v-btn text>
            <router-link to="/dashboard" class="black--text subtitle-1">Cancel
            </router-link>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1">
            <v-form ref="form" v-model="personal_info" lazy-validation>
              <v-card class="pa-5">
                <v-row>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-if="profile.usage=='personal'" v-model="profile.f_name" :counter="15"
                      :rules="nameRules" label="First Name*" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-if="profile.usage=='personal'" v-model="profile.l_name" :counter="15"
                      :rules="nameRules" label="Last Name*" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-if="profile.usage=='organizational'" v-model="profile.org_name" :counter="15"
                      :rules="nameRules" label="Organization Name*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-if="profile.usage=='organizational'" v-model="profile.po_box" :counter="15"
                      type="number" label="Po-box">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-model="profile.phone_number" :counter="12" :rules="NumberRules" type="number"
                      label="Phone Number*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-model="profile.address" :counter="15" :rules="nameRules" label="Address*" required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="6" lg="6">
                    <v-text-field v-model="profile.book_number" :counter="15" :rules="NumberRules" type="number"
                      label="CBE Number*" required></v-text-field>
                  </v-col>
                  <v-col cols="12" xs="12" md="12" lg="12">
                    <v-textarea v-if="profile.usage=='personal'" v-model="profile.about" :counter="1000"
                      :rules="DescriptionRules" label="About Me">
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" xs="12" md="12" lg="12">
                    <v-textarea v-if="profile.usage=='organizational'" v-model="profile.about" :counter="1000"
                      :rules="DescriptionRules" label="About us">
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <small>*indicates required field</small>
                </v-row>
              </v-card>
            </v-form>
          </v-card>
          <v-btn color="primary" class="mt-3 mr-3" @click="e1 = 3" :disabled="!personal_info">
            Continue
          </v-btn>
          <v-btn color="primary" class="mt-3" @click="e1 = 1">
            back
          </v-btn>

          <v-btn text class="mt-3">
            <router-link to="/dashboard" class="black--text subtitle-1">Cancel
            </router-link>
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12s" height="350px">
            <div class="d-flex justify-content-center mt-5">
              <v-avatar color="grey" size="80">
                <v-icon x-large>person</v-icon>
              </v-avatar>
            </div>
            <div class="d-flex justify-content-center mt-5">
              <span class="text-secondary overline font-weight-bold">upload profile image</span>
            </div>

            <div class="d-flex justify-content-center mt-5 pl-5">
              <v-icon x-large left>add_a_photo</v-icon>
              <input type="file" @change="imageChange" class="font-weight-bold">
            </div>
            <div class="d-flex justify-content-center mt-5 pl-5">
              <p class="text-danger overline">{{error}}</p>
            </div>
          </v-card>

          <v-btn color="primary" :loading="loading" class=" mt-3 mr-3" @click="saveProfile()">
            Save Profile
          </v-btn>
          <v-btn color="primary" class=" mt-3 mr-3" @click="e1 = 2">
            back
          </v-btn>

          <v-btn text class="mt-3">
            <router-link to="/dashboard" class="black--text subtitle-1">Cancel
            </router-link>
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
  import {
    Bus
  } from '../../main'
  import {
    mapActions
  } from 'vuex';
  export default {
    data() {
      return {
        snackbar: false,
        loading: false,
        error: '',
        show: false,
        profile: {
          usage: '',
          f_name: '',
          l_name: '',
          org_name: '',
          phone_number: '',
          book_number: '',
          po_box: '',
          address:'',
          about: '',
          profile_image: '',
        },
        personal_info: false,
        e1: 1,
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        DescriptionRules: [
          v => (v && v.length <= 1000) || 'Description must be less than 1000 characters',
        ],
        NumberRules: [
          v => !!v || 'required',
          v => (v && v.length <= 15) || 'Name must be less than 12 characters',
          v => /^[0-9][0-9 -]*$/.test(v) || 'Only numbers allowed',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      ...mapActions(['storeProfile']),
      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.profile.profile_image = e.target.result
          // this.editItems.image = e.target.result
        }
      },
      check() {
        this.show = true;
      },
      saveProfile() {
        this.error = '';
        if (this.profile.usage === "personal") {
          if (this.profile.f_name === '' || this.profile.l_name === '' || this.profile.phone_number === '' || this
            .profile.book_number === '' || this.profile.address === '' || this.profile
            .about === '') {
            this.error = 'All personal informations are required !';
            console.log('perosonal error')
            return;
          }
        }

        if (this.profile.usage === 'organizational') {
          if (this.profile.org_name === '' || this.profile.phone_number === '' || this.profile.book_number === '' ||
            this.profile.po_box === '' || this.profile.address === '' || this.profile
            .about === '') {
            this.error = 'All organizational informations are required !';
            console.log('org error')
            return;
          }
        }

        // this.loading = true;
        // console.log(this.profile)
        this.storeProfile(this.profile).then(() => {
          this.loading = false;
          this.snackbar = true;
          this.$router.replace({
            name: 'Home'
          }).catch(() => {
            this.loading = false;
          })
          Bus.$emit('alert_Complete_profile')
        });
      }
    },
    computed: {


    }
  }
</script>
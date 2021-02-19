<template>
  <div>
    <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-bold" top>
      Profile updated !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>

    <v-row v-if="Profile === null || Profile === undefined">
      <v-container class="mt-5">
        <v-card flat height="250" tile class="py-5 ">
          <div class="d-flex align-center  justify-content-center pt-5">
            <v-alert border="top" colored-border type="info" elevation="2" class="overline py-5">
              You personal information is not set pleace fill your personal informations by clicking the following link
            </v-alert>
          </div>
          <div class="d-flex justify-content-center">
            <router-link v-if="Profile === null || Profile === undefined" to="/complete_profile"
              class="pl-5 text--blue subtitle-1">
              click here !
            </router-link>
          </div>
        </v-card>
      </v-container>
    </v-row>

    <v-row v-else>
      <v-col cols="12" sm="12" md="6" lg="5" xl="5">
        <div class="d-flex justify-content-center my-5">
          <v-card max-width="500">
            <v-card-title class="d-flex justify-content-center">
              <v-avatar size="140">
                <img :src="Profile.profile_image" alt="John">
              </v-avatar>
            </v-card-title>
            <v-card-text class=" text-center">

              <h4 v-if="Profile.usage==='organizational'"
                class="text-uppercase display-2 font-weight-light my-3 text-secondary">
                {{Profile.org_name}}
              </h4>
              <h4 v-if="Profile.usage==='personal'" class="text-uppercase display-2 font-weight-light mb-3 black--text">
                {{Profile.f_name}} {{Profile.l_name}}
              </h4>
              <p class="caption text-weight-black text-secondary">
                {{Profile.about}}
              </p>
              <div v-if="user.role!=='user'" class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">account_circle</v-icon> <span class="text-uppercase">{{user.role}}</span>
              </div>
              <div class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">email</v-icon> <span>{{user.email}}</span>
              </div>
              <div class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">phone</v-icon> <span>{{Profile.phone_number}}</span>
              </div>
              <div class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">place</v-icon> <span>{{Profile.address}}</span>
              </div>
              <div v-if="Profile.usage==='organizational'" class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">contact_mail</v-icon> <span>{{Profile.po_box}}</span>
              </div>
            </v-card-text>
            <v-row class="d-flex justify-content-center mb-3">
              <v-chip v-if="user.role==='user'" class="overline">
                number posts : {{num_user_posts}}
              </v-chip>
            </v-row>
            <v-row>
              
            </v-row>
            <v-col cols="12" sm="12" md="12" lg="12" class="d-flex justify-start">
              <changepassword />
            </v-col>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="7" xl="7">
        <v-form ref="form" lazy-validation class="px-5 mt-5">
          <v-card class="pa-5 transparent ">
            <h1 class="subheading grey--text mb-2 ml-5 d-flex justify-content-center ">Edit Profile</h1>
            <v-row>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-if="Profile.usage=='personal'" v-model="Profile.f_name" :counter="15" :rules="nameRules"
                  label="First Name*" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-if="Profile.usage=='personal'" v-model="Profile.l_name" :counter="15" :rules="nameRules"
                  label="Last Name*" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-if="Profile.usage=='organizational'" v-model="Profile.org_name" :counter="15"
                  :rules="nameRules" label="Organization Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-if="Profile.usage=='organizational'" v-model="Profile.po_box" :counter="15"
                  type="number" label="Po-box">
                </v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-model="Profile.phone_number" :counter="12" :rules="NumberRules" type="number"
                  label="Phone Number*" required></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-model="Profile.address" :counter="15" :rules="nameRules" label="Address*" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="6">
                <v-text-field v-model="Profile.book_number" :counter="15" :rules="NumberRules" type="number"
                  label="CBE Number*" required></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="12">
                <v-textarea v-if="Profile.usage=='personal'" v-model="Profile.about" :counter="1000"
                  :rules="DescriptionRules" label="About Me">
                </v-textarea>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="12">
                <v-textarea v-if="Profile.usage=='organizational'" v-model="Profile.about" :counter="1000"
                  :rules="DescriptionRules" label="About us">
                </v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <small>*indicates required field</small>
            </v-row>
            <v-row>
              <div class="d-flex justify-content-center my-5 pl-5">
                <v-row>
                  <span class="pr-5  font-weight-bold">change profile image</span>
                </v-row>
                <v-row class="ml-5">
                  <v-icon x-large left> add_a_photo</v-icon>
                  <input type="file" @change="imageChange" class="font-weight-bold">
                </v-row>
              </div>
            </v-row>
            <v-row class="d-flex justify-content-center my-5">
              <v-btn color="blue lighten-2" :loading="loading" @click="update()" class="white--text">
                Update
                <v-icon right color="white">edit</v-icon>
              </v-btn>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>

  </div>
</template>
<script>
  import changepassword from './changePassword';
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    components: {
      changepassword
    },
    data() {
      return {
        snackbar: false,
        profile: {},
        loading: false,
        updateProfileData: {
          profile_image: null
        },
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
    computed: {
      ...mapGetters(['user', 'Profile', 'num_user_posts']),
    },
    methods: {
      ...mapActions(['findMyProfile', 'UpdateProfile', 'num_userPosts']),

      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.updateProfileData.profile_image = e.target.result
          // this.editItems.image = e.target.result
        }
      },
      update() {
        this.loading = true;
        this.updateProfileData.id = this.Profile.id;
        this.updateProfileData.user_id = this.user.id;
        this.updateProfileData.f_name = this.Profile.f_name;
        this.updateProfileData.l_name = this.Profile.l_name;
        this.updateProfileData.org_name = this.Profile.org_name;
        this.updateProfileData.phone_number = this.Profile.phone_number;
        this.updateProfileData.book_number = this.Profile.book_number;
        this.updateProfileData.po_box = this.Profile.po_box;
        this.updateProfileData.address = this.Profile.address;
        this.updateProfileData.about = this.Profile.about;
        this.UpdateProfile(this.updateProfileData).then(() => {
          this.loading = false;
          this.snackbar = true;
        });
      }
    },
    created() {
      this.num_userPosts(this.user.id);
      this.findMyProfile(this.user.id);
    },
  }
</script>
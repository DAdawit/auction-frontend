<template style="
    background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
  ">
      <v-card>
        <v-card-title>
          <span class="headline">SignUp</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row> 

            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>




    <!-- <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

        <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" required>
        </v-select>

        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?"
            required></v-checkbox>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
            Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
            Reset Validation
        </v-btn>
    </v-form> -->



  <h1 class="subheading">Dashboard</h1>

      </v-card>
      </template>
<template>
  <div class="dashboard px-5 mb-5">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-row justify="end">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">User Profile</span>
            </v-card-title>
            <v-card-text>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Name*" hint="Name of the product" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field label="Price*" hint="price of the product">
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-textarea label="Discription" hint="Discripton of the thate going to present on the bidding"
                    persistent-hint required></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="time" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="time" label="Picker in menu" prepend-icon="mdi-clock-time-four-outline"
                        readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)">
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-file-input show-size counter multiple label="File input"></v-file-input>
                </v-col>
              </v-row>
              <small>*indicates required field</small>
            </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
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
            <v-btn v-bind="attrs" v-on="on" small text class="text--black" color="grey" @click="SortBY('person')">
              <v-icon left small>person</v-icon>
              <span>By person</span>
            </v-btn>
          </template>
          <span>sort projects by project person</span>
        </v-tooltip>
      </v-layout>


      <v-card text v-for="project in projects" :key="project.name">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md2 lg-2>
            <div class="caption grey--text pl-2">Name /product name</div>
            <div class="pl-2">{{project.name}}</div>
          </v-flex>

          <v-flex xs6 sm4 md2 lg-2>
            <div class="caption grey--text">Catagory</div>
            <div>{{project.Catagory}}</div>
          </v-flex>

          <v-flex xs6 sm4 md1 lg-1>
            <div class="caption grey--text">price</div>
            <div>{{project.Price}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 lg-2>
            <div class="caption grey--text">Date Posted</div>
            <div>{{project.created_at}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2 lg-2>
            <div class="caption grey--text">Bidding start time</div>
            <div>{{project.Start_time}}</div>
          </v-flex>
          <v-flex xs2 sm4 md2 lg-1>
            <div class="right">
              <v-chip small :class="`${project.status} black--text caption mr-5`">{{project.status}}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm4 md1 lg-2>
            <div class="caption grey--text">Actions</div>
            <router-link to="/edit" class="pa-3 white--text text-decoration-none">
              <v-icon color="orange lighten-1" dark v-bind="attrs" v-on="on"> mdi-pencil</v-icon>
            </router-link>

            <v-icon small color="deep-orange accent-4" @click="deleteItem(item)">
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
  export default {
    data() {
      return {
        dialog: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        projects: [{
            id: 1,
            name: 'car',
            Catagory: 'kasu',
            Price: '5000$',
            created_at: '12/01/2020',
            Start_time: '12:50pm',
            status: 'Not_approved'
          },
          {
            id: 2,
            name: 'watch',
            Catagory: 'girma',
            Price: '5000$',
            created_at: '12/01/2020',
            Start_time: '12:50pm',
            status: 'approved'
          },
          {
            id: 3,
            name: 'book',
            Catagory: 'gite',
            Price: '5000$',
            created_at: '12/01/2020',
            Start_time: '12:50pm',
            status: 'approved'
          },
          {
            id: 4,
            name: 'samsung',
            Catagory: 'gelo',
            Price: '5000$',
            created_at: '12/01/2020',
            Start_time: '12:50pm',
            status: 'Not_approved'
          },
          {
            id: 5,
            name: 'iphone',
            Catagory: 'kale',
            Price: '35000$',
            created_at: '12/01/2020',
            Start_time: '12:50pm',
            status: 'Not_approved'
          },
        ]
      }
    },
    methods: {
      SortBY(pro) {
        this.projects.sort((a, b) => a[pro] < b[pro] ? -1 : 1);
      },
      deleteItem(value) {
        console.log(value)
      }
    }
  }
</script>

<style>
  .project.approved {
    border-left: 4px solid #3cd1c2;
  }

  .project.Not_approved {
    border-left: 4px solid tomato;
  }




  .v-chip.approved {
    background: #3cd1c2;
  }

  .v-chip.Not_approved {
    background: tomato;
  }
</style>
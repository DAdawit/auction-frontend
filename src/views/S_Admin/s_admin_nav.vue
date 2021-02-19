<template>
  <nav>

    <!-- snackbar acution adde alert -->
    <v-snackbar v-model="snak_profile_changed" centered color="#4DB6AC" class="overline font-weight-black" top>
      Profile Changed !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snak_profile_changed = false" small>
          clear
        </v-icon>
      </template>
    </v-snackbar>
 

    <v-snackbar v-model="snak_admin_added" centered color="#4DB6AC" class="overline font-weight-bold" top>
      New Admin Added !
      <template v-slot:action="{ attrs }">
        <v-icon  color="white" text v-bind="attrs" @click="snak_admin_added = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>

    <v-app-bar flat class="grey lighten-3">
      <template>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>

      <v-toolbar-title class="to-uppercase mr-3" outlined>
        <v-chip large>
          <span large class="font-weight-bold">E_</span>
          <span class="font-weight-light font-weight-medium text--secondary">Acutions</span>
          <v-icon right>gavel</v-icon>
        </v-chip>
      </v-toolbar-title>

      <v-toolbar-items class="d-flex justify-start mt-5">

        <router-link to="/" class="font-weight-medium black--text text--secondary subtitle-1  mt-5 pr-4">Home
        </router-link>
        <!-- <v-icon  class="pr-5">home</v-icon> -->

      </v-toolbar-items>
      <v-spacer></v-spacer>
      <template class="mt-5">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-avatar v-if="authenticated" color="grey" class="font-weight-black overline white--text mr-2" x-large>
          {{user.name[0]}}</v-avatar>
        <login_com v-if="!authenticated"></login_com>
      </template>


      <template v-if="authenticated">
        <v-menu offset-y open-on-hover class="mt-5">
          <template v-slot:activator="{ on, attrs }">
            <span dark v-bind="attrs" v-on="on" class="text--secondary d-none d-sm-flex">
              Menu
              <v-icon color="black">mdi-chevron-down</v-icon>
            </span>
          </template>
          <v-list>
            <v-list-item>
              <router-link to="/dashboard" class="black--text subtitle-1">Dashboard
                <v-icon right small>dashboard</v-icon>
              </router-link>
            </v-list-item>
            <v-list-item>
              <router-link to="/#" class="black--text subtitle-1">user setting
                <v-icon right small>settings</v-icon>
              </router-link>

            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="signOutAction">logout
              <v-icon right small>logout</v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary absolute>
      <v-layout column align-center class="transparent" src="/intro.jpg">
        <v-img src="/intro.jpg">
          <div class=" d-flex justify-content-center mt-5">
            <v-chip large outlined color="green lighten-4">
              <span large class="font-weight-black amber--text">E_</span>
              <span class="font-weight-light  overline white--text">Acutions</span>
              <v-icon right large color="orange lighten-1">gavel</v-icon>
            </v-chip>
          </div>

          <div class=" d-flex justify-content-center mt-5">
            <span v-if="authenticated" class="white--text overline font-weight-bold text-secondary mb-5">{{user.email}}
            </span>
          </div>
        </v-img>
      </v-layout>

      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item router to="Home">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Home</v-list-item-title>
          </v-list-item>
          <v-list-item router to="products">
            <v-list-item-icon>
              <v-icon>gavel</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">acutions</v-list-item-title>
          </v-list-item>
        </v-list-item-group>


        <v-list-item-group v-if="authenticated" active-class="deep-purple--text text--accent-4">
          <v-list-item router to="s_admin_dashboard">
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item router to="add_admin">
            <v-list-item-icon>
              <v-icon>person_add_alt_1</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">add Admin</v-list-item-title>
          </v-list-item>
          <v-list-item router to="profile">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>


      </v-list>
      <template v-if="authenticated" v-slot:append>
        <div class="pa-2 d-flex justify-content-center">
          <v-btn block outlined @click="signOutAction" class="overline">
            Logout
            <v-icon right>logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
  import {
    Bus
  } from '../../main';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import login_com from '@/components/dialog.vue';
  export default {
    role: '',
    name: 'test',
    snak_profile_changed:false,
    components: {
      login_com,
      // Tem,
      // AddItem
    },
    data: () => ({
      role: '',
      snak_profile_changed:false,
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      active: false,
      snackbar_pro_added: false,
      snak_admin_added: false,
      drawer: false,
      right: false,
      items: [{
          title: 'Home',
          icon: 'home',
          route: '/'
        }, {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/dashboard',
          show: 'authenticated'
        },
        {
          title: 'my profile',
          icon: 'person',
          route: 'profile'
        },

      ],

    }),

    computed: {
      ...mapGetters(['authenticated', 'user', 'categories'])
    },
    created() {
      this.fatchCategories();
      Bus.$on('adminAdded', (() => {
        this.snak_admin_added = true;
      }));

      Bus.$on('alert_Complete_profile',(()=>{
        this.snak_profile_changed=true;
      }));


    },
    methods: {
      ...mapActions(['signOut', 'fatchCategories']),

      signOutAction() {
        this.signOut().then(() => {
          location.reload();
          this.$router.replace({
            name: 'Home'
          })
        }).then((e) => {
          this.drawer = false;
          console.log(e);
        })
      },
      snackbarclose() {
        this.drawer = false;
        this.snackbar_pro_added = true;
      }
    }
  }
</script>

<style scoped>
  .router-link-active {
    text-decoration: underline;
  }

  h4 {
    color: green;
  }

  /* text-uppercase white--text text-decoration-none pl-5 subtitle-1 mt-3 router-link-exact-active router-link-active */
  a .router-link-exact-active {
    text-decoration: underline;
  }
</style>
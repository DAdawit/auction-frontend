<template>
  <div>
    <v-app-bar color="#6A87AB" dark shrink-on-scroll src="/banners/pic6.jpg" fade-img-on-scroll>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>

      <template v-if="authenticated">
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      </template>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Todo</span>
        <span>Kasu</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="!authenticated" class="mt-5">
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
        <login_com></login_com>
      </template>
      <template v-if="authenticated">
        <v-avatar color="indigo" size="50" class="text-uppercase white--text">{{user.name[0]}}</v-avatar>
      </template>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <span>
            <router-link to="/" class="text-uppercase white--text text-decoration-none pl-5 subtitle-1 mt-3">Home
            </router-link>
          </span>
          <v-divider vertical inset class="mx-4"></v-divider>
          <span>
            <div class="text-center">
              <v-menu offset-y open-on-hover origin="center center" transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <span class="text-uppercase white--text text-decoration-none subtitle-1 mt-3" v-bind="attrs"
                    v-on="on">
                    Acutions
                    <v-icon>mdi-chevron-down</v-icon>
                  </span>
                </template>
                <v-list>
                  <v-list-item>
                    <router-link to="/products" class="text-uppercase black--text caption ">Personal Acutions
                    </router-link>
                  </v-list-item>
                  <v-list-item>
                    <router-link to="#" class="text-uppercase black--text caption ">Prganizational Acutions
                    </router-link>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </span>
          <v-divider vertical inset class="mx-4"></v-divider>
          <span>
            <div class="text-center">
              <v-menu offset-y open-on-hover origin="center center" transition="slide-x-transition" text>
                <template v-slot:activator="{ on, attrs }">
                  <span class="text-uppercase white--text text-decoration-none subtitle-1 mt-3" v-bind="attrs"
                    v-on="on">
                    Categories
                    <v-icon>mdi-chevron-down</v-icon>
                  </span>
                </template>
                <div class="text-center">
                  <v-list v-for="category in categories" :key="category.id">
                    <router-link :to="category.category_name" class="text-center text-uppercase black--text  caption">
                      {{category.category_name}}</router-link>
                  </v-list>
                </div>
              </v-menu>
            </div>

          </span>
          <!-- <v-divider vertical inset class="mx-4"></v-divider> -->
          <v-divider vertical inset class="mx-3"></v-divider>
          <span>
            <router-link to="/" class="text-uppercase white--text text-decoration-none pl-5 subtitle-1 mt-3">About Us
            </router-link>
          </span>
        </v-tabs>

        <v-spacer></v-spacer>
        <span v-if="authenticated">
          <router-link to="/dashboard" class=" text-uppercase white--text text-decoration-none subtitle-1 mt-3 pr-5">
            Dashboard</router-link>
        </span>
        <v-menu bottom left v-if="authenticated" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="white" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title @click="signOutAction" class="link">
                <v-divider></v-divider>
                <span>logout</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" :right="right" @click="drawer =!drawer" class="blue-grey lighten-2" app>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="'px-0'">
          <v-list-item-avatar>
            <v-icon>person</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" router :to="item.route" :class="active">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import login_com from '../components/dialog.vue';
  export default {
    data: () => ({
      active: false,
      drawer: false,
      right: false,
      items: [{
          title: 'Home',
          icon: 'home',
          route: '/'
        }, {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/dashboard'
        },
        {
          title: 'Photos',
          icon: 'mdi-image'
        },
        {
          title: 'About',
          icon: 'mdi-help-box'
        },
      ],
      datas: [{
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me'
        },
        {
          title: 'Click Me 2'
        },
      ],
    }),
    components: {
      login_com
    },
    computed: {
      ...mapGetters(['authenticated', 'user', 'categories'])
    },
    created() {
      this.fatchCategories();
    },
    methods: {

      ...mapActions(['signOut', 'fatchCategories']),

      signOutAction() {
        this.signOut().then(() => {
          this.$router.replace({
            name: 'home'
          })
        }).then((e) => {
          console.log(e);
        })
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
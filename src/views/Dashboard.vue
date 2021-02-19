<template>
  <div class=" px-5 mt-5 ">
    <v-row class="d-flex justify-end my-5">
      <v-container>
        <AddItem />
      </v-container>
    </v-row>
    <v-card flat>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="subheading grey--text mb-5 ">Dashboard</h1>
      </v-card-title>
      <v-tabs fixed-tabs background-color="transparent" color="light-blue darken-3">
        <v-tab>
          pending Acutions
          <v-icon right>pending</v-icon>
        </v-tab>
        <v-tab>
          approved Acutions
          <v-icon right>verified</v-icon>
        </v-tab>
        <v-tab>
          rejected Acutions
          <v-icon right>thumb_down_alt</v-icon>
        </v-tab>
        <v-tab>
          Manage My Acutions
          <v-icon right>settings</v-icon>
        </v-tab>
        <v-tab-item>
          <pending />
        </v-tab-item>
        <v-tab-item>
          <approved />
        </v-tab-item>
        <v-tab-item>
          <rejected />
        </v-tab-item>
        <v-tab-item>
          <myAllAcutions />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
  import pending from './User/pendingAcutions';
  import approved from './User/approvedAcutions';
  import rejected from './User/rejectedAcutions';
  import myAllAcutions from './User/myAllAcutions';
  import AddItem from '../components/items/AddItem';
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    components: {
      AddItem,
      pending,
      approved,
      rejected,
      myAllAcutions
    },
    computed: {
      ...mapGetters(['user', 'MyAcutions'])
    },
    methods: {
      ...mapActions(['fetchAllMyAcutions'])
    },
    created() {
      this.fetchAllMyAcutions(this.user.id)
    },
    updated() {
      this.fetchAllMyAcutions(this.user.id)
    },
  }
</script>

<style>
  .post.Approved {
    border-left: 4px solid #3cd1c2;
  }

  .post.pending {
    border-left: 4px solid tomato;
  }

  .span.approved {
    background: #3cd1c2;
  }

  .v-chip.pending {
    background: tomato;
  }
</style>
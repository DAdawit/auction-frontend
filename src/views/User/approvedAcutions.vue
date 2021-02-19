<template>
    <div class="mt-5">
        <v-divider></v-divider>
        <v-card text v-for="product in ApprovedAcutions" :key="product.id" class="px-5 mt-5">
            <v-container>
                <v-layout row wrap :class="`pa-3 post ${product.status}`">
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Product Image</div>
                        <v-avatar>
                            <img :src="product.thumbnail" alt="John">
                        </v-avatar>
                    </v-flex>
                    <v-flex xs12 md2 lg1>
                        <div class="caption grey--text ">Name</div>
                        <div class="pl-2">{{product.name}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md1 lg1>
                        <div class="caption grey--text">Catagory</div>
                        <div>{{product.category_name }}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md1 lg2>
                        <div class="caption grey--text">price</div>
                        <div>{{product.price}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Date Posted</div>
                        <div>{{product.created_at}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Acution Date</div>
                        <div>{{product.acution_date}}</div>
                    </v-flex>
                    <v-flex xs6 sm4 md2 lg2>
                        <div class="caption grey--text">Status</div>
                        <v-chip small :class="`${product.status} black--text caption mr-5`">{{product.status}}</v-chip>
                    </v-flex>

                </v-layout>
            </v-container>

        </v-card>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        computed: {
            ...mapGetters(['user', 'ApprovedAcutions'])
        },
        methods: {
            ...mapActions(['fetchUserApprovedAcutions'])
        },
        created() {
            this.fetchUserApprovedAcutions(this.user.id);
        },

    }
</script>
<style scoped>
    .post.Approved {
        border-left: 4px solid #42A5F5;
    }

    .v-chip.Approved {
        background: #42A5F5;
    }
</style>
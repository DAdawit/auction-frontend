<template>
    <div>
        <div>
            <v-container fluid>
                <v-item-group>
                    <v-row>
                        <v-col v-for="n in 6" :key="n" cols="12" md="3">
                            <v-item>
                                <v-card class="mx-auto" max-width="300" color="amber lighten-2">
                                    <v-img src="/pro.jpg" lazy-src="/no_image.png" height="200px"></v-img>
                                    <v-card-title>
                                        Top western road trips
                                    </v-card-title>
                                    <v-card-subtitle>
                                        1,000 miles of wonder
                                    </v-card-subtitle>
                            <v-card-subtitle class="d-flex justify-end">
                                <v-chip class="ma-2 black--text" color="black darken-3" outlined>
                                    <v-avatar left class="display-2">
                                        <v-icon>timer</v-icon>
                                    </v-avatar>
                                    00:00:50 sec
                                </v-chip>
                            </v-card-subtitle>

                                    <v-card-actions>
                                        <v-btn color="black" outlined text>
                                            Bid
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="show = !show">
                                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-expand-transition>
                                        <div v-show="show">
                                            <v-divider></v-divider>
                                            <v-card-text>
                                                I'm a thing. But, like most politicians, he promised more than he could
                                                deliver.
                                                You won't have
                                                time for sleeping, soldier, not with all the bed making you'll be doing.
                                                Then
                                                we'll go with that
                                                data file! Hey, you add a one and two zeros to that or we walk! You're
                                                going to
                                                do his laundry?
                                                I've got to find a way to escape.
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </v-container>
        </div>
    </div>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data: () => ({
            show: false,
        }),
        computed: {
            ...mapGetters(['All_Products'])
        },
        methods: {
            ...mapActions(['AllProducts'])
        },
        created() {
            this.AllProducts();
        }

    }
</script>
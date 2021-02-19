<template>
    <v-container>
        <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-bold" top>
         New Admin Added !
            <template v-slot:action="{ attrs }">
                <v-icon color="white" text v-bind="attrs" @click="snackbar = false">
                    clear
                </v-icon>
            </template>
        </v-snackbar>
        <div class="mt-5 d-flex justify-content-center">
            <v-card class="px-4" max-width="800" outlined>
                <v-card-title class="d-flex justify-content-center">
                    <h1 class="subheading grey--text">Add Admin
                        <v-icon right x-large>person_add_alt_1</v-icon>
                    </h1>
                </v-card-title>
                <v-card-text>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-row class="px-4">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="add.name" :rules="[rules.required]" label="User name"
                                    maxlength="20" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="add.email" :rules="emailRules" label="E-mail" required>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="add.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Password" hint="At least 5 characters" counter
                                    @click:append="show1 = !show1"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1">
                                </v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                <v-btn class="white--text" block :disabled="!valid" color="teal lighten-1" :loading="loading"
                                    @click="validate()">Register
                                    <v-icon right>create</v-icon>
                                </v-btn>
                            </v-col>
                                 <v-col cols="12">
                                     {{error}}
                                 </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>

    </v-container>
</template>


<script>
import {Bus} from '../../../main'
    import {
        mapActions
    } from 'vuex';
    export default {
        computed: {
            passwordMatch() {
                return () => this.add.password === this.verify || "Password must match";
            }
        },
        methods: {
            ...mapActions(['register']),
            validate() {
                this.loading=true;
                this.register(this.add).then((res) => {
                    console.log(res);

                    Bus.$emit('adminAdded');

                    this.loading=false;
                    this.$router.replace({
                        name: 's_admin_dashboard'
                    })
                }).catch((err)=>{
                    this.error=err
                })
            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            }
        },
        data: () => ({
            error:'',
            loading:false,
            snackbar:false,
            dialog: true,
            tab: 0,
            valid: true,
            username: "",
            email: "",
            password: "",
            verify: "",
            loginPassword: "",
            loginEmail: "",
            add: {
                name: '',
                email: '',
                password: '',
                role: 'admin'

            },
            loginEmailRules: [
                v => !!v || "Required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            emailRules: [
                v => !!v || "Required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],

            show1: false,
            rules: {
                required: value => !!value || "Required.",
                min: v => (v && v.length >= 5) || "Min 5 characters"

            }
        })
    }
</script>
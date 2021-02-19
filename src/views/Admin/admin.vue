<template>
    <v-container class="d-flex justify-content-center align-center">
        <v-card class="px-4  py-5" max-width="800">
            <v-card-title class="text-center justify-center  py-6">
                <h1 class="font-weight-bold display-1 text-secondary ">
                    Admin Login
                    <v-icon> admin</v-icon>
                </h1>
            </v-card-title>
            <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" lg="12">
                            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required>
                            </v-text-field>
                        </v-col>
                        <br>
                        <v-col cols="12" lg="12">
                            <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Password" hint="At least 8 characters" counter
                                @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn x-large block :disabled="!valid" color="success" @click="validate"> Login </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>


</template>
<script>
    export default {
        computed: {
            passwordMatch() {
                return () => this.password === this.verify || "Password must match";
            }
        },
        methods: {
            validate() {
                if (this.$refs.loginForm.validate()) {
                    // submit form to server/API here...
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            }
        },
        data: () => ({
            dialog: true,
            tab: 0,
            tabs: [{
                    name: "Login",
                    icon: "mdi-account"
                },
                {
                    name: "Register",
                    icon: "mdi-account-outline"
                }
            ],
            age: null,
            valid: true,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            verify: "",
            loginPassword: "",
            loginEmail: "",
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
                min: v => (v && v.length >= 8) || "Min 8 characters"

            }
        })
    }
</script>
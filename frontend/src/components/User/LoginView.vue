<template>
    <v-container>
        <v-card>
            <v-card-text>
                <h1>로그인</h1>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
    
                    <v-btn :disabled="!valid" @click="submit">
                        submit
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService();
    
    export default {
        name: 'login-view',
        data: () => ({
            valid: true,
            username: '',
            usernameRules: [
                v => !!v || '사용자 아이디를 입력해주세요.',
            ],
            password: '',
            passwordRules: [
                v => !!v || '비밀번호를 입력해주세요.'
            ]
        }),
    
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$store.dispatch('LOGIN', {
                            username: this.username,
                            password: this.password,
                            returnPath: this.returnPath()
                        })
                        // .then(() => this.redirect())
                }
            },
            returnPath() {
                const {
                    search
                } = window.location
                if (search === '') {
                    return '/'
                } else {
                    const tokens = search.replace(/^\?/, '').split('&')
                    const {
                        returnPath
                    } = tokens.reduce((qs, tkn) => {
                        const pair = tkn.split('=')
                        qs[pair[0]] = decodeURIComponent(pair[1])
                        return qs
                    }, {})
                    return returnPath
                }
            }
        },
        created() {
            if (this.$store.getters.isAuthenticated) {
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    
</style>

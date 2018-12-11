<template>
    <v-container>
        <v-card>
            <v-card-text>
                <h1>회원가입</h1>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-text-field v-model="username" :rules="usernameRules" :counter="10" label="Username" required></v-text-field>

                    <v-text-field v-model="publickey" :rules="publickeyRules" label="Public key" required></v-text-field>

                    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Secret Key" required></v-text-field>

                    <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>

                    <v-layout>
                    <v-flex xs6 style="padding-right: 10px;">
                        <v-autocomplete label="nodetype" :items="nodeType" v-model="nodetype" item-text="Nodetype"
                            item-value="Type" :rules="nodetypeRules"></v-autocomplete>
                    </v-flex>

                    <v-flex xs6>
                        <v-autocomplete label="country" :items="countries" v-model="country" item-text="country"
                            item-value="abbr" :rules="countryRules"></v-autocomplete>
                    </v-flex>
                    </v-layout>

                    <v-checkbox color="green" v-model="checkbox" :rules="[v => !!v || '동의하지 않을 경우 가입이 불가능합니다.']" label="이용약관 및 개인정보취급방침 동의"
                        required></v-checkbox>

                    <v-btn :disabled="!valid" @click="submit">
                        submit
                    </v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import Countries from '../../api/country';
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService();

    export default {
        name: 'register-view',
        data: () => ({
            countries: Countries,
            country: '',
            countryRules: [
                v => !!v || '나라를 선택해주세요.'
            ],
            valid: true,
            username: '',
            usernameRules: [
                v => !!v || '사용자 아이디를 입력해주세요.',
                v => (v && v.length <= 10) || '사용자 아이디는 10글자 이하이어야 합니다.'
            ],
            publickey: '',
            publickeyRules: [
                v => !!v || '공개키를 입력해주세요.'
            ],
            password: '',
            passwordRules: [
                v => !!v || '비밀키를 입력해주세요.'
            ],
            email: '',
            emailRules: [
                v => !!v || '이메일을 입력해주세요.',
                v => /.+@.+/.test(v) || '이메일이 올바르지 않습니다.'
            ],
            checkbox: false,
            nodetype: '',
            nodeType: [{
                    Nodetype: 'Collector',
                    type: 'collector'
                },
                {
                    Nodetype: 'Analyzer',
                    type: 'analyzer'
                },
                {
                    Nodetype: 'Storage',
                    type: 'storage'
                }
            ],
            nodetypeRules: [
                v => !!v || '노드를 선택해주세요.'
            ],
        }),

        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    console.log(this.username, this.nodetype);
                    apiService.register(this.username, this.publickey, this.password, this.email, this.nodetype, this.country)
                        .then(response => {
                            if (response.success === true) {
                                alert('회원가입에 성공하셨습니다. 로그인해주십시요.');
                                this.$router.push('/');
                            } else {
                                alert('회원가입에 문제가 있습니다.');
                                console.log(response);
                            }
                        })
                        .catch(err => {
                            if (err) throw err;
                        })
                }
            },
            clear() {
                this.$refs.form.reset()
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
<template>
    <v-container>
        <v-card>
            <v-card-text>
                <h1>회원가입</h1>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="name" :rules="nameRules" :counter="10" label="Username" required></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
                    <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item" required></v-select>
                    <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
    
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
    export default {
        name: 'register-view',
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || '사용자 아이디를 입력해주세요.',
                v => (v && v.length <= 10) || '사용자 아이디는 10글자 이하이어야 합니다.'
            ],
            email: '',
            emailRules: [
                v => !!v || '이메일을 입력해주세요.',
                v => /.+@.+/.test(v) || '이메일이 올바르지 않습니다.'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }),
    
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    this.$http.post('/api/submit', {
                        name: this.name,
                        email: this.email,
                        select: this.select,
                        checkbox: this.checkbox
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>

<style>
    
</style>

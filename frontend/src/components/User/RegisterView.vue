<template>
    <v-container>
        <v-card>
            <v-card-text>
                <h1>회원가입</h1>
                <form>
                    <v-text-field v-model="name" :error-messages="nameErrors" :counter="10" label="Name" required @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
                    <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
                    <v-select v-model="select" :items="items" :error-messages="selectErrors" label="Item" required @change="$v.select.$touch()" @blur="$v.select.$touch()"></v-select>
                    <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="이용약관 및 개인정보취급방침에 동의합니다." required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>
    
                    <v-btn @click="submit">submit</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                </form>
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
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
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

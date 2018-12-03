import axios from 'axios'
let API_URL = ''

if (process.env.NODE_ENV === 'production') {
    API_URL = ''
} else {
    API_URL = 'http://localhost:3000'
}

export class APIService {
    constructor() {

    }

    getMalwares() {
        const url = `${API_URL}/api/malware/get`

        return axios.get(url).then(response => response.data)
    }

    register(username, password, email) {
        const url = `${API_URL}/api/user/signup`

        return axios.post(url, {
            username: username,
            password: password,
            email: email
        }).then(response => response.data)
    }

    login(username, password) {
        const url = `${API_URL}/api/user/signin`

        return axios.post(url, {
            username: username,
            password: password
        }).then(response => response.data)
    }
    
    getProfile() {
        const url = `${API_URL}/api/user/profile`
        
        return axios.get(url).then(response => response.data)
    }
}
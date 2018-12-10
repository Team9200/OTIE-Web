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

    getPosts() {
        const url = `${API_URL}/api/post/get`

        return axios.get(url).then(response => response.data)
    }

    getAllMalwares() {
        const url = `${API_URL}/api/post/get/all`

        return axios.get(url).then(response => response.data)
    }

    viewPost(permlink) {
        const url = `${API_URL}/api/post/view`

        return axios.get(url, {
            params: {
                permlink: permlink
            }
        }).then(response => response.data)
    }

    getPosts(page) {
        const url = `${API_URL}/api/post/get`

        return axios.get(url, {
            params: {
                page: page
            }
        }).then(response => response.data)
    }

    searchPosts(type, query) {
        const url = `${API_URL}/api/post/search`

        return axios.get(url, {
            params: {
                type: type,
                query: query
            }
        }).then(response => response.data)
    }

    searchPosts(type, query, page) {
        const url = `${API_URL}/api/post/search`

        return axios.get(url, {
            params: {
                type: type,
                query: query,
                page: page
            }
        }).then(response => response.data)
    }

    searchNode(type, query) {
        const url = `${API_URL}/api/post/node`

        return axios.get(url, {
            params: {
                type: type,
                query: query
            }
        }).then(response => response.data)
    }
    
    getStorage() {
        const url = `http://openti.info:29200/api/data`

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

    getBlock() {
        const url = `${API_URL}/api/block/get`

        return axios.get(url).then(response => response.data)
    }
}
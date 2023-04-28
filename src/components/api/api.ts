import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            "Content-Type": "application/json"
        }
    }
)
const tokens = localStorage.getItem('tokens') || null
const token = JSON.parse(tokens? tokens: '{}').access
const refresh = JSON.parse(tokens? tokens: '{}').refresh

const instanceVerify = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token ? token : ''}`
        }
    }
)

export const authAPI = {
    registration(data:{username: string, password: string}){
        return instance.post('registration/', data).then(() => {return this.login(data)})
    },
    login(data:{username: string, password: string}){
        return instance.post('login/', data).then(e => {
            localStorage.setItem("tokens", JSON.stringify(e.data))
            if(e.data){
                localStorage.setItem('authSTO', JSON.stringify(data))
            }
        }).then(() => {
            window.location.replace('/home')
        })
    },
    verify(){
        return instance.post('login/verify/', {'token': token? token : ''}).then(e => {
            if(e.status === 200){} else{
                window.location.replace('/login')
            }
        })
        
    }
}

export const ordersAPI = {
    postOrder(data:{title: string, description: string}){
        return instanceVerify.post('')
    }
}
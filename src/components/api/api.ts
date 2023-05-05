import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            "Content-Type": "application/json"
        }
    }
)
const instanceWithPhoto = axios.create(
    {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            "Content-Type": "image/*"
        }
    }
)
const user = localStorage.getItem('authSTO')
const username = JSON.parse(user? user: '').username
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
            localStorage.setItem('isLoggin', 'true')
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
    postOrder(user: string | undefined, title: string | undefined, orderType: string | undefined, adress: string | undefined, price: number | undefined, time: string | undefined, status: string | undefined){
        return instanceVerify.post('orders/', {user, title, orderType, adress, price, time, status})
    },
    getUserOrders(){
        return instanceVerify.get(`orders/?search=${username}`)
    },
    postSuccessOrder(user: string | undefined, order: number | undefined, stars: number | undefined, feedback: string | undefined){
        return instanceVerify.post('successOrder/', {user, order, stars, feedback})
    },
    putOrder(user: string | undefined, title: string | undefined, orderType: string | undefined, adress: string | undefined, price: number | undefined, time: string | undefined, status: string | undefined){
        return instanceVerify.put('orders/', {user, title, orderType, adress, price, time, status})
    }
}

export const servicesAPI = {
    getServices(){
        return instanceWithPhoto.get('services/')
    }
}
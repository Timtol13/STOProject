import React, { useEffect, useState } from "react"
import { ordersAPI } from "../api/api"
import './Profile.modul.scss'

type orderList = {
    orderType: string,
    title: string,
    adress: string,
    time: string,
    price: string,
}

export const Profile = () => {
    const [username, setUsername] = useState<string>('')
    const user = localStorage.getItem('authSTO')
    const [userOrders, setUserOrders] = useState<orderList[]>([])
    useEffect(() => {
        setUsername(JSON.parse(user? user : '').username)
        ordersAPI.getUserOrders().then(e => {setUserOrders(e.data.results)})
    })
    return (
        <div className={'profile'}>
            <h1 className={'link'}><a href={'/home'}>ç<sub>˙</sub>†<sub>˙</sub>ø</a></h1>
            <h1>{username}</h1>
            <div className={'orders'}>
                <h1>Заказы</h1>
                {userOrders.map((order) => {
                    return (
                        <div className={'order'}>
                            <h2>{order.title}</h2>
                            <h4>{order.orderType}</h4>
                            <h4>{order.adress}</h4>
                            <h4>{order.time.replace('T', ' ').replaceAll('-','/')}</h4>
                            <h3>{order.price} BYN</h3>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ordersAPI } from '../../api/api'
import './createOrder.modul.scss'

export const CreateOrder = () => {
    let {title, orderTitle, price} = useParams()
    const [username, setUsername] = useState<string>('')
    const [priceNum, setPriceNum] = useState<number>(0)
    const user = localStorage.getItem("authSTO")
    title = title?.replace('-', ' ')
    orderTitle = orderTitle?.replace('-', ' ')
    price = price?.replace('-',' ')
    useEffect(() => {
        setUsername(JSON.parse(user? user : '').username)
        setPriceNum(Number.parseInt(price? price : ''))
    })
    const formik = useFormik(
        {
            initialValues:{
                adress: '',
                time: '',
            },
            onSubmit: values => {
                ordersAPI.postOrder(username, title, orderTitle, values.adress, priceNum, values.time, 'active')//.then(() => {return window.location.replace('/home')})
            }
        }
    )
    return (
        <div className={'createOrder'}>
            <h1><a href={'/home'}>ç<sub>˙</sub>†<sub>˙</sub>ø</a></h1>
            <form onSubmit={formik.handleSubmit} className={'createOrderForm'}>
                <input readOnly value={title} className={'inputReadOnly'} />
                <input readOnly value={orderTitle} className={'inputReadOnly'} />
                <input readOnly value={priceNum?.toString()} className={'inputReadOnly'} />
                <input placeholder={'Введите адрес'} {...formik.getFieldProps('adress')} />
                <input placeholder={'Введите время'}  type={title === 'Выездной-ремонт'? 'time' : 'datetime-local'} {...formik.getFieldProps('time')} />
                <button type='submit'>Оплатить</button>
            </form>
        </div>
    )
}
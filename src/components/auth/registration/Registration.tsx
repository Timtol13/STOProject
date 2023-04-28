import React from 'react'
import {useFormik} from 'formik'
import { authAPI } from '../../api/api'

export const Registration = () => {
    const formik = useFormik(
        {
            initialValues: {
                username: '',
                password: ''
            },
            onSubmit: values => {
                authAPI.registration(values)
            }
        }
    )
    return (
        <div className={'authForm'}>
            <form onSubmit={formik.handleSubmit}>
                <h1>Регистрация</h1>
                <input placeholder='Придумайте никнейм' {...formik.getFieldProps('username')}/>
                <input placeholder='Придумайте пароль' {...formik.getFieldProps('password')}/>
                <button type='submit'>Зарегестрироваться</button>
            </form>
        </div>
    )
}
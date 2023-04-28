import React from 'react'
import { useFormik } from 'formik'
import { authAPI } from '../../api/api'

export const Login = () => {
    const formik = useFormik(
        {
            initialValues: {
                username: '',
                password: ''
            },
            onSubmit: values => {
                authAPI.login(values)
            }
        }
    )
    return (
        <div className='authForm'>
            <form onSubmit={formik.handleSubmit}>
                <h1>Вход</h1>
                <input placeholder='Введите логин' {...formik.getFieldProps('username')}/>
                <input placeholder='Введите пароль' {...formik.getFieldProps('password')}/>
                <button type={'submit'}>Войти</button>
            </form>
        </div>
    )
}
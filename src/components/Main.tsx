import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import './Main.modul.scss'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from './auth/login/Login'
import { Registration } from './auth/registration/Registration'
import { MakeOrder } from './MakeOrder/MakeOrder'
import { CreateOrder } from './MakeOrder/CreateOrder/CreateOrder'
import { Profile } from './Profile/Profile'
import { servicesAPI } from './api/api'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    boxShadow: '0px -2px 4px #fff, 0px -2px 10px #FF3, 0px -10px 20px #F90, 0px -20px 40px #C33',
    borderRadius: '20px',
  };

type ServicesType = {
    title: '',
    description: '',
    openDescription: '',
    price: ''
}

export const Main = () => { 
    return (
        <div className={'container'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/home'} element={<MainBlock />} />
                    <Route path={'/makeOrder/:title'} element={<MakeOrder />} />
                    <Route path={'/:title/:orderTitle/:price'} element={<CreateOrder />}/>
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/registration'} element={<Registration />} />
                    <Route path={'/profile'} element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export const MainBlock = () => {
    return (
        <div>
            <FirstBlock />
            <Services />
            <WhyWe />
            <Prices />
            <Contacts />
        </div>
    )
}
export const Header =() => {
    const [header, setHeader] = useState<HTMLElement>()
    const [login, setLogin] = useState<boolean>()
    const il = localStorage.getItem('isLoggin')
    useEffect(() => {
        setHeader(document.getElementById('header') as HTMLElement)
        if(il === 'true')
            setLogin(true)
        else{
            setLogin(false)
        }
    }, [])
    document.onscroll = () => {
        if(window.scrollY > 818){
            console.log(header)
            if(header) {
                header.style.position = 'fixed'
                header.style.marginTop = '-821px'
            }
        } else {
            if(header) {
                header.style.position = 'relative'
                header.style.marginTop = '0'
            }
        }
    }
    return (
        <nav id={'header'}>
                <ul>
                    <li><a href={'#services'}>Услуги</a></li>
                    <li><a href={'#aboutus'}>О нас</a></li>
                    <li><a href={'#whywe'}>Почему мы?</a></li>
                    <li><a href={'#prices'}>Цены</a></li>
                    <li><a href={'#contacts'}>Контакты</a></li>
                    {!login && <li><a href={'/login'}>Log-in</a></li> }
                    {!login && <li><a href={'/registration'}>Sign-in</a></li> }
                    {login && <li><a href={'/profile'}>Профиль</a></li>}
                    
                </ul>
            </nav>
    )
}
export const FirstBlock = () => {
    return (
        <div className={'container_block'} id={'aboutus'}>
            <h1>ç<sub>˙</sub>†<sub>˙</sub>ø</h1>
            <div className='services_link'>
                <a type={'button'} href={'#services'}>Наши услуги
                <img src={'arrows.png'} width={120}/></a>
            </div>
        </div>
    )
}
export const Services = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [services, setServices] = useState<ServicesType[]>([])
    useEffect(() => {
        servicesAPI.getServices().then(e => {
            setServices(e.data)
        })
    }, [])
    return (
        <div className={'container_block services sec_img'} id={'services'}>
            <Header />
            <div className={'services_main'}>
                <ul>
                {services?.map(service => {
                    return (
                        <li>
                            <button onClick={() => {
                                handleOpen()
                                setTitle(service.title)
                                setDesc(service.openDescription)
                                setPrice(`Цены на выездной ремонт: ${service.price}`)
                            }} className={'service'}>
                                <img src={'viizdnoyRemont.png'} />
                                <h3>{service.title}</h3>
                                <p>
                                    {service.description}
                                </p>
                            </button>
                        </li>
                    )
                })}
                </ul>
            </div>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style} className={'modal'}>
                    <h1>{title}</h1>
                    <p>{desc}</p><br/>
                    <h3>{price}</h3>
                    <a href={`/makeOrder/${title.replaceAll(' ', '-')}`}>Заказать</a>
                </Box>
            </Modal>
        </div>
    )
}

export const WhyWe = () => {
    return (
        <div className='container_block whywe' id={'whywe'}>
            <h1>Почему мы?</h1>
            <div className={'perks'}>
                <ul>
                    <li className='li'>
                        <div>
                            <img src="geo.png" />
                            <h2>Удобное местоположение</h2>
                            <ul>
                                <li>
                                    <h4>СТО на улице Колесникова 3</h4>
                                </li>
                                <li>
                                    <h4>Удобно доехать с любой точки Минска</h4>
                                </li>
                                <li>
                                    <h4>СТО на улице Колесникова 3</h4>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='li'>
                        <div>
                        <img src="garant.png" />
                            <h2>Стальные гарантии</h2>
                            <ul>
                                <li>
                                    <h4>Гарантии на выполненные работы от 2-х месяцев</h4>
                                </li>
                                <li>
                                    <h4>Гарантии на запчасти от 2-х месяцев</h4>
                                </li>
                                <li>
                                    <h4>Все работы выполнены профессионалами</h4>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className='li'>
                        <div>
                        <img src="zapchasti.png" />
                            <h2>Запчасти в наличии</h2>
                            <ul>
                                <li>
                                    <h4>Оригинальные или реплика - на собственном складе СТО</h4>
                                </li>
                                <li>
                                    <h4>Выбор запчастей заказчиком при оформлении заказа</h4>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export const Prices = () => {
    return (
        <div className='container_block prices' id={'prices'}>
            <ul>
                <li>
                    <h2>Цены на СТО</h2>
                    <hr />
                    <table>
                        <tr className='tableHead'> <td width={240}>Услуга</td> <td>Цена</td> </tr>
                        <tr> <td>Ремонт генератора</td> <td>от 40р</td> </tr>
                        <tr> <td>Ремонт стартера легкового</td> <td>от 40р</td> </tr>
                        <tr> <td>Ремонт стартера грузового</td> <td>от 40р</td> </tr>
                        <tr> <td>Компьютерная диагностика</td> <td>от 30р</td> </tr>
                        <tr> <td>Автоэлектрика</td> <td>от 50р н.ч</td> </tr>
                    </table>
                </li>
                <li>
                    <h2>Цены на Выезде</h2>
                    <hr />
                    <table>
                        <tr className='tableHead'> <td width={240}>Услуга</td> <td>Цена</td> </tr>
                        <tr> <td>Ремонт генератора</td> <td>от 70р</td> </tr>
                        <tr> <td>Ремонт стартера</td> <td>от 70р</td> </tr>
                        <tr> <td>Диагностика</td> <td>от 60р</td> </tr>
                        <tr> <td>Автоэлектрика</td> <td>от 80р н.ч</td> </tr>
                    </table>
                </li>
            </ul>
        </div>
    )
}

export const Contacts = () => {
    return (
        <div className={'container_block contacts'} id={'contacts'}>
                <h3>АДРЕС:</h3>
            <h5>ул. Пушкина, 25, 3 этаж, помещение228</h5>
                <h3>КОНТАКТЫ:</h3>
            <h5>+375 (29) 123-45-67</h5>
            <h5>+375 (29) 765-43-21</h5>
                <h3>ВРЕМЯ РАБОТЫ:</h3>
            <h5>Ежедневно с 9:00 до 21:00</h5>
            <img src={'map.png'} width={250}/>
        </div>
    )
}
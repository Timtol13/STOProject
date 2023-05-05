import React, { useEffect, useState } from "react"
import { ordersAPI } from "../api/api"
import './Profile.modul.scss'
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import { useFormik } from "formik"

type orderList = {
    id: number,
    orderType: string,
    title: string,
    adress: string,
    time: string,
    price: string,
    status: string,
}
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
export const Profile = () => {
    const [username, setUsername] = useState<string>('')
    const user = localStorage.getItem('authSTO')
    const [userOrders, setUserOrders] = useState<orderList[]>([])
    useEffect(() => {
        setUsername(JSON.parse(user? user : '').username)
        ordersAPI.getUserOrders().then(e => {setUserOrders(e.data.results)})
    }, [])
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [id, setID] = useState(0)
    const [stars, setStars] = useState(0)
    const formik = useFormik(
        {
            initialValues:{
                feedback: ''
            },
            onSubmit: values => {
                ordersAPI.postSuccessOrder(username, id, stars, values.feedback).then(e => {console.log(e)}).then(() => {window.location.reload()})
            }
        }
    )
    return (
        <div className={'profile'}>
            <h1 className={'link'}><a href={'/home'}>ç<sub>˙</sub>†<sub>˙</sub>ø</a></h1>
            <h1>{username}</h1>
            <div className={'orders'}>
                <h1>Заказы</h1>
                {userOrders.map((order) => {
                    return order.status !== 'deleted'? (
                        <div className={'order'}>
                            <h5>ID заказа: {order.id}</h5>
                            <h2>{order.title}</h2>
                            <h4>{order.orderType}</h4>
                            <h4>{order.adress}</h4>
                            <h4>{order.time.replace('T', ' ').replaceAll('-','/')}</h4>
                            <h3>{order.price} BYN</h3>
                            <button onClick={() => {
                                handleOpen()
                                setID(order.id)
                                }}>Подтвердить завершение</button>
                        </div> 
                    ) : ''
                })}
            </div>
            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style} className={'modal'}>
                    <div className={'successOrder'}>
                        <h2>Номер заказа: {id}</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="rating-area">
                                <input type="radio" id="star-5" name="rating" value="5" onClick={() => {setStars(5)}} />
                                <label htmlFor="star-5" title="Оценка «5»"></label>	
                                <input type="radio" id="star-4" name="rating" value="4" onClick={() => {setStars(4)}} />
                                <label htmlFor="star-4" title="Оценка «4»"></label>    
                                <input type="radio" id="star-3" name="rating" value="3" onClick={() => {setStars(3)}} />
                                <label htmlFor="star-3" title="Оценка «3»"></label>  
                                <input type="radio" id="star-2" name="rating" value="2" onClick={() => {setStars(2)}} />
                                <label htmlFor="star-2" title="Оценка «2»"></label>    
                                <input type="radio" id="star-1" name="rating" value="1" onClick={() => {setStars(1)}} />
                                <label htmlFor="star-1" title="Оценка «1»"></label>
                            </div>
                            <textarea placeholder="Напишите отзыв..." {...formik.getFieldProps('feedback')}></textarea>
                            <button type='submit'>Подтвердить</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}





















//здесь был Артем
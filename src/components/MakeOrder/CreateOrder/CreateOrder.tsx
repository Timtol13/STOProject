import React from 'react'
import { useParams } from 'react-router-dom'

export const CreateOrder = () => {
    let {title, orderTitle} = useParams()
    title = title?.replace('-', ' ')
    orderTitle = orderTitle?.replace('-', ' ')
    return (
        <div>
            <form>
                <input readOnly placeholder={title} />
                <input readOnly placeholder={orderTitle} />
                <input readOnly placeholder={orderTitle} />
            </form>
        </div>
    )
}
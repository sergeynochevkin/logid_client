import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { OrderContext, SettingContext, UserContext } from '../../..';
import './Card.css'

const CardColValue = observer(({ children, pointStatus }) => {
    const { user } = useContext(UserContext)
    const { order } = useContext(OrderContext)
    const { Setting } = useContext(SettingContext)


    return (
        <div className='card_col_value'
            style={{
                backgroundColor: pointStatus === 'new' || pointStatus === null ? 'rgb(129, 199, 132,0.8)' :
                    pointStatus === 'canceled' ? 'rgb(254, 111, 103,0.8)' :
                        pointStatus === 'completed' ? 'rgb(214,232,255,0.8)' :
                            pointStatus === 'inWork' ? 'rgb(254, 145, 40,0.8)' :
                                pointStatus === 'postponed' ? 'rgb(241,196,15,0.8)' :
                                    Setting.app_theme === 'light' ? 'lightgrey' : '#3c3c3c',
                cursor: (pointStatus === null || pointStatus === 'new' || pointStatus === 'inWork' || pointStatus === 'postponed' || (pointStatus === 'canceled' && user.user.role === 'customer') || (pointStatus === 'completed' && user.user.role === 'customer')) && ((order.order.order_status === 'postponed' && user.user.role === 'customer') || order.order.order_status === 'inWork') ? 'pointer' : '',
                color:Setting.app_theme === 'light' ? 'black' : 'white'
            }}
        >{children}</div>
    )
})

export default CardColValue




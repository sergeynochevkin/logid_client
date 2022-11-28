import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { OrderContext, UserContext } from '../../..';
const { default: styled } = require("styled-components");

const Container = styled.div`
background-color:rgb(255, 186, 65, 0.8);
padding:5px 5px 5px 5px;
font-size:10px;
border-radius:5px 5px 10px 5px;
text-align:center;
`

const CardColValue = observer(({ children, pointStatus }) => {
    const { user } = useContext(UserContext)
    const { order } = useContext(OrderContext)

    return (
        <Container
            style={{
                backgroundColor: pointStatus === 'new' || pointStatus === null ? 'rgb(129, 199, 132,0.8)' :
                    pointStatus === 'canceled' ? 'rgb(254, 111, 103,0.8)' :
                        pointStatus === 'completed' ? 'rgb(214,232,255,0.8)' :
                            pointStatus === 'inWork' ? 'rgb(254, 145, 40,0.8)' :
                                pointStatus === 'postponed' ? 'rgb(241,196,15,0.8)' :
                                    'lightgrey',
                cursor: (pointStatus === null || pointStatus === 'new' || pointStatus === 'inWork' || pointStatus === 'postponed' || (pointStatus === 'canceled' && user.user.role === 'customer') || (pointStatus === 'completed' && user.user.role === 'customer')) && ((order.order.order_status === 'postponed' && user.user.role === 'customer') || order.order.order_status === 'inWork') ? 'pointer' : '',
            }}
        >{children}</Container>
    )
})

export default CardColValue




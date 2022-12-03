import React, { useContext } from 'react'
import { ComponentFunctionContext, NotificationContext, OrderContext, PointContext, UserContext } from '../..'
import { deleteOrder, updateOrder } from '../../http/orderApi'
import { setTime } from '../../modules/setTime'
import { SetTranslate } from '../../modules/SetTranslate'
import { OrderTd } from '../ui/table/OrderTd'
import { v4 } from "uuid";
import close_grey from '../../../src/assets/close_grey.png';
import repeat_order from '../../../src/assets/repeat_order.png';
import './Order.css'

const ArcOrderItem = ({ thisPoints, oneArcOrder, setFetchStart }) => {
    const { order } = useContext(OrderContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Point } = useContext(PointContext)
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)

    const deleteClick = async () => {
        await deleteOrder(oneArcOrder.pointsIntegrationId);
        setFetchStart(true)
        Notification.addNotification([{ id: v4(), type: 'error', message: `Вы удалили ${ComponentFunction.Function === 'arc' ? 'заказ' : 'шаблон'} ${oneArcOrder.id}` }])
    }

    let pointsArray = thisPoints.map(el => el.sequence)
    let maxSequence = Math.max(...pointsArray)
    let minSequence = Math.min(...pointsArray)
    let firstPoint = thisPoints.find(el => el.sequence === minSequence)
    let lastPoint = thisPoints.find(el => el.sequence === maxSequence)
    let formatedFirstPointTime
    if (firstPoint && lastPoint) {
        formatedFirstPointTime = setTime(new Date(firstPoint.time), 0, 'show')
    }
    return (
        <tr className='arc_table_row'>
            <OrderTd>{oneArcOrder.id}</OrderTd>
            <OrderTd>{SetTranslate(oneArcOrder.order_type)}</OrderTd>
            {firstPoint ?
                <>
                    <OrderTd>{firstPoint.point}</OrderTd>
                    <OrderTd>{formatedFirstPointTime}</OrderTd>
                    <OrderTd>{lastPoint.point}</OrderTd>
                </>
                : <></>}
            <OrderTd>{SetTranslate(oneArcOrder.type)}</OrderTd>
            <OrderTd>{oneArcOrder.cost === 0 ? 'не указана' : oneArcOrder.cost}</OrderTd>
            {ComponentFunction.Function === 'arc' ?
                <OrderTd>{SetTranslate(oneArcOrder.order_final_status)}</OrderTd> : <></>}

            {user.user.role === 'customer' ?
                <td>
                    <div className='order_list_icon_container'>
                        <img src={repeat_order}
                            onClick={() => {
                                order.setPattern(JSON.stringify(oneArcOrder))
                                Point.setPattern(JSON.stringify(thisPoints))
                                order.setIntegrationId()
                                if (ComponentFunction.Function === 'arc') {
                                    ComponentFunction.setOrderFormFunction('arc')
                                } else {
                                    ComponentFunction.setOrderFormFunction('pattern')
                                }
                                localStorage.removeItem('orderFormData')
                                ComponentFunction.setPageFunction('orderForm')
                                Notification.addNotification([{ id: v4(), type: 'success', message: `Вы открыли форму из ${ComponentFunction.Function === 'arc' ? 'заказа' : 'шаблона'} ${oneArcOrder.id}, проверьте доступность для партнеров и время в заказе перед отправкой` }])
                            }}
                            className={'order_list_icon'}
                            alt='repeat order'
                        ></img>
                    </div>
                </td>
                : <></>}

            <td>
                <div className='order_list_icon_container'>
                    {ComponentFunction.Function === 'pattern' || (ComponentFunction.Function === 'arc' && oneArcOrder.order_final_status === 'canceled') ?
                        <><img src={close_grey}
                            onClick={deleteClick}
                            className={'order_list_icon'}
                            alt='delete order'
                        ></img>
                        </>
                        : <></>}
                </div>
            </td>
        </tr>
    )
}

export default ArcOrderItem
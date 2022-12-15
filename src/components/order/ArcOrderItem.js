import React, { useContext } from 'react'
import { ComponentFunctionContext, NotificationContext, OrderContext, PointContext, TranslateContext, UserContext } from '../..'
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

    const the = SetTranslate('the')
    const you_deleted = SetTranslate('you_deleted')
    const you_opened = SetTranslate('you_opened')
    const Order = SetTranslate('order')
    const Template = SetTranslate('template')
    const form_from_template = SetTranslate('form_from_template')
    const check_restored_arc = SetTranslate('check_restored_arc')
    const form_from_order = SetTranslate('form_from_order')


    const deleteClick = async () => {
        await deleteOrder(oneArcOrder.pointsIntegrationId);
        setFetchStart(true)
        Notification.addNotification([{ id: v4(), type: 'error', message: `${you_deleted} ${the.toLowerCase()} ${ComponentFunction.Function === 'arc' ? Order.toLowerCase() : Template.toLowerCase()} ${oneArcOrder.id}` }])
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
            <OrderTd>{oneArcOrder.cost === 0 ? SetTranslate('not_specified') : oneArcOrder.cost}</OrderTd>
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
                                Notification.addNotification([{ id: v4(), type: 'success', message: `${you_opened} ${ComponentFunction.Function === 'arc' ? form_from_order : form_from_template} ${oneArcOrder.id}, ${check_restored_arc}` }])
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
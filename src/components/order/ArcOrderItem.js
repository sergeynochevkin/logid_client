import React, { useContext } from 'react'
import { ComponentFunctionContext, FetcherContext, NotificationContext, OrderContext, PointContext, SettingContext, TranslateContext, UserContext } from '../..'
import { deleteOrder } from '../../http/orderApi'
import { setTime } from '../../modules/setTime'
import { OrderTd } from '../ui/table/OrderTd'
import { v4 } from "uuid";
import './Order.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'

const ArcOrderItem = observer(({ thisPoints, oneArcOrder }) => {
    const { order } = useContext(OrderContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Point } = useContext(PointContext)
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)
    const { fetcher } = useContext(FetcherContext)

    const the = SetNativeTranslate(Translate.language, {}, 'the')
    const you_deleted = SetNativeTranslate(Translate.language, {}, 'you_deleted')
    const you_opened = SetNativeTranslate(Translate.language, {}, 'you_opened')
    const Order = SetNativeTranslate(Translate.language, {}, 'order')
    const Template = SetNativeTranslate(Translate.language, {}, 'template')
    const form_from_template = SetNativeTranslate(Translate.language, {}, 'form_from_template')
    const check_restored_arc = SetNativeTranslate(Translate.language, {}, 'check_restored_arc')
    const form_from_order = SetNativeTranslate(Translate.language, {}, 'form_from_order')


    const deleteClick = async () => {
        await deleteOrder(oneArcOrder.pointsIntegrationId);
        fetcher.setOrders(true)
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
        <>
            {
                thisPoints.length > 0 ?
                    <tr className='arc_table_row'>
                        <OrderTd>{oneArcOrder.id}</OrderTd>
                        <OrderTd>{SetNativeTranslate(Translate.language, {}, oneArcOrder.order_type)}</OrderTd>
                        {firstPoint ?
                            <>
                                <OrderTd>{firstPoint.point}</OrderTd>
                                <OrderTd>{formatedFirstPointTime}</OrderTd>
                                <OrderTd>{lastPoint.point}</OrderTd>
                            </>
                            : <></>}
                        <OrderTd>{SetNativeTranslate(Translate.language, {}, oneArcOrder.type)}</OrderTd>
                        <OrderTd>{oneArcOrder.cost === 0 ? SetNativeTranslate(Translate.language, {}, 'not_specified') : oneArcOrder.cost}</OrderTd>
                        {ComponentFunction.Function === 'arc' ?
                            <OrderTd>{SetNativeTranslate(Translate.language, {}, oneArcOrder.order_final_status)}</OrderTd> : <></>}

                        {user.user.role === 'customer' ?
                            <td>
                                <div className='order_list_icon_container'>
                                    <span className={Setting.app_theme === 'light' ? "material-symbols-outlined order_action_icon" : "material-symbols-outlined order_action_icon dark"}
                                        alt='repeat order'
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
                                    >
                                        settings_backup_restore
                                    </span>

                                </div>
                            </td>
                            : <></>}

                        <td>
                            <div className='order_list_icon_container'>
                                {ComponentFunction.Function === 'pattern' || (ComponentFunction.Function === 'arc' && oneArcOrder.order_final_status === 'canceled') ?
                                    <>
                                        <span className={Setting.app_theme === 'light' ? "material-symbols-outlined order_action_icon" : "material-symbols-outlined order_action_icon dark"}
                                            onClick={deleteClick}
                                            alt='delete order'
                                        >
                                            delete_forever
                                        </span>

                                    </>
                                    : <></>}
                            </div>
                        </td>

                    </tr> : <></>
            }
        </>
    )
})

export default ArcOrderItem
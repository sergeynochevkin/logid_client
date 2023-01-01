import React, { useContext, useEffect, useState } from 'react'
import { Form } from '../ui/form/Form'
import { Button } from '../ui/button/Button'
import styled from 'styled-components'
import { ComponentFunctionContext, FetcherContext, LimitContext, NotificationContext, OrderContext, PointContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { createOrder } from '../../http/orderApi'
import { observer } from 'mobx-react-lite'
import OrderComment from './orderForm/OrderComment'
import OrderType from './orderForm/OrderType'
import Cost from './orderForm/Cost'
import { AddDeleteFieldButton } from '../ui/form/AddDeleteFieldButton'
import { createPoint } from '../../http/pointApi'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { v4 } from "uuid";
import { setTime } from '../../modules/setTime'
import { sendMail } from '../../http/mailApi'
import { editOrder } from '../../http/orderApi'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import OrderForWho from './orderForm/OrderForWho'
import TransportFormSection from '../transport/TransportFormSection'
import MapComponent from '../map/MapComponent'
import { useInput } from '../../hooks/useInput'
import OrderFormPointItem from './OrderFormPointItem'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


const Container = styled.div`
display:flex;
gap:5px;
align-items:center;
`

const OrderForm = observer(() => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { Notification } = useContext(NotificationContext)
    const { order } = useContext(OrderContext)
    const { Point } = useContext(PointContext)
    const { Limit } = useContext(LimitContext)
    const { Translate } = useContext(TranslateContext)

    const [pointsNotValid, setPointsNotValid] = useState(false)
    const [timeNotValid, setTimeNotValid] = useState(false)
    const [commentsNotValid, setCommentsNotValid] = useState(false)
    const [orderForWho, setOrderForWho] = useState('all')
    const { fetcher } = useContext(FetcherContext)
    const [calculate, setCalculate] = useState(false)
    const Edited = SetNativeTranslate(Translate.language, {}, 'edited')
    const Order = SetNativeTranslate(Translate.language, {}, 'order')
    const Auction = SetNativeTranslate(Translate.language, {}, 'auction')
    const order_editing_canceled = SetNativeTranslate(Translate.language, {}, 'order_editing_canceled')
    const auction_editing_canceled = SetNativeTranslate(Translate.language, {}, 'auction_editing_canceled')
    const you_can_change_subscription = SetNativeTranslate(Translate.language, {}, 'you_can_change_subscription')
    const point_limit = SetNativeTranslate(Translate.language, {}, 'point_limit')
    const created_and_postponed = SetNativeTranslate(Translate.language, {}, 'created_and_postponed')
    const created_and_send = SetNativeTranslate(Translate.language, {}, 'created_and_send')
    const Template = SetNativeTranslate(Translate.language, {}, 'template')
    const Created = SetNativeTranslate(Translate.language, {}, 'created').toLowerCase()
    const select_adress = SetNativeTranslate(Translate.language, {}, 'select_adress')
    const comment_cant_be_empty = SetNativeTranslate(Translate.language, {}, 'comment_cant_be_empty')
    const comment_cannot_be_shorter = SetNativeTranslate(Translate.language, {}, 'comment_cannot_be_shorter')
    const comment_cannot_be_longer = SetNativeTranslate(Translate.language, {}, 'comment_cannot_be_longer')
    const arrival_time = SetNativeTranslate(Translate.language, {}, 'arrival_time')
    const finish_time = SetNativeTranslate(Translate.language, {}, 'finish_time')
    const symbols = SetNativeTranslate(Translate.language, {}, 'symbols')

    let initialTime = new Date();

    if (ComponentFunction.orderFormFunction === 'newOrder') {
        var initialValue = {
            order_comment: '',
            cost: undefined,
            mileage: undefined,
            carrierId: undefined,
            order_status: '',
            final_status: '',
            userId: undefined,
            country: '',
            city: '',
            type: '',
            load_capacity: '',
            side_type: '',
            thermo_bag: false,
            hydraulic_platform: false,
            side_loading: false,
            glass_stand: false,
            refrigerator_minus: false,
            refrigerator_plus: false,
            thermo_van: false,
            order_type: '',
            userInfoId: undefined,
            pointsIntegrationId: '',
            option: 'new',
            files: '',
            for_partner: '',
            for_group: '',
            direction_response: JSON.stringify([])
        }
    }

    let orderPattern
    let pointPatternInitialValue = []
    let pointPattern

    if (ComponentFunction.orderFormFunction !== 'newOrder') {
        orderPattern = JSON.parse(order.pattern)
        orderPattern.order_comment = { value: orderPattern.order_comment, isDirty: false, notValid: false }
        orderPattern.cost = { value: orderPattern.cost, isDirty: false, notValid: false }
        orderPattern.final_status = undefined
        orderPattern.order_status = 'new'
        orderPattern.final_status = ''
        orderPattern.type = { value: orderPattern.type, isDirty: false }
        orderPattern.load_capacity = { value: orderPattern.load_capacity, isDirty: false }
        orderPattern.side_type = { value: orderPattern.side_type, isDirty: false }
        orderPattern.order_type = { value: orderPattern.order_type, isDirty: false, notValid: false }
        orderPattern.oldPointsId = orderPattern.pointsIntegrationId
        orderPattern.pointsIntegrationId = ''
        orderPattern.for_partner = { value: '', isDirty: false }
        orderPattern.for_group = { value: '', isDirty: false }
        orderPattern.customer_arc_status = ''
        orderPattern.carrier_arc_status = ''
        orderPattern.order_final_status = ''
        orderPattern.updated_by_role = ''
        // thermo_bag    // hydraulic_platform    // side_loading    // glass_stand    // refrigerator_minus    // refrigerator_plus    // thermo_van     //mileage   //userId     //country     //city     // userInfoId    // option    // files        

        pointPattern = JSON.parse(Point.pattern)
        for (const point of pointPattern) {
            point.point = { value: point.point, isDirty: false, isEmptyError: false }
            point.time = { value: point.sequence === 1 ? setTime(initialTime, 120, 'form') : setTime(initialTime, 240, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' }
            point.status = 'new'
            point.customer_comment = { value: point.customer_comment, isDirty: false, minLengthError: false, maxLengthError: false, isEmptyError: true, errorMessage: '' }
            point.carrier_comment = ''
            point.updated_by = undefined
            point.orderIntegrationId = order.integrationId
            pointPatternInitialValue.push(point)
            // id    //latitude    //longitude    //name     //services 
        }
    }

    const [formData, setFormData] = useState(
        localStorage.getItem('orderFormData') && ComponentFunction.orderFormFunction !== 'newOrder' ? JSON.parse(localStorage.getItem('orderFormData')) :
            ComponentFunction.orderFormFunction === 'newOrder' ? initialValue : orderPattern
    )

    const validCost = /^\d+$/
    formData.cost = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.cost.value !== 0 ? orderPattern.cost.value : '', { isEmpty: true, minLength: 2, maxLength: 6, validFormat: validCost }, SetNativeTranslate(Translate.language, {}, 'cost').toLowerCase())
    formData.order_comment = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.order_comment.value, { isEmpty: true, minLength: 6, maxLength: 100 }, SetNativeTranslate(Translate.language, {}, 'comment').toLowerCase())
    formData.order_type = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.order_type.value, { isEmpty: true },)

    formData.userId = user.user.id
    formData.country = UserInfo.userInfo.country
    formData.city = UserInfo.userInfo.city
    formData.userInfoId = UserInfo.userInfo.id
    formData.pointsIntegrationId = order.integrationId

    if (ComponentFunction.orderFormFunction === 'newOrder') {
        var pointInitialValue = [{
            id: 1,
            sequence: 1,
            point: { value: '', isDirty: false, isEmptyError: true, errorMessage: '' },
            latitude: undefined,
            longitude: undefined,
            time: { value: setTime(initialTime, 120, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
            status: 'new',
            name: '',
            customer_comment: { value: '', isDirty: false, minLengthError: false, maxLengthError: false, isEmptyError: true, errorMessage: '' },
            carrier_comment: '',
            services: '',
            updated_by: undefined,
            orderIntegrationId: order.integrationId,
            city: ''
        },
        {
            id: 2,
            sequence: 50,
            point: { value: '', isDirty: false, isEmptyError: true, errorMessage: '' },
            latitude: undefined,
            longitude: undefined,
            time: { value: setTime(initialTime, 240, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
            status: 'new',
            name: '',
            customer_comment: { value: '', isDirty: false, minLengthError: false, maxLengthError: false, isEmptyError: true, errorMessage: '' },
            carrier_comment: '',
            services: '',
            updated_by: undefined,
            orderIntegrationId: order.integrationId,
            city: ''
        },
        ]
    }

    const [pointFormData, setPointFormData] = useState(localStorage.getItem('pointFormData') ? JSON.parse(localStorage.getItem('pointFormData')) :
        ComponentFunction.orderFormFunction === 'newOrder' ? pointInitialValue : pointPatternInitialValue
    )

    const send = (event) => {
        event.preventDefault();

        if (ComponentFunction.orderFormFunction === 'edit') {
            formData.order_status = 'postponed'
            update()
        } else {
            formData.order_status = 'new'
            click()
        }
    }

    const postpone = (event) => {
        event.preventDefault();
        formData.order_status = 'postponed'
        click()
    }

    const pattern = (event) => {
        event.preventDefault();
        formData.order_status = 'pattern'
        click()
    }

    const update = async () => {
        if (formData.cost.isEmpty) {
            formData.cost.value = 0
        }
        await editOrder(
            formData.id,
            formData.order_comment.value,
            formData.cost.value,
            formData.mileage,
            formData.estimated_time,
            formData.carrier,
            formData.order_status,
            formData.order_final_status,
            formData.country,
            formData.city,
            formData.type.value,
            formData.load_capacity.value,
            formData.side_type.value,
            formData.thermo_bag,
            formData.hydraulic_platform,
            formData.side_loading,
            formData.glass_stand,
            formData.refrigerator_minus,
            formData.refrigerator_plus,
            formData.thermo_van,
            formData.order_type.value,
            formData.pointsIntegrationId,
            formData.files,
            formData.for_partner.value,
            formData.for_group.value,
            formData.oldPointsId,
            formData.direction_response
        ).then(
            Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${formData.id} ${Edited}` : `${Auction} ${formData.id} ${Edited}` }])
        ).then(createPoint(pointFormData))
            .then(setFormData(initialValue))
            .then(setPointFormData(pointInitialValue))
            .then(ComponentFunction.setFunction(formData.order_status))
            fetcher.setOrders(true)
            ComponentFunction.setPageFunction('orderList')
            ComponentFunction.setOrdersComponentFunction('orderList')
    }

    const click = async (event) => {
        try {
            let data;
            let orderId
            order.setOrders([])
            if (formData.cost.isEmpty) {
                formData.cost.value = 0
            }
            data = await createOrder(
                Translate.language,
                formData.order_comment.value,
                formData.cost.value,
                formData.mileage,
                formData.estimated_time,
                formData.carrier,
                formData.order_status,
                formData.order_final_status,
                formData.userId,
                formData.country,
                formData.city,
                formData.type.value,
                formData.load_capacity.value,
                formData.side_type.value,
                formData.thermo_bag,
                formData.hydraulic_platform,
                formData.side_loading,
                formData.glass_stand,
                formData.refrigerator_minus,
                formData.refrigerator_plus,
                formData.thermo_van,
                formData.order_type.value,
                formData.userInfoId,
                formData.pointsIntegrationId,
                formData.option,
                '',
                formData.files,
                formData.for_partner.value,
                formData.for_group.value,
                formData.direction_response
            )
                .then(data => { orderId = data.id })
            await createPoint(pointFormData)
            if (formData.order_status === 'new') {
                Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${orderId} ${created_and_send}` : `${Auction} ${orderId} ${created_and_send}` }]);
                sendMail(Translate.language, user.user.role, orderId, 'new_order', '');
            }
            if (formData.order_status === 'postponed') {
                Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${orderId} ${created_and_postponed}` : `${Auction} ${orderId} ${created_and_postponed}` }]);
            }
            if (formData.order_status === 'pattern') {
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Template} ${orderId} ${Created}` }]);
            }

            setFormData(initialValue)
            setPointFormData(pointInitialValue)
            ComponentFunction.setOrdersComponentFunction('orderList')
            ComponentFunction.setFunction(formData.order_status)
            fetcher.setOrders(true)
            ComponentFunction.setPageFunction('orderList')
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    const [currentPoint, setCurrentPoint] = useState(undefined)

    function dragStartHandler(e, point) {
        setCurrentPoint(point)
    }
    function dragLeaveHandler(e) {
        e.target.style.background = ''
    }
    function dragEndHandler(e) {

    }
    function dragOverHandler(e) {
        e.preventDefault()
        e.target.style.background = 'whitesmoke'
    }
    function dropHandler(e, point) {
        e.preventDefault()
        setPointFormData(pointFormData.map(p => {
            if (p.id === point.id) {
                return { ...p, sequence: currentPoint.sequence }
            }
            if (p.id === currentPoint.id) {
                return { ...p, sequence: point.sequence }
            }
            return p
        }))
        setCalculate(true)
        e.target.style.background = ''
    }

    function move_up(point) {
        setCurrentPoint(point)
        setPointFormData(pointFormData.map(p => {
            if (p.sequence === point.sequence) {
                return { ...p, sequence: currentPoint.sequence - 1 }
            }
            if (p.sequence === point.sequence - 1) {
                return { ...p, sequence: currentPoint.sequence + 1 }
            }
            return p
        }))
        setCalculate(true)
    }

    function move_down(point) {
        setCurrentPoint(point)
        setPointFormData(pointFormData.map(p => {
            if (p.sequence === point.sequence) {
                return { ...p, sequence: currentPoint.sequence + 1 }
            }
            if (p.sequence === point.sequence + 1) {
                return { ...p, sequence: currentPoint.sequence - 1 }
            }
            return p
        }))
        setCalculate(true)
    }

    const sortPoints = (a, b) => {
        if (a.sequence > b.sequence) {
            return 1
        } else {
            return -1
        }
    }

    const handleFormChange = (index, event) => {
        let data = [...pointFormData]
        data[index][event.target.name].value = event.target.value
        setPointFormData(data)
    }
    const handleFormBlur = (index, event) => {
        let data = [...pointFormData]
        data[index][event.target.name].isDirty = true
        setPointFormData(data)
    }

    useEffect(() => {
        if (pointFormData.filter(el => el.point.isEmptyError === true).length > 0
        ) {
            setPointsNotValid(true)
        }
        if (pointFormData.filter(el => el.time.isEmptyError === true).length > 0) {
            setTimeNotValid(true)
        }
        if (pointFormData.filter(el => el.customer_comment.minLengthError === true).length > 0 ||
            pointFormData.filter(el => el.customer_comment.maxLengthError === true).length > 0) {
            setCommentsNotValid(true)
        }
    }, [])

    useEffect(() => {
        let pointValidations = { minLength: 5, maxLength: 100, isEmpty: false }
        let customerCommentValidations = { minLength: 5, maxLength: 70, isEmpty: false }
        let timeValidations = { isEmpty: false }
        let maxSequence = Math.max(...pointFormData.map(el => el.sequence))

        for (const point of pointFormData) {
            if (!point.point.value && pointValidations.isEmpty === false) {
                point.point.isEmptyError = true
                point.point.errorMessage = select_adress.toLowerCase()
            } else {
                point.point.isEmptyError = false
            }
            if (!point.customer_comment.value && customerCommentValidations.isEmpty === false) {
                point.customer_comment.isEmptyError = true
                point.customer_comment.errorMessage = comment_cant_be_empty
            } else {
                point.customer_comment.isEmptyError = false
                if (point.customer_comment.value.length < pointValidations.minLength) {
                    point.customer_comment.minLengthError = true
                    point.customer_comment.errorMessage = `${comment_cannot_be_shorter} ${customerCommentValidations.minLength} ${symbols}`
                } else {
                    point.customer_comment.minLengthError = false
                    if (point.customer_comment.value.length > pointValidations.maxLength) {
                        point.customer_comment.maxLengthError = true
                        point.customer_comment.errorMessage = `${comment_cannot_be_longer} ${customerCommentValidations.maxLength} ${symbols}`
                    } else {
                        point.point.maxLengthError = false
                    }
                }
            }
            if (!point.time.value && timeValidations.isEmpty === false) {
                point.time.isEmptyError = true
                point.time.errorMessage = `${point.sequence === 1 ? arrival_time : point.sequence === maxSequence ? finish_time : ''}`
            } else {
                point.time.isEmptyError = false
            }
        }
        if (pointFormData.filter(el => el.point.isEmptyError === true).length > 0 ||
            pointFormData.filter(el => el.point.minLengthError === true).length > 0 ||
            pointFormData.filter(el => el.point.maxLengthError === true).length > 0) {
            setPointsNotValid(true)
        }
        else {
            setPointsNotValid(false)
        }

        if (pointFormData.filter(el => el.time.isEmptyError === true).length > 0) {
            setTimeNotValid(true)
        }
        else {
            setTimeNotValid(false)
        }

        if (pointFormData.filter(el => el.customer_comment.minLengthError === true).length > 0 ||
            pointFormData.filter(el => el.customer_comment.maxLengthError === true).length > 0) {
            setCommentsNotValid(true)
        }
        else {
            setCommentsNotValid(false)
        }
    }, [pointFormData])

    const addField = () => {
        if (pointFormData.length >= Limit.user_limits.customer_new_order_point_limit) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${point_limit} ${Limit.user_limits.customer_new_order_point_limit}. ${you_can_change_subscription}` }])
        } else {
            let idArray = pointFormData.map(el => el.id)
            let maxId = Math.max(...idArray)
            let orderArray = pointFormData.filter(el => el.sequence !== 50).map(el => el.sequence)
            let maxOrder = Math.max(...orderArray)
            let newField = {
                id: maxId + 1,
                point: { value: '', isDirty: false, isEmptyError: true, errorMessage: '' },
                latitude: undefined,
                longitude: undefined,
                time: { value: setTime(initialTime, 240, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
                status: 'new',
                sequence: maxOrder + 1,
                name: '',
                customer_comment: { value: '', isDirty: false, minLengthError: false, maxLengthError: false, isEmptyError: true, errorMessage: '' },
                carrier_comment: '',
                services: '',
                updated_by: undefined,
                orderIntegrationId: order.integrationId,
                city: ''
            }
            setPointFormData([...pointFormData, newField])
        }
    }

    const removeField = (index) => {
        let data = [...pointFormData];
        data.splice(index, 1)
        setPointFormData(data)
        setCalculate(true)
    }

    useEffect(() => {
        localStorage.setItem('orderFormData', JSON.stringify(formData))
    }, [formData.order_comment, formData.cost, formData.for_partner, formData.for_group, formData.order_type])

    useEffect(() => {
        localStorage.setItem('pointFormData', JSON.stringify(pointFormData))
    }, [pointFormData])


    const parent = 'orderForm'

    return (
        <VerticalContainer
            style={{ width: '100%', alignItems: 'center' }}
        >
            <Form
                style={{ marginTop: '10px' }}>


                <VerticalContainer
                    style={{
                        flexDirection: pointFormData.length > 4 ? 'row' : 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    }}
                >
                    {pointFormData.sort(sortPoints).map((pointItem, index) =>
                        <OrderFormPointItem
                            setCurrentPoint={setCurrentPoint}
                            move_up={move_up}
                            move_down={move_down}
                            pointFormData={pointFormData}
                            setPointFormData={setPointFormData}
                            pointItem={pointItem}
                            index={index}
                            dragStartHandler={dragStartHandler}
                            dragLeaveHandler={dragLeaveHandler}
                            dragEndHandler={dragEndHandler}
                            dragOverHandler={dragOverHandler}
                            dropHandler={dropHandler}
                            handleFormChange={handleFormChange}
                            handleFormBlur={handleFormBlur}
                            removeField={removeField}
                            key={pointItem.id}
                            setCalculate={setCalculate}
                        />
                    )}
                </VerticalContainer>

                {pointFormData.length < 50 ? <AddDeleteFieldButton onClick={addField}>{SetNativeTranslate(Translate.language, {}, 'add_point')}</AddDeleteFieldButton> : <></>}

                <OrderComment
                    formData={formData}
                    setFormData={setFormData}
                />
                <TransportFormSection
                    formData={formData}
                    setFormData={setFormData}
                    parent={parent}
                    orderPattern={orderPattern}
                    setCalculate={setCalculate}
                />
                <Cost
                    formData={formData}
                    setFormData={setFormData}
                />
                <OrderType
                    formData={formData}
                    setFormData={setFormData}
                />

                <OrderForWho
                    formData={formData}
                    setFormData={setFormData}
                    orderForWho={orderForWho}
                    setOrderForWho={setOrderForWho}
                />


                {/* <DragDropUpload formData={formData} setFormData={setFormData} length={5} extensions={['jpeg', 'png', 'jpg']}></DragDropUpload> */}
                <Container>
                    <Button onClick={send}
                        disabled={
                            pointsNotValid || commentsNotValid || timeNotValid
                            || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (orderForWho === 'partner' && formData.for_partner.isEmpty) || (orderForWho === 'group' && formData.for_group.isEmpty)
                            || formData.type.isEmpty
                            ||
                            (formData.load_capacity.isEmpty && formData.type === 'truck') ||
                            (formData.load_capacity.isEmpty && formData.type === 'minibus') ||
                            (formData.side_type.isEmpty && formData.type === 'truck')
                            || (formData.cost.notValid && formData.order_type.value === 'order')

                        }
                    >{ComponentFunction.orderFormFunction === 'edit' ? SetNativeTranslate(Translate.language, {}, 'save') : SetNativeTranslate(Translate.language, {}, 'send')}</Button>
                    {ComponentFunction.orderFormFunction === 'edit' ?
                        <Button
                            onClick={() => {
                                ComponentFunction.setOrdersComponentFunction('orderList')
                                order.setOrders([])
                                ComponentFunction.setFunction('postponed');
                                ComponentFunction.setPageFunction('orderList')
                                ComponentFunction.setOrderFormFunction('newOrder')
                                Notification.addNotification([{ id: v4(), type: 'error', message: formData.order_type.value === 'order' ? order_editing_canceled : auction_editing_canceled }]);
                            }}
                        >{SetNativeTranslate(Translate.language, {}, 'close')}</Button> : <></>}

                    {ComponentFunction.orderFormFunction !== 'edit' ?
                        <Button onClick={postpone}
                            disabled={
                                pointsNotValid || commentsNotValid || timeNotValid
                                || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (orderForWho === 'partner' && formData.for_partner.isEmpty) || (orderForWho === 'group' && formData.for_group.isEmpty)
                                || formData.type.isEmpty
                                ||
                                (formData.load_capacity.isEmpty && formData.type === 'truck') ||
                                (formData.load_capacity.isEmpty && formData.type === 'minibus') ||
                                (formData.side_type.isEmpty && formData.type === 'truck')
                                || (formData.cost.notValid && formData.order_type.value === 'order')
                            }
                        >{SetNativeTranslate(Translate.language, {}, 'postpone')}</Button>
                        : <></>}
                    {ComponentFunction.orderFormFunction !== 'pattern' && ComponentFunction.orderFormFunction !== 'edit' ?
                        <Button onClick={pattern}
                            disabled={
                                pointsNotValid || commentsNotValid || timeNotValid
                                || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (orderForWho === 'partner' && formData.for_partner.isEmpty) || (orderForWho === 'group' && formData.for_group.isEmpty)
                                || formData.type.isEmpty
                                ||
                                (formData.load_capacity.isEmpty && formData.type === 'truck') ||
                                (formData.load_capacity.isEmpty && formData.type === 'minibus') ||
                                (formData.side_type.isEmpty && formData.type === 'truck')
                                || (formData.cost.notValid && formData.order_type.value === 'order')
                            }
                        >{SetNativeTranslate(Translate.language, {}, 'create_template')}</Button>
                        : <></>}
                </Container>
            </Form>

            <MapComponent
                calculate={calculate}
                setCalculate={setCalculate}
                pointsNotValid={pointsNotValid}
                pointFormData={pointFormData}
                formData={formData}
                setFormData={setFormData}
                setPointFormData={setPointFormData}
                pointInitialValue={pointInitialValue}
            />
        </VerticalContainer>
    )
}
)


export default OrderForm
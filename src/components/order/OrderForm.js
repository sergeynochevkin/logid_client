import React, { useContext, useEffect, useState } from 'react'
import { Form } from '../ui/form/Form'
import { Button } from '../ui/button/Button'
import styled from 'styled-components'
import { AdressContext, ComponentFunctionContext, FetcherContext, LimitContext, NotificationContext, OrderContext, PartnerContext, PointContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { createOrder } from '../../http/orderApi'
import { observer } from 'mobx-react-lite'
import OrderComment from './orderForm/OrderComment'
import OrderType from './orderForm/OrderType'
import Cost from './orderForm/Cost'
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
import { uploadFiles } from '../../http/fileApi'


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
    const {Partner} = useContext( PartnerContext)
    const { fetcher } = useContext(FetcherContext)
    const [pointsNotValid, setPointsNotValid] = useState(false)
    const [timeNotValid, setTimeNotValid] = useState(false)
    const [commentsNotValid, setCommentsNotValid] = useState(false)
    const [calculate, setCalculate] = useState(false)
    const Edited = SetNativeTranslate(Translate.language, {}, 'edited').toLowerCase()
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

    const [files, setFiles] = useState(order.files)
    const [pairs, setPairs] = useState(order.pairs)
    const [images, setImages] = useState([])
    const [formFunction, setFormFunction] = useState('')

    const parent = 'orderForm'

    useEffect(() => {
        fetcher.setPartners(true)
    }, [])

    let initialTime = new Date();

    let dataTransfer = new DataTransfer();
    let fileList

    const dataInit = (files) => {
        files.forEach(file => {
            dataTransfer.items.add(file)
        })

        fileList = dataTransfer.files
    }

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
            for_partner: undefined,
            for_group: undefined,
            direction_response: JSON.stringify([]),
            for_who: undefined
        }
    }

    useEffect(() => {
        if (ComponentFunction.orderFormFunction !== 'newOrder' && order.files.length > 0) {
            setPairs(order.pairs)
            setFiles(order.files)
        }
    }, [])




    let orderPattern
    let orderPatternForWho
    let pointPatternInitialValue = []
    let pointPattern


    if (ComponentFunction.orderFormFunction !== 'newOrder') {
        orderPattern = JSON.parse(order.pattern)
        orderPattern.for_who = { value: orderPattern.for_group ? 'group' : orderPattern.for_partner ? 'partner' : 'all', notValid: false }
        orderPattern.for_group = { value: orderPattern.for_group ? orderPattern.for_group : undefined, notValid: false }
        orderPattern.for_partner = { value: orderPattern.for_partner ? orderPattern.for_partner : undefined, notValid: false }
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
        orderPattern.customer_arc_status = ''
        orderPattern.carrier_arc_status = ''
        orderPattern.order_final_status = ''
        orderPattern.updated_by_role = ''
        // thermo_bag    // hydraulic_platform    // side_loading    // glass_stand    // refrigerator_minus    // refrigerator_plus    // thermo_van     //mileage   //userId     //country     //city     // userInfoId    // option    // files        

        pointPattern = JSON.parse(Point.pattern)
        for (const point of pointPattern) {
            point.point = { value: point.point, isDirty: false, isEmptyError: false }
            point.time = { value: point.sequence === 1 ? setTime(initialTime, 60, 'form') : setTime(initialTime, 90, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' }
            point.status = 'new'
            point.customer_comment = { value: point.customer_comment, isDirty: false, minLengthError: false, maxLengthError: false, isEmptyError: true, errorMessage: '' }
            point.carrier_comment = ''
            point.updated_by = undefined
            point.orderIntegrationId = order.integrationId
            pointPatternInitialValue.push(point)
            // id    //latitude    //longitude    //name     //services 
        }
    }

    // here!
    const [formData, setFormData] = useState(
        localStorage.getItem('orderFormData') ? JSON.parse(localStorage.getItem('orderFormData')) :
            ComponentFunction.orderFormFunction === 'newOrder' ? initialValue : orderPattern
    )

    const validCost = /^\d+$/
    formData.cost = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.cost.value !== 0 ? orderPattern.cost.value : '', { isEmpty: true, minLength: 2, maxLength: 6, validFormat: validCost }, SetNativeTranslate(Translate.language, {}, 'cost').toLowerCase())
    formData.order_comment = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.order_comment.value, { isEmpty: true, minLength: 6, maxLength: 200 }, SetNativeTranslate(Translate.language, {}, 'comment').toLowerCase())
    formData.order_type = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? '' : orderPattern.order_type.value, { isEmpty: true },)

    formData.load_capacity = useInput(ComponentFunction.orderFormFunction === 'newOrder' || parent === 'fast_sign_up' ? '' : orderPattern.load_capacity.value, { isEmpty: true },)
    formData.side_type = useInput(ComponentFunction.orderFormFunction === 'newOrder' || parent === 'fast_sign_up' ? '' : orderPattern.side_type.value, { isEmpty: true },)
    formData.type = useInput(ComponentFunction.orderFormFunction === 'newOrder' || parent === 'fast_sign_up' ? '' : orderPattern.type.value, { isEmpty: true },)

    formData.for_group = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? undefined : orderPattern.for_group.value, { isEmpty: true },)
    formData.for_partner = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? undefined : orderPattern.for_partner.value, { isEmpty: true },)
    formData.for_who = useInput(ComponentFunction.orderFormFunction === 'newOrder' ? 'all' : orderPattern.for_who.value, { isEmpty: true },)

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
            time: { value: setTime(initialTime, 60, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
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
            time: { value: setTime(initialTime, 90, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
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

    const calculateTime = (results, timeGap, pointSequence, action) => {
        if (action === 'calculate' && !pointFormData.find(el => el.time.isDirty && el.sequence !== 1)) {
            let data = [...pointFormData]
            let initialTime = data.find(el => el.sequence === 1).time.value
            for (const point of data) {
                if (point.sequence !== 1) {
                    let legIndex
                    if (data.length === 2) {
                        legIndex = 0
                    } else if (point.sequence === 50) {
                        let sequenceArray = data.filter(el => el.sequence !== 50).map(el => el.sequence)
                        let maxSequence = Math.max(...sequenceArray)
                        legIndex = maxSequence - 1
                    } else {
                        legIndex = point.sequence - 1
                    }
                    point.time.value = new Date(initialTime)
                    point.time.value.setSeconds(point.time.value.getSeconds() + results.routes[0].legs[legIndex].duration.value)
                    initialTime = new Date(initialTime)
                    initialTime.setSeconds(point.time.value.getSeconds() + results.routes[0].legs[legIndex].duration.value)
                    point.time.value = setTime(new Date(point.time.value), 0, 'form')
                }
                point.point.isDirty = false
            }
            setPointFormData(data)
        }
        if (action === 'increase' || action === 'decrease') {
            let data = [...pointFormData]
            let pointForEdit = data.find(el => el.sequence === pointSequence)
            let cleanData = data.filter(el => el.sequence !== pointSequence)
            //recalculate next not need now
            // for (const point of cleanData) {
            //     if (point.sequence > pointForEdit.sequence) {
            //         //check if not enought for leg, error if earlier than now + 30 mins!
            //         let time = new Date(point.time.value)
            //         time.setSeconds(action === 'increase' ? (time.getSeconds() + timeGap) : (time.getSeconds() - timeGap))
            //         point.time.value = setTime(new Date(time), 0, 'form')
            //         setPointFormData([...cleanData, pointForEdit])
            //     }
            // }
            let time = new Date(pointForEdit.time.value)
            time.setSeconds(action === 'increase' ? (time.getSeconds() + timeGap) : (time.getSeconds() - timeGap))
            pointForEdit.time.value = setTime(new Date(time), 0, 'form')
            pointForEdit.time.isDirty = true
            setPointFormData([...cleanData, pointForEdit])
        }

        if (action === 'now') {
            let data = [...pointFormData]
            let cleanData = data.filter(el => el.sequence !== 1)
            let pointForEdit = data.find(el => el.sequence === 1)
            pointForEdit.time.isDirty = false
            // now + 15 not need now
            // let initialTime = new Date();
            // pointForEdit.time.value = setTime(initialTime, 15, 'form')
            if (!pointFormData.find(el => el.point.isEmptyError)) {
                for (const point of cleanData) {
                    point.time.isDirty = false
                }
                setPointFormData([...cleanData, pointForEdit])
                setCalculate(true)
            } else {
                cleanData = [...cleanData.sort(sortPoints)]
                let initialTime = new Date(pointForEdit.time.value)
                for (const point of cleanData) {
                    let time = initialTime.setSeconds(initialTime.getSeconds() + 1800)
                    point.time.value = setTime(new Date(time), 0, 'form')
                    point.time.isDirty = false
                    initialTime = new Date(point.time.value)
                }
                setPointFormData([...cleanData, pointForEdit])
            }
        }
        if (action === 'add') {

        }
    }

    const boost = (id) => {
        order.setDividedOrders([...order.divided_orders[formData.order_status].filter(el => el.id !== id)], formData.order_status)
        order.setTotalCount(order.totalCount[formData.order_status] - 1, formData.order_status)
        order.setFilteredCount(order.filtered_count[formData.order_status] - 1, formData.order_status)
    }

    const afterAction = (option) => {
        if (option === 'edit') {
            boost(formData.id)
            // order.setOrder(formData)
            ComponentFunction.setOrderFormFunction('newOrder')
            ComponentFunction.setOrdersComponentFunction('orderList')
            ComponentFunction.setPageFunction('orderList')
        } else {
            ComponentFunction.setFunction(formData.order_status)
            ComponentFunction.setOrdersComponentFunction('orderList')
            ComponentFunction.setPageFunction('orderList')
        }
        fetcher.setCustomLoading(false)
        setFormData(initialValue)
        setPointFormData(pointInitialValue)
        order.setPairs([])
        order.setFiles([])
    }

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
        try {
            let orderId
            fetcher.setCustomLoading(true)
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
                formData.for_partner.value ? formData.for_partner.value : undefined,
                formData.for_group.value ? formData.for_group.value : undefined,
                formData.oldPointsId,
                formData.direction_response,
                pointFormData
            ).then(async data => {
                dataInit(files)
                await uploadFiles('order', formData.id, Translate.language, JSON.parse(orderPattern.files).length > 0 ? 'update' : 'create', fileList)
            }
            )
            // await createPoint(pointFormData)
            fetcher.setNewStatus('postponed')
            fetcher.setDividedOrders(true)
            Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${formData.id} ${Edited}` : `${Auction} ${formData.id} ${Edited}` }])
            afterAction('edit')
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
            fetcher.setCustomLoading(false)
        }
    }

    const click = async (event) => {
        try {
            let data;
            let orderId
            order.setOrders([])
            if (formData.cost.isEmpty) {
                formData.cost.value = 0
            }
            fetcher.setCustomLoading(true)
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
                formData.for_partner.value ? formData.for_partner.value : undefined,
                formData.for_group.value ? formData.for_group.value : undefined,
                formData.direction_response,
                pointFormData
            )
                .then(data => { orderId = data.id }).then(async data => {
                    dataInit(files)
                    await uploadFiles('order', orderId, Translate.language, 'create', fileList)
                }
                )

            // await createPoint(pointFormData)
            fetcher.setStatus(formData.order_status)
            fetcher.setCreate(true)
            if (formData.order_status === 'new') {
                Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${orderId} ${created_and_send}` : `${Auction} ${orderId} ${created_and_send}` }]);
                sendMail(Translate.language, user.user.role, orderId, 'new_order', '');
            }
            if (formData.order_status === 'postponed') {
                //fetch
                Notification.addNotification([{ id: v4(), type: 'success', message: formData.order_type.value === 'order' ? `${Order} ${orderId} ${created_and_postponed}` : `${Auction} ${orderId} ${created_and_postponed}` }]);

            }
            if (formData.order_status === 'pattern') {
                //fetch
                Notification.addNotification([{ id: v4(), type: 'success', message: `${Template} ${orderId} ${Created}` }]);
            }
            afterAction('')
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
        if (!e.target.classList.contains("custom_input")) {
            e.target.style.background = 'grey'
        }
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

    const addField = (pointItem) => {
        let newSequence = pointItem.sequence !== 50 ? pointItem.sequence + 1 : 50
        let initialTime
        if (pointFormData.length >= Limit.user_limits.customer_new_order_point_limit) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${point_limit} ${Limit.user_limits.customer_new_order_point_limit}. ${you_can_change_subscription}` }])
        } else {
            let idArray = pointFormData.map(el => el.id)
            let maxId = Math.max(...idArray)
            let sequenceArray = pointFormData.filter(el => el.sequence !== 50).map(el => el.sequence)
            let maxSequence = Math.max(...sequenceArray)
            let data = [...pointFormData]
            if (pointItem.sequence !== 50) {
                initialTime = new Date(pointItem.time.value)
                for (const point of data) {
                    if (point.sequence > pointItem.sequence && point.sequence < 49) {
                        point.sequence = point.sequence + 1
                    }
                }
                setPointFormData(data)
            } else {
                let pointForEdit = data.find(el => el.sequence === 50)
                pointForEdit.sequence = maxSequence + 1
                initialTime = new Date(pointForEdit.time.value)
                let cleanData = data.filter(el => el.sequence !== pointItem.sequence)
                setPointFormData([...cleanData, pointForEdit])
            }
            let newField = {
                id: maxId + 1,
                point: { value: '', isDirty: false, isEmptyError: true, errorMessage: '' },
                latitude: undefined,
                longitude: undefined,
                time: { value: setTime(initialTime, 0, 'form'), isDirty: false, isEmptyError: false, errorMessage: '' },
                status: 'new',
                sequence: newSequence,
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

    const removeField = (pointItem) => {
        if (pointItem.sequence !== 50) {
            let data = [...pointFormData.filter(el => el.sequence !== pointItem.sequence)]
            for (const point of data) {
                if (point.sequence > pointItem.sequence && point.sequence !== 50) {
                    point.sequence = point.sequence - 1
                }
            }
            setPointFormData(data)
        } else {
            let sequenceArray = pointFormData.filter(el => el.sequence !== 50).map(el => el.sequence)
            let maxSequence = Math.max(...sequenceArray)
            let pointForEdit = pointFormData.find(el => el.sequence === maxSequence)
            pointForEdit.sequence = 50
            let data = [...pointFormData.filter(el => el.sequence !== pointItem.sequence)]
            setPointFormData([...data, pointForEdit])
        }
        setCalculate(true)
    }

    function move_up(pointItem) {
        let data = [...pointFormData]
        let pointForUp
        let pointForDown
        if (pointItem.sequence !== 50) {
            pointForUp = { ...pointItem }
            pointForDown = pointFormData.find(el => el.sequence === pointItem.sequence - 1)
            pointForUp.sequence = pointForUp.sequence - 1
            pointForDown.sequence = pointForDown.sequence + 1
        } else {
            let sequenceArray = pointFormData.filter(el => el.sequence !== 50).map(el => el.sequence)
            let maxSequence = Math.max(...sequenceArray)
            pointForUp = { ...pointItem }
            pointForDown = pointFormData.find(el => el.sequence === maxSequence)
            pointForUp.sequence = maxSequence
            pointForDown.sequence = 50
        }
        let cleanData = data.filter(el => el.id !== pointForUp.id && el.id !== pointForDown.id)
        setPointFormData([...cleanData, pointForUp, pointForDown])
        setCalculate(true)
    }

    function move_down(pointItem) {
        let sequenceArray = pointFormData.filter(el => el.sequence !== 50).map(el => el.sequence)
        let maxSequence = Math.max(...sequenceArray)
        let data = [...pointFormData]
        let pointForUp
        let pointForDown
        if (pointItem.sequence !== maxSequence) {
            pointForUp = pointFormData.find(el => el.sequence === pointItem.sequence + 1)
            pointForDown = { ...pointItem }
            pointForUp.sequence = pointForUp.sequence - 1
            pointForDown.sequence = pointForDown.sequence + 1
        } else {
            pointForUp = pointFormData.find(el => el.sequence === 50)
            pointForDown = { ...pointItem }
            pointForUp.sequence = maxSequence
            pointForDown.sequence = 50
        }
        let cleanData = data.filter(el => el.id !== pointForUp.id && el.id !== pointForDown.id)
        setPointFormData([...cleanData, pointForUp, pointForDown])
        setCalculate(true)
    }

    useEffect(() => {
        localStorage.setItem('orderFormData', JSON.stringify(formData))
    }, [formData.order_comment, formData.cost, formData.for_partner, formData.for_group, formData.order_type])


    useEffect(() => {
        localStorage.setItem('pointFormData', JSON.stringify(pointFormData))
    }, [pointFormData])





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
                            formData={formData}
                            calculateTime={calculateTime}
                            addField={addField}
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


                {Partner.partners.length > 0 &&
                    <OrderForWho
                        formData={formData}
                        setFormData={setFormData}
                    />}


                <DragDropUpload formData={formData} setFormData={setFormData} length={5} extensions={['jpeg', 'png', 'jpg']} files={files} pairs={pairs} setFiles={setFiles} setPairs={setPairs} min_length={0} parent={'orderForm'}></DragDropUpload>


                <Container>
                    <Button onClick={send}
                        disabled={
                            pointsNotValid || commentsNotValid || timeNotValid
                            || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (formData.for_who.value === 'partner' && formData.for_partner.isEmpty) || (formData.for_who.value === 'group' && formData.for_group.isEmpty)
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
                                ComponentFunction.setPageFunction('orderList')
                                ComponentFunction.setOrderFormFunction('newOrder')
                                Notification.addNotification([{ id: v4(), type: 'error', message: formData.order_type.value === 'order' ? order_editing_canceled : auction_editing_canceled }]);
                            }}
                        >{SetNativeTranslate(Translate.language, {}, 'close')}</Button> : <></>}

                    {ComponentFunction.orderFormFunction !== 'edit' ?
                        <Button onClick={postpone}
                            disabled={
                                pointsNotValid || commentsNotValid || timeNotValid
                                || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (formData.for_who.value === 'partner' && formData.for_partner.isEmpty) || (formData.for_who.value === 'group' && formData.for_group.isEmpty)
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
                                || formData.order_type.isEmpty || (formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_comment.notValid && !formData.order_comment.isEmpty) || (formData.for_who.value === 'partner' && formData.for_partner.isEmpty) || (formData.for_who.value === 'group' && formData.for_group.isEmpty)
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
                calculateTime={calculateTime}
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
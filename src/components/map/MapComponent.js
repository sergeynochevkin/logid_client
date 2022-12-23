import React, { useContext, useEffect, useState } from 'react'
import './Map.css'
import { AdressContext, ComponentFunctionContext, LimitContext, OrderContext, PointContext, SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { observer } from 'mobx-react-lite'
import CitySelector from './CitySelector'
import { setTime } from '../../modules/setTime'
import { setDistance } from '../../modules/setDistance'
import { setDuration } from '../../modules/setDuration'
;
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const MapComponent = observer(({ pointsNotValid, pointFormData, formData, setFormData, setCalculate, setPointFormData, pointInitialValue, calculate, setFetchStart }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { Limit } = useContext(LimitContext)
    const { Setting } = useContext(SettingContext)
    const { user } = useContext(UserContext)
    const { State } = useContext(StateContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { order } = useContext(OrderContext)
    const [gMap, setGMap] = useState(undefined)
    const [gMarkers, setGMarkers] = useState([])
    const [showMarkers, setShowMarkers] = useState(false)
    const { Point } = useContext(PointContext)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setRouteDistance] = useState('')
    const [duration, setRouteDuration] = useState('')
    const [renderer, setRenderer] = useState({})
    const [service, setService] = useState({})
    const [refreshMap, setRefreshMap] = useState(false)
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)

    function refreshMapAction() {
        if (gMap) {
            gMap.fitBounds(Setting.bounds)
            gMap.panToBounds(Setting.bounds)
        }
        setRefreshMap(false)
    }
    function calcAllCities() {
        //eslint-disable-next-line no-undef        
        Setting.setBounds(new google.maps.LatLngBounds())
        let city = { lat: UserInfo.userInfo.city_latitude, lng: UserInfo.userInfo.city_longitude, name: '' }
        let cities = [...State.user_state.user_map_cities, city]
        for (const cityItem of cities) {
            //eslint-disable-next-line no-undef 
            let point = new google.maps.LatLng(cityItem.lat, cityItem.lng);
            Setting.bounds.extend(point)
        }
        Setting.setAllCities(true)
    }
    function calcСityOrderBounds() {
        //eslint-disable-next-line no-undef        
        Setting.setBounds(new google.maps.LatLngBounds())
        let thisCityOrders = []
        for (const orderItem of order.map_orders) {
            if ((orderItem.start_lat < parseFloat(State.user_state.user_map_city.lat) + 0.6 && orderItem.start_lat > parseFloat(State.user_state.user_map_city.lat) - 0.6) && (orderItem.start_lng < parseFloat(State.user_state.user_map_city.lng) + 0.6 && orderItem.start_lng > parseFloat(State.user_state.user_map_city.lng) - 0.6)) {
                thisCityOrders.push(orderItem)
            }
        }
        if (thisCityOrders.length === 0) {
            Setting.setCenter({ lat: Setting.user_map_city.lat, lng: Setting.user_map_city.lng })
            Setting.setBoundsLimit(0.1)
            calcBounds()
        }
        else {
            for (const orderItem of thisCityOrders) {
                //eslint-disable-next-line no-undef
                let point = new google.maps.LatLng(orderItem.start_lat, orderItem.start_lng);
                Setting.bounds.extend(point)
            }
        }
    }
    function calcBounds() {
        //eslint-disable-next-line no-undef        
        Setting.setBounds(new google.maps.LatLngBounds())
        //eslint-disable-next-line no-undef
        let north = new google.maps.LatLng(Setting.center.lat + Setting.bounds_limit, Setting.center.lng);
        //eslint-disable-next-line no-undef
        let south = new google.maps.LatLng(Setting.center.lat - Setting.bounds_limit, Setting.center.lng);
        //eslint-disable-next-line no-undef
        let east = new google.maps.LatLng(Setting.center.lat, Setting.center.lng + Setting.bounds_limit);
        //eslint-disable-next-line no-undef
        let west = new google.maps.LatLng(Setting.center.lat, Setting.center.lng - Setting.bounds_limit);
        Setting.bounds.extend(north)
        Setting.bounds.extend(south)
        Setting.bounds.extend(east)
        Setting.bounds.extend(west)
    }


    const mapScaleSteps = [10, 50, 100, 500, 1000, 2000, 3000]
    const mapOptions = {
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    }

    function initMap(id, response) {
        //eslint-disable-next-line no-undef
        let map = new google.maps.Map(document.getElementById(id), {
            zoom: Setting.zoom,
            center: Setting.center,
            options: mapOptions,
            // не ставить границы?
            // restriction: {
            //     latLngBounds: Setting.bounds,
            //     strictBounds: false
            // },
            //eslint-disable-next-line no-undef
            mapTypeId: google.maps.MapTypeId.ROADMAP
        })
        setGMap(map)
        if (ComponentFunction.OrdersComponentFunction === 'orderItem' && response) {
            //eslint-disable-next-line no-undef
            new google.maps.DirectionsRenderer(
                {
                    suppressMarkers: false,
                    directions: response,
                    map: map,
                    // draggable:true,
                    // preserveViewport:false,
                }
            )
        }
    }
    //effects
    useEffect(() => {
        //eslint-disable-next-line no-undef
        setService(new google.maps.DirectionsService())
        //eslint-disable-next-line no-undef
        setRenderer(new google.maps.DirectionsRenderer())

        if (user.user.role === 'customer' && ComponentFunction.OrdersComponentFunction === 'orderItem') {
            let lat
            let lng
            if (parseFloat(order.order.start_lat) > parseFloat(order.order.end_lat)) {
                lat = (parseFloat(order.order.start_lat) - parseFloat(order.order.end_lat)) / 2 + parseFloat(order.order.end_lat)
            } else {
                lat = (parseFloat(order.order.end_lat) - parseFloat(order.order.start_lat)) / 2 + parseFloat(order.order.start_lat)
            }
            if (parseFloat(order.order.start_lng) > parseFloat(order.order.end_lng)) {
                lng = (parseFloat(order.order.start_lng) - parseFloat(order.order.end_lng)) / 2 + parseFloat(order.order.end_lng)
            } else {
                lng = (parseFloat(order.order.end_lng) - parseFloat(order.order.start_lng)) / 2 + parseFloat(order.order.start_lng)
            }
            Setting.setCenter({ lat: lat, lng: lng })
            calcBounds()
        }
        if (user.user.role === 'customer' && ComponentFunction.PageFunction === 'orderForm') {
            Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
            State.user_state.user_map_scale ? Setting.setUserMapScale(State.user_state.user_map_scale) : Setting.setUserMapScale(50)
            State.user_state.user_map_scale ? Setting.setBoundsLimit(State.user_state.user_map_scale / 100) : Setting.setBoundsLimit(0.5)
            Setting.setZoom(5)
        }
        if (user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction === 'orderList' && ComponentFunction.Function === 'new') {
            Setting.setBoundsLimit(50)
            State.user_state.user_map_city ? Setting.setCenter({ lat: parseFloat(State.user_state.user_map_city.lat), lng: parseFloat(State.user_state.user_map_city.lng) }) : Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
            Setting.setZoom(5)
        }
    }, [])

    useEffect(() => {
        if (ComponentFunction.OrdersComponentFunction === 'orderItem') {
            initMap('map', JSON.parse(order.order.direction_response))
        } else {
            initMap('map')
        }
    }, [])

    useEffect(() => {
        if (gMap && ComponentFunction.OrdersComponentFunction !== 'orderItem' && ComponentFunction.PageFunction === 'orderForm') {
            calcBounds()
            setRefreshMap(true)
        }
        if (gMap && ComponentFunction.OrdersComponentFunction !== 'orderItem' && ComponentFunction.PageFunction !== 'orderForm') {
            if (State.user_state.all_cities === true) {
                calcAllCities()
            }
            else if (order.map_orders && State.user_state.all_cities === false && order.map_orders.length > 0) {
                calcСityOrderBounds()
            } else {
                State.user_state.user_map_city ? Setting.setCenter({ lat: parseFloat(State.user_state.user_map_city.lat), lng: parseFloat(State.user_state.user_map_city.lng) }) : Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
                Setting.setBoundsLimit(0.1)
                calcBounds()
            }
            setRefreshMap(true)
        }
    }, [gMap])

    useEffect(() => {
        if (ComponentFunction.PageFunction === 'orderForm' && user.user.role === 'customer') {
            calculateRoute()
        }
    }, [calculate])

    useEffect(() => {
        if (ComponentFunction.PageFunction === 'orderForm' && user.user.role === 'customer') {
            refreshMapAction()
        }
    }, [refreshMap])

    useEffect(() => {
        if ((ComponentFunction.OrdersComponentFunction === 'orderList' && user.user.role === 'carrier')) {
            refreshMapAction()
        }
    }, [refreshMap])

    useEffect(() => {
        if (ComponentFunction.PageFunction === 'orderForm' && user.user.role === 'customer') {
            if (directionsResponse) {
                directionRender(directionsResponse)
            }
        }
    }, [directionsResponse])

    useEffect(() => {
        setShowMarkers(true)
    }, [])

    useEffect(() => {
        setShowMarkers(true)
    }, [order.map_orders, State.user_state.favorite_order_state])


    const Order = SetNativeTranslate(Translate.language,{},'order')
    const Auction = SetNativeTranslate(Translate.language,{},'')
    const cost = SetNativeTranslate(Translate.language,{},'cost')
    const arrival_time_field_name = SetNativeTranslate(Translate.language,{},'arrival_time_field_name')
    const start = SetNativeTranslate(Translate.language,{},'start')
    const finish = SetNativeTranslate(Translate.language,{},'finish')
    const Distance = SetNativeTranslate(Translate.language,{},'distance')
    const go_to_order = SetNativeTranslate(Translate.language,{},'go_to_order')
    const go_to_auction = SetNativeTranslate(Translate.language,{},'go_to_auction')
    const points_in_the_order = SetNativeTranslate(Translate.language,{},'points_in_the_order')


    useEffect(() => {
        if (user.user.role === 'carrier' && ComponentFunction.OrdersComponentFunction === 'orderList' && ComponentFunction.Function === 'new' && gMap) {
            if (order.map_orders && order.map_orders.length > 0 && gMarkers.length === 0) {
                for (const orderItem of order.map_orders) {
                    let points = Point.points.filter(el => el.orderIntegrationId === orderItem.pointsIntegrationId)
                    let firstPoint = points.find(el => el.sequence === 1)
                    let lastPoint = points.find(el => el.sequence === 50)
                    let markerContent = `
                    <div style="font-size:10px">${orderItem.order_type === 'order' ? Order : Auction} ${orderItem.id}</div>
                    <div style="font-size:10px">${cost} ${orderItem.cost === 0 ? 'не указана' : orderItem.cost}</div>
                    <div style="font-size:10px">${arrival_time_field_name}</div>
                    <div style="font-size:10px">${setTime(new Date(firstPoint && firstPoint.time), 0, 'show')}</div>
                    <div style="font-size:10px">${start}</div>
                    <div style="font-size:10px">${firstPoint && firstPoint.point}</div>
                    <div style="font-size:10px">${finish}</div>
                    <div style="font-size:10px">${lastPoint && lastPoint.point}</div>
                    <div style="font-size:10px">${points_in_the_order} ${points.length}</div>
                    <div style="font-size:10px">${Distance} ${setDistance(orderItem.mileage)}</div>
                    <div id='${orderItem.id}'
                    style="font-size:10px; font-weight:bold; cursor:pointer"
                    >${orderItem.order_type === 'order' ? go_to_order : go_to_auction}</div>                   
                    `
                    let labelIcon =
                        State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) ? "\ue838" :
                            orderItem.type === 'walk' ? "\ue536" :
                                orderItem.type === 'bike' ? "\ueb29" :
                                    orderItem.type === 'electric_scooter' ? '\ueb1f' :
                                        orderItem.type === 'scooter' ? "\ueb1d" :
                                            orderItem.type === 'car' ? "\ue531" :
                                                orderItem.type === 'combi' ? "\ueb3c" :
                                                    orderItem.type === 'minibus' ? "\ueb3c" :
                                                        orderItem.type === 'truck' ? '\ue558' : ''

                    //eslint-disable-next-line no-undef
                    let marker = new google.maps.Marker({
                        position: { lat: parseFloat(orderItem.start_lat), lng: parseFloat(orderItem.start_lng) },
                        gMap,
                        title: `${orderItem.id}`,
                        label: {
                            text: labelIcon,
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }
                    })
                    gMarkers.push(marker)
                    addInfoWindow(marker, markerContent, orderItem.id)
                }
                for (const marker of gMarkers) {
                    marker.setMap(gMap)
                }
            }
            else if (order.map_orders && order.map_orders.length > 0 && gMarkers.length > 0 && gMap) {
                let labelIcon = "\ue838"
                for (let i = 0; i < gMarkers.length; i++) {
                    let orderItem = order.map_orders.find(el => el.id === Number(gMarkers[i].getTitle()))
                    if (!orderItem) {
                        gMarkers[i].setMap(null);
                        gMarkers.splice(i, 1)
                    } else if ((State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) && gMarkers[i].getLabel().text !== labelIcon) || (State.user_state.favorite_order_state && !State.user_state.favorite_order_state.includes(orderItem.id) && gMarkers[i].getLabel().text === labelIcon)) {
                        gMarkers[i].setMap(null);
                        gMarkers.splice(i, 1)
                    }
                }
                let isOrders = []
                for (const orderItem of order.map_orders) {
                    for (const marker of gMarkers) {
                        if (orderItem.id === Number(marker.getTitle())) {
                            isOrders.push(orderItem)
                        }
                    }
                }

                isOrders = isOrders.map(el => el.id)
                let newOrders = order.map_orders.filter(el => !isOrders.includes(el.id))

                let newMarkers = []
                for (const orderItem of newOrders) {

                    let points = Point.points.filter(el => el.orderIntegrationId === orderItem.pointsIntegrationId)
                    let firstPoint = points.find(el => el.sequence === 1)
                    let lastPoint = points.find(el => el.sequence === 50)

                    let markerContent = `
                    <div style="font-size:10px">${orderItem.order_type === 'order' ? Order : Auction} ${orderItem.id}</div>
                    <div style="font-size:10px">${cost} ${orderItem.cost === 0 ? 'не указана' : orderItem.cost}</div>
                    <div style="font-size:10px">${arrival_time_field_name}</div>
                    <div style="font-size:10px">${setTime(new Date(firstPoint && firstPoint.time), 0, 'show')}</div>
                    <div style="font-size:10px">${start}</div>
                    <div style="font-size:10px">${firstPoint && firstPoint.point}</div>
                    <div style="font-size:10px">${finish}</div>
                    <div style="font-size:10px">${lastPoint && lastPoint.point}</div>
                    <div style="font-size:10px">${points_in_the_order} ${points.length}</div>
                    <div style="font-size:10px">${Distance} ${setDistance(orderItem.mileage)}</div>
                    <div id='${orderItem.id}'
                    style="font-size:10px; font-weight:bold; cursor:pointer"
                    >${orderItem.order_type === 'order' ? go_to_order : go_to_auction}</div>                   
                    `
                    let labelIcon =
                        State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) ? "\ue838" :
                            orderItem.type === 'walk' ? "\ue536" :
                                orderItem.type === 'bike' ? "\ueb29" :
                                    orderItem.type === 'electric_scooter' ? '\ueb1f' :
                                        orderItem.type === 'scooter' ? "\ueb1d" :
                                            orderItem.type === 'car' ? "\ue531" :
                                                orderItem.type === 'combi' ? "\ueb3c" :
                                                    orderItem.type === 'minibus' ? "\ueb3c" :
                                                        orderItem.type === 'truck' ? '\ue558' : ''

                    //eslint-disable-next-line no-undef
                    let marker = new google.maps.Marker({
                        position: { lat: parseFloat(orderItem.start_lat), lng: parseFloat(orderItem.start_lng) },
                        title: `${orderItem.id}`,
                        label: {
                            text: labelIcon,
                            fontFamily: "Material Icons",
                            color: "#ffffff",
                            fontSize: "16px",
                        }
                    })
                    gMarkers.push(marker)
                    newMarkers.push(marker)
                    addInfoWindow(marker, markerContent)
                }
                for (const marker of newMarkers) {
                    marker.setMap(gMap)
                }
            }
            else {
                if (gMarkers.length > 0) {
                    for (const marker of gMarkers) {
                        marker.setMap(null)
                    }
                }
                setGMarkers([])
            }
        }
        setShowMarkers(false)
    }, [showMarkers])


    //functions

    async function directionRender(response) {
        await renderer.setOptions(
            {
                suppressMarkers: false,
                directions: response,
                map: gMap,
                // draggable:true,
                // preserveViewport:false,
            }
        )
        await renderer.setDirections(response)
    }
    async function calculateRoute() {
        if (!pointFormData.find(el => !el.latitude) && !pointFormData.find(el => !el.longitude)) {
            //eslint-disable-next-line no-undef
            let firstPoint = pointFormData.find(el => el.sequence === 1).point.value
            let lastPoint = pointFormData.find(el => el.sequence === 50).point.value
            let wayPointsArray = []
            let pointsArray = [...pointFormData.filter(el => el.sequence !== 1 && el.sequence !== 50).map(el => el.point.value)]
            for (const point of pointsArray) {
                let newPoint = {
                    location: point,
                    stopover: true
                }
                wayPointsArray.push(newPoint)
            }
            const results = await service.route({
                origin: firstPoint,
                waypoints: wayPointsArray,
                destination: lastPoint,
                optimizeWaypoints: true,
                //eslint-disable-next-line no-undef
                travelMode: formData.type.value === 'walk' ? google.maps.TravelMode.WALKING : google.maps.TravelMode.DRIVING
            })

            let calculatedDistance = 0
            let calculatedDuration = 0
            for (const leg of results.routes[0].legs) {
                calculatedDistance = calculatedDistance + leg.distance.value
                calculatedDuration = calculatedDuration + leg.duration.value
            }
            setRouteDistance(calculatedDistance)
            setRouteDuration(calculatedDuration)
            formData.mileage = calculatedDistance
            setFormData({ ...formData, direction_response: JSON.stringify(results) })
            let data = [...pointFormData]
            data[pointFormData.length - 1].time.value = new Date(data[0].time.value)
            data[pointFormData.length - 1].time.value.setSeconds(data[pointFormData.length - 1].time.value.getSeconds() + calculatedDuration * 1, 2)
            data[pointFormData.length - 1].time.value = setTime(data[pointFormData.length - 1].time.value, 0, 'form')
            setPointFormData(data)
            setDirectionsResponse(results)
        }
        setCalculate(false)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setRouteDistance('')
        setRouteDuration('')
        //does not clear form fields but removes added fields
        setPointFormData(ComponentFunction.orderFormFunction === 'newOrder' ? pointInitialValue : JSON.parse(Point.pattern))
        initMap('map')
    }
    function toOrder(id) {
        let thisOrder = order.map_orders.find(el => el.id === id)
        order.setOrder(thisOrder)
        Point.setThisOrderPoints(Point.points.filter(el => el.orderIntegrationId === thisOrder.pointsIntegrationId))
        ComponentFunction.setOrdersComponentFunction('orderItem')
    }
    function addInfoWindow(marker, message) {
        //eslint-disable-next-line no-undef
        var infoWindow = new google.maps.InfoWindow({
            content: message,
            maxWidth: 150
        });
        //eslint-disable-next-line no-undef
        google.maps.event.addListener(infoWindow, 'domready', function () {
            let clickDiv = document.getElementById(marker.getTitle())
            clickDiv.addEventListener('click', () => {
                toOrder(Number(marker.getTitle()))
            })
        });
        //eslint-disable-next-line no-undef
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(gMap, marker);
        });
    }

    return (
        <div className='map_container'>
            <div id='map' className='map'>
            </div>
            {ComponentFunction.PageFunction === 'orderForm' &&
                <div className={'map_info_container'}>
                    <div className={'button_container'}>
                        <button
                            className={Setting.app_theme === 'light' ? 'map_button' : 'map_button_dark'}
                            onClick={calculateRoute}
                            disabled={pointsNotValid}
                        >{SetNativeTranslate(Translate.language,{},'calculate_route')}</button>
                        <button
                            className={Setting.app_theme === 'light' ? 'map_button' : 'map_button_dark'}
                            onClick={clearRoute}
                            disabled={!directionsResponse}
                        >{SetNativeTranslate(Translate.language,{},'clear_route')}</button>
                    </div>

                    {distance &&
                        <div className={Setting.app_theme === 'light' ? 'calculated_data_container' : 'calculated_data_container calculated_data_container_dark'}>
                            <div className='calculated_data'>{`${SetNativeTranslate(Translate.language,{},'distance')} ${setDistance(distance)} ${SetNativeTranslate(Translate.language,{},Adress.country.distance)}`}
                            </div>
                            <div className='calculated_data'>{`${SetNativeTranslate(Translate.language,{},'duration')}
                             ${setDuration(duration)}
                            `}</div>
                        </div>
                    }

                    {Limit.user_limits.customer_new_order_range > 1000 &&
                        <div className={'scale_container'}>
                            {mapScaleSteps.map(step =>
                                <div className='button_row' key={step}>
                                    <button
                                        className={Setting.user_map_scale === step ? 'map_scale_button active' : Setting.app_theme === 'light' ? 'map_scale_button' : 'map_scale_button map_scale_button_dark'}
                                        onClick={() => {
                                            Setting.setUserMapScale(step)
                                            Setting.setBoundsLimit(step / 100)
                                            State.setUserStateField(Setting.user_map_scale, 'user_map_scale', UserInfo.userInfo.id)
                                            calcBounds()
                                            setRefreshMap(true)
                                        }}
                                    >{`${step} ${SetNativeTranslate(Translate.language,{},Adress.country.distance)}`}</button>
                                </div>
                            )}
                        </div>
                    }

                </div>
            }
            {(ComponentFunction.PageFunction === 'orderList' && ComponentFunction.OrdersComponentFunction !== 'orderItem' && user.user.role === 'carrier' && Limit.user_limits.carrier_take_order_city_limit !== 0) &&
                <div className={'map_info_container'}>
                    <CitySelector setFetchStart={setFetchStart} calcAllCities={calcAllCities} calcСityOrderBounds={calcСityOrderBounds} setRefreshMap={setRefreshMap} />
                </div>
            }
        </div>
    )
})

export default MapComponent


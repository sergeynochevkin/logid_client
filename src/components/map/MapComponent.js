import React, { useContext, useEffect, useState } from 'react'
import './Map.css'
import { AdressContext, ComponentFunctionContext, DriverContext, FetcherContext, LimitContext, OrderContext, PartnerContext, PointContext, SettingContext, StateContext, TranslateContext, TransportContext, UserContext, UserInfoContext } from '../..'
import { observer } from 'mobx-react-lite'
import CitySelector from './CitySelector'
import { setTime } from '../../modules/setTime'
import { setDistance } from '../../modules/setDistance'
import { setDuration } from '../../modules/setDuration'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import nav from '../../assets/icons/nav.webp';
import nav_dark from '../../assets/icons/nav_dark.webp';
import walk from '../../assets/icons/walk.webp';
import walk_dark from '../../assets/icons/walk_dark.webp';
import bike from '../../assets/icons/bike.webp';
import bike_dark from '../../assets/icons/bike_dark.webp';
import el_scooter from '../../assets/icons/el_scooter.webp';
import el_scooter_dark from '../../assets/icons/el_scooter_dark.webp';
import truck from '../../assets/icons/truck.webp';
import truck_dark from '../../assets/icons/truck_dark.webp';
import scooter from '../../assets/icons/scooter.webp';
import scooter_dark from '../../assets/icons/scooter_dark.webp';
import car from '../../assets/icons/car.webp';
import car_dark from '../../assets/icons/car_dark.webp';
import minibus from '../../assets/icons/minibus.webp';
import minibus_dark from '../../assets/icons/minibus_dark.webp';
import star from '../../assets/icons/star.webp';
import star_dark from '../../assets/icons/star_dark.webp';

const MapComponent = observer(({ pointFormData, formData, setFormData, setCalculate, setPointFormData, pointInitialValue, calculate, calculateTime, thisOrder }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { Transport } = useContext(TransportContext)
    const { Limit } = useContext(LimitContext)
    const { Setting } = useContext(SettingContext)
    const { user } = useContext(UserContext)
    const { State } = useContext(StateContext)
    const { Driver } = useContext(DriverContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const { order } = useContext(OrderContext)
    const [gMap, setGMap] = useState(undefined)
    const [gMarkers, setGMarkers] = useState([])
    const [driverMarkers, setDriverMarkers] = useState([])
    const [locationMarker, setLocationMarker] = useState('')
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
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        })
        setMapTheme(map)
        setGMap(map)
        if ((ComponentFunction.OrdersComponentFunction === 'orderItem') && response) {
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
    }, [])

    useEffect(() => {
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
        if ((user.user.role === 'carrier' || user.user.role === 'driver') && ComponentFunction.OrdersComponentFunction === 'orderList' && ComponentFunction.Function === 'new') {
            Setting.setBoundsLimit(50)
            State.user_state.user_map_city ? Setting.setCenter({ lat: parseFloat(State.user_state.user_map_city.lat), lng: parseFloat(State.user_state.user_map_city.lng) }) : Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
            Setting.setZoom(5)
        }
    }, [])

    useEffect(() => {
        if (ComponentFunction.OrdersComponentFunction === 'orderItem' && ComponentFunction.PageFunction !== 'orderForm') {
            initMap('map', JSON.parse(order.order.direction_response))
        } else {
            initMap('map')
        }
    }, [])

    let setMapTheme = (map) => {
        if (map) {
            if (Setting.app_theme === 'light') {
                map.setOptions({ styles: [] })
            } else {
                map.setOptions({
                    styles: [
                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                        {
                            featureType: "administrative.locality",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "geometry",
                            stylers: [{ color: "#263c3f" }],
                        },
                        {
                            featureType: "poi.park",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#6b9a76" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry",
                            stylers: [{ color: "#38414e" }],
                        },
                        {
                            featureType: "road",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#212a37" }],
                        },
                        {
                            featureType: "road",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#9ca5b3" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry",
                            stylers: [{ color: "#746855" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "geometry.stroke",
                            stylers: [{ color: "#1f2835" }],
                        },
                        {
                            featureType: "road.highway",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#f3d19c" }],
                        },
                        {
                            featureType: "transit",
                            elementType: "geometry",
                            stylers: [{ color: "#2f3948" }],
                        },
                        {
                            featureType: "transit.station",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#d59563" }],
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#17263c" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#515c6d" }],
                        },
                        {
                            featureType: "water",
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#17263c" }],
                        }]
                })
            }
        }
    }

    useEffect(() => {
        setMapTheme(gMap)
    }, [Setting.app_theme])

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
        if (ComponentFunction.PageFunction === 'orderForm' && (ComponentFunction.orderFormFunction === 'edit' || ComponentFunction.orderFormFunction === 'arc' || ComponentFunction.orderFormFunction === 'pattern')) {
            setCalculate('true')
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
        if ((ComponentFunction.OrdersComponentFunction === 'orderList' && (user.user.role === 'carrier' || user.user.role === 'driver'))) {
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
        if (ComponentFunction.PageFunction === 'orderForm' && user.user.role === 'customer')
            setCalculate('true')
    }, [])

    useEffect(() => {
        setShowMarkers(true)
    }, [])

    useEffect(() => {
        setShowMarkers(true)
    }, [order.map_orders, State.user_state.favorite_order_state, Setting.app_theme])


    const Order = SetNativeTranslate(Translate.language, {}, 'order')
    const Auction = SetNativeTranslate(Translate.language, {}, 'auction')
    const cost = SetNativeTranslate(Translate.language, {}, 'cost')
    const arrival_time_field_name = SetNativeTranslate(Translate.language, {}, 'arrival_time_field_name')
    const start = SetNativeTranslate(Translate.language, {}, 'start')
    const finish = SetNativeTranslate(Translate.language, {}, 'finish')
    const Distance = SetNativeTranslate(Translate.language, {}, 'distance')
    const go_to_order = SetNativeTranslate(Translate.language, {}, 'go_to_order')
    const go_to_auction = SetNativeTranslate(Translate.language, {}, 'go_to_auction')
    const points_in_the_order = SetNativeTranslate(Translate.language, {}, 'points_in_the_order')



    //delete and add when updated!
    const setMarker = (title, gMap, location, index) => {
        //eslint-disable-next-line no-undef
        let marker = new google.maps.Marker({
            position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
            gMap,
            title: title,
            icon: Setting.app_theme === 'light' ? nav : nav_dark
        })
        marker.setMap(gMap)
        setLocationMarker(marker)
    }

    //driver instead partner and also for carrier state for customers? 
    useEffect(
        () => {
            if (user.user.role === 'customer' && thisOrder && thisOrder.order_status === 'inWork') {
                let driverInfo = Driver.drivers.find(el => el.user_info.id === thisOrder.driver_id)
                if (gMap && driverInfo && driverInfo.user_info.location) {
                    let location = JSON.parse(driverInfo.user_info.location)
                    let title = SetNativeTranslate(Translate.language, {
                        russian: [`Обновлено ${setTime(new Date(location.updated), 0, 'show')}`],
                        english: [`Updated ${setTime(new Date(location.updated), 0, 'show')}`],
                        spanish: [`Actualizado ${setTime(new Date(location.updated), 0, 'show')}`],
                        turkish: [`Güncellenmiş ${setTime(new Date(location.updated), 0, 'show')}`],
                        сhinese: [`更新 ${setTime(new Date(location.updated), 0, 'show')}`],
                        hindi: [`अद्यतन ${setTime(new Date(location.updated), 0, 'show')}`],
                    })
                    if (!locationMarker) {
                        setMarker(title, gMap, location)
                    }
                    else if (locationMarker && locationMarker.getTitle() !== title) {
                        locationMarker.setMap(null)
                        setMarker(title, gMap, location)
                    }
                }
            }
        }
        , [Driver.drivers, gMap])




    useEffect(
        () => {
            if (user.user.role === 'carrier') {
                if (thisOrder && thisOrder.order_status === 'inWork') {
                    let driverInfo = Driver.drivers.find(el => el.user_info.id === thisOrder.driver_id)
                    if (gMap && driverInfo && driverInfo.user_info.location) {
                        let location = JSON.parse(driverInfo.user_info.location)
                        let title = SetNativeTranslate(Translate.language, {
                            russian: [`Обновлено ${setTime(new Date(location.updated), 0, 'show')}`],
                            english: [`Updated ${setTime(new Date(location.updated), 0, 'show')}`],
                            spanish: [`Actualizado ${setTime(new Date(location.updated), 0, 'show')}`],
                            turkish: [`Güncellenmiş ${setTime(new Date(location.updated), 0, 'show')}`],
                            сhinese: [`更新 ${setTime(new Date(location.updated), 0, 'show')}`],
                            hindi: [`अद्यतन ${setTime(new Date(location.updated), 0, 'show')}`],
                        })
                        if (!locationMarker) {
                            setMarker(title, gMap, location)
                        }
                        else if (locationMarker && locationMarker.getTitle() !== title) {
                            locationMarker.setMap(null)
                            setMarker(title, gMap, location)
                        }
                    }
                } else {
                    if (gMap) {
                        if (driverMarkers.length > 0) {

                            //clean if no driver
                            for (const marker of driverMarkers) {
                                let driver = marker.getTitle().split(':')[0]
                                if (!Driver.drivers.map(el => el.user_info).find(el => el.name_surname_fathersname === driver)) {
                                    marker.setMap(null)
                                    let data = [...driverMarkers]
                                    data.filter(el => el.getTitle() === driver)
                                    setDriverMarkers([...data])
                                }
                            }

                            //clean if old
                            for (const driver of Driver.drivers) {
                                let location = JSON.parse(driver.user_info.location)
                                let title = SetNativeTranslate(Translate.language, {
                                    russian: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                    english: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                    spanish: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                    turkish: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                    сhinese: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                    hindi: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                })

                                let marker = driverMarkers.find(el => el.getTitle().split(':')[0] === title.split(':')[0])
                                if (marker.getTitle() !== title) {
                                    marker.setMap(null)
                                    let data = [...driverMarkers]
                                    data.filter(el => el.getTitle() === driver)
                                    setDriverMarkers([...data])
                                }
                            }
                        }
                        //add if absent
                        for (const driver of Driver.drivers) {
                            let location = JSON.parse(driver.user_info.location)
                            let title = SetNativeTranslate(Translate.language, {
                                russian: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                english: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                spanish: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                turkish: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                сhinese: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                                hindi: [`${driver.user_info.name_surname_fathersname}:${setTime(new Date(location.updated), 0, 'show')}`],
                            })
                            if (!driverMarkers.find(el => el.getTitle() === title)) {
                                //eslint-disable-next-line no-undef
                                let marker = new google.maps.Marker({
                                    position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) },
                                    gMap,
                                    title: title,
                                    icon: Setting.app_theme === 'light' ? nav : nav_dark
                                })
                                marker.setMap(gMap)
                                setDriverMarkers([...driverMarkers, marker]
                                )
                            }
                        }
                    }
                }
            }
        }
        , [UserInfo.userInfo, Driver.drivers, gMap])


    //self position for driver drivers positions for cerrier at order in work map, all drivers position for orders map

    useEffect(
        () => {
            if (user.user.role === 'driver' || (user.user.role === 'carrier' && Driver.drivers.length === 0) ) {
                if (gMap && UserInfo.userInfo.location) {
                    let location = JSON.parse(UserInfo.userInfo.location)
                    let title = SetNativeTranslate(Translate.language, {
                        russian: [`Обновлено ${setTime(new Date(location.updated), 0, 'show')}`],
                        english: [`Updated ${setTime(new Date(location.updated), 0, 'show')}`],
                        spanish: [`Actualizado ${setTime(new Date(location.updated), 0, 'show')}`],
                        turkish: [`Güncellenmiş ${setTime(new Date(location.updated), 0, 'show')}`],
                        сhinese: [`更新 ${setTime(new Date(location.updated), 0, 'show')}`],
                        hindi: [`अद्यतन ${setTime(new Date(location.updated), 0, 'show')}`],
                    })
                    if (!locationMarker) {
                        setMarker(title, gMap, location)
                    }
                    else if (locationMarker && locationMarker.getTitle() !== title) {
                        locationMarker.setMap(null)
                        setMarker(title, gMap, location)
                    }
                }
            }
        }
        , [UserInfo.userInfo, gMap])






    useEffect(() => {
        if ((user.user.role === 'carrier' || user.user.role === 'driver') && ComponentFunction.OrdersComponentFunction === 'orderList' && ComponentFunction.Function === 'new' && gMap) {
            if (order.map_orders && order.map_orders.length > 0 && gMarkers.length === 0) {
                for (const orderItem of order.map_orders) {
                    let points = Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === orderItem.pointsIntegrationId)
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
                    <div style="font-size:10px">${Distance} ${setDistance(orderItem.mileage)} ${SetNativeTranslate(Translate.language, {}, Adress.country.distance)}</div>
                    <div id='${orderItem.id}'
                    style="font-size:10px; font-weight:bold; cursor:pointer"
                    >${orderItem.order_type === 'order' ? go_to_order : go_to_auction}</div>                   
                    `
                    let labelIcon =
                        State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) ? (Setting.app_theme === 'light' ? star : star_dark) :
                            orderItem.type === 'walk' ? (Setting.app_theme === 'light' ? walk : walk_dark) :
                                orderItem.type === 'bike' ? (Setting.app_theme === 'light' ? bike : bike_dark) :
                                    orderItem.type === 'electric_scooter' ? (Setting.app_theme === 'light' ? el_scooter : el_scooter_dark) :
                                        orderItem.type === 'scooter' ? (Setting.app_theme === 'light' ? scooter : scooter_dark) :
                                            orderItem.type === 'car' ? (Setting.app_theme === 'light' ? car : car_dark) :
                                                orderItem.type === 'combi' ? (Setting.app_theme === 'light' ? minibus : minibus_dark) :
                                                    orderItem.type === 'minibus' ? (Setting.app_theme === 'light' ? minibus : minibus_dark) :
                                                        orderItem.type === 'truck' ? (Setting.app_theme === 'light' ? truck : truck_dark) : ''

                    //eslint-disable-next-line no-undef
                    let marker = new google.maps.Marker({
                        position: { lat: parseFloat(orderItem.start_lat), lng: parseFloat(orderItem.start_lng) },
                        icon: labelIcon,
                        gMap,
                        title: `${orderItem.id}`,
                        // label: {
                        //     text: labelText,
                        //     fontFamily: "Material Icons",
                        //     color: "#ffffff",
                        //     fontSize: "16px",
                        // }
                    })
                    gMarkers.push(marker)
                    addInfoWindow(marker, markerContent, orderItem.id)
                }
                for (const marker of gMarkers) {
                    marker.setMap(gMap)
                }
            }
            else if (order.map_orders && order.map_orders.length > 0 && gMarkers.length > 0 && gMap) {

                let labelIcon = Setting.app_theme === 'light' ? star : star_dark
                for (let i = 0; i < gMarkers.length; i++) {
                    let orderItem = order.map_orders.find(el => el.id === Number(gMarkers[i].getTitle()))
                    if (!orderItem
                        || (gMarkers[i].getIcon().indexOf('dark') !== -1 && Setting.app_theme === 'light') || (gMarkers[i].getIcon().indexOf('dark') === -1 && Setting.app_theme === 'dark')
                    ) {
                        gMarkers[i].setMap(null);
                        gMarkers.splice(i, 1)
                    }
                    else if ((State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) && gMarkers[i].getIcon() !== labelIcon) || (State.user_state.favorite_order_state && !State.user_state.favorite_order_state.includes(orderItem.id) && gMarkers[i].getIcon() === labelIcon)) {
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

                    let points = Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === orderItem.pointsIntegrationId)
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
                    <div style="font-size:10px">${Distance} ${setDistance(orderItem.mileage)} ${SetNativeTranslate(Translate.language, {}, Adress.country.distance)}</div>
                    <div id='${orderItem.id}'
                    style="font-size:10px; font-weight:bold; cursor:pointer"
                    >${orderItem.order_type === 'order' ? go_to_order : go_to_auction}</div>                   
                    `
                    let labelIcon =
                        State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(orderItem.id) ? (Setting.app_theme === 'light' ? star : star_dark) :
                            orderItem.type === 'walk' ? (Setting.app_theme === 'light' ? walk : walk_dark) :
                                orderItem.type === 'bike' ? (Setting.app_theme === 'light' ? bike : bike_dark) :
                                    orderItem.type === 'electric_scooter' ? (Setting.app_theme === 'light' ? el_scooter : el_scooter_dark) :
                                        orderItem.type === 'scooter' ? (Setting.app_theme === 'light' ? scooter : scooter_dark) :
                                            orderItem.type === 'car' ? (Setting.app_theme === 'light' ? car : car_dark) :
                                                orderItem.type === 'combi' ? (Setting.app_theme === 'light' ? minibus : minibus_dark) :
                                                    orderItem.type === 'minibus' ? (Setting.app_theme === 'light' ? minibus : minibus_dark) :
                                                        orderItem.type === 'truck' ? (Setting.app_theme === 'light' ? truck : truck_dark) : ''

                    //eslint-disable-next-line no-undef
                    let marker = new google.maps.Marker({
                        position: { lat: parseFloat(orderItem.start_lat), lng: parseFloat(orderItem.start_lng) },
                        title: `${orderItem.id}`,
                        icon: labelIcon,
                        // label: {
                        //     // text:labelText,                       
                        //     // fontFamily: "Material Icons",
                        //     // color: "#ffffff",
                        //     // fontSize: "16px",
                        // }
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
        if (!pointFormData.find(el => !el.latitude) && !pointFormData.find(el => !el.longitude) && gMap) {
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

            calculateTime(results, 0, 0, 'calculate')

            for (const leg of results.routes[0].legs) {
                calculatedDistance = calculatedDistance + leg.distance.value
                calculatedDuration = calculatedDuration + leg.duration.value
            }
            setRouteDistance(calculatedDistance)
            setRouteDuration(calculatedDuration)
            formData.mileage = calculatedDistance
            setFormData({ ...formData, direction_response: JSON.stringify(results) })

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
        Point.setThisOrderPoints(Point.divided_points[ComponentFunction.Function].filter(el => el.orderIntegrationId === thisOrder.pointsIntegrationId))
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
                        {/* <button
                            className={Setting.app_theme === 'light' ? 'map_button' : 'map_button_dark'}
                            onClick={calculateRoute}
                            disabled={pointsNotValid}
                        >{SetNativeTranslate(Translate.language, {}, 'calculate_route')}</button> */}
                        {ComponentFunction.orderFormFunction === 'newOrder' &&
                            <button
                                className={Setting.app_theme === 'light' ? 'map_button' : 'map_button dark'}
                                onClick={clearRoute}
                                disabled={!directionsResponse}
                            >{SetNativeTranslate(Translate.language, {}, 'clear_route')}</button>
                        }
                    </div>

                    {distance &&
                        <div className={Setting.app_theme === 'light' ? 'calculated_data_container' : 'calculated_data_container calculated_data_container_dark'}>
                            <div className='calculated_data'>{`${SetNativeTranslate(Translate.language, {}, 'distance')} ${setDistance(distance)} ${SetNativeTranslate(Translate.language, {}, Adress.country.distance)}`}
                            </div>
                            <div className='calculated_data'>{`${SetNativeTranslate(Translate.language, {}, 'duration')}
                             ${setDuration(duration)}
                            `}</div>
                        </div>
                    }

                    {Limit.user_limits.customer_new_order_range > 1000 &&
                        <div className={'scale_container'}>
                            {mapScaleSteps.map(step =>
                                <div className='button_row' key={step}>
                                    <button
                                        className={Setting.user_map_scale === step ? 'map_scale_button active only' : Setting.app_theme === 'light' ? 'map_scale_button only' : 'map_scale_button map_scale_button_dark only'}
                                        onClick={() => {
                                            Setting.setUserMapScale(step)
                                            Setting.setBoundsLimit(step / 100)
                                            State.setUserStateField(Setting.user_map_scale, 'user_map_scale', UserInfo.userInfo.id)
                                            calcBounds()
                                            setRefreshMap(true)
                                        }}
                                    >{`${step} ${SetNativeTranslate(Translate.language, {}, Adress.country.distance)}`}</button>
                                </div>
                            )}
                        </div>
                    }

                </div>
            }

            {/* for driver upervisor transport and self transport dependency */}
            {(ComponentFunction.PageFunction === 'orderList' && ComponentFunction.OrdersComponentFunction !== 'orderItem' && (user.user.role === 'carrier' || (user.user.role === 'driver' && (Transport.transports.find(el => el.type === 'combi' || el.type === 'truck' || el.type === 'car' || el.type === 'minibus')))) && (user.user.role !== 'driver' && Limit.user_limits.carrier_take_order_city_limit !== 0 )) &&
                <>
                    <div className={'map_info_container'}>
                        <CitySelector calcAllCities={calcAllCities} calcСityOrderBounds={calcСityOrderBounds} setRefreshMap={setRefreshMap} />
                    </div>
                </>
            }
        </div>
    )
})

export default MapComponent


import React, { useContext, useEffect } from 'react'
import { useGeolocated } from "react-geolocated";
import { AdressContext, OrderContext, UserContext, UserInfoContext } from '.';
import { observer } from 'mobx-react-lite';
import { updateLocation } from './http/userInfoApi';

const Geolocator = observer(() => {
    const { Adress } = useContext(AdressContext)
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { coords, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 1000,
            suppressLocationOnMount: true
        });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    const showPosition = async (position) => {
        await updateLocation({
            id: UserInfo.userInfo.id,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            updated: new Date()
        })
        Adress.setLocation(position.coords.latitude, 'lat')
        Adress.setLocation(position.coords.longitude, 'lng')
        Adress.setLocation('detected', 'status')
    }

    let interval
    let startLocationControl = () => {
        interval = setInterval(getLocation, 60000)
    }


    useEffect(() => {
        if (user && user.isAuth && (user.user.role === 'carrier' || user.user.role === 'driver')) {
            getLocation()
            startLocationControl()
        }
    }, [])

    useEffect(() => {
        if (user && user.isAuth && (user.user.role === 'carrier' || user.user.role === 'driver')) {
            getLocation()
            !interval && startLocationControl()
        }
    }, [user.isAuth])

    useEffect(() => {
        Adress.location.fetch && getLocation()
        Adress.setLocation(false, 'fetch')
    }, [Adress.location.fetch])


    // launch and stop geolocation
    // for carrier launch when have order in work and its same with driver
    // fo customer never? just when i will add adress from map

    useEffect(() => {
        !isGeolocationEnabled ? Adress.setLocation('not_enabled', 'status') : coords ? Adress.setLocation('detected', 'status') : Adress.setLocation('in_progress', 'status')
    }, [isGeolocationEnabled, coords])

    return (<></>)
})


export default Geolocator
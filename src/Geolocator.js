import React, { useContext, useEffect } from 'react'
import { useGeolocated } from "react-geolocated";
import { AdressContext } from '.';
import { observer } from 'mobx-react-lite';

const Geolocator = observer(() => {
    const { Adress } = useContext(AdressContext)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 1000,
        });

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    const showPosition = (position) => {
        Adress.setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }

    useEffect(()=>{
        getLocation()
    },[])

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <>
            <div>Geolocation is not enabled</div>
        </>
    ) : coords ? (
        <>
            <div>We have location</div>
        </>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
})


export default Geolocator
import React, { useContext, useEffect } from 'react'
import { useGeolocated } from "react-geolocated";
import { AdressContext, UserContext } from '.';
import { observer } from 'mobx-react-lite';

const Geolocator = observer(() => {
    const { Adress } = useContext(AdressContext)
    const { user } = useContext(UserContext)
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
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

    const showPosition = (position) => {
        Adress.setLocation(position.coords.latitude, 'lat')
        Adress.setLocation(position.coords.longitude, 'lng')
        Adress.setLocation('detected', 'status')
    }

    useEffect(() => {
        if (user && user.isAuth) {
            getLocation()
        }
    }, [])

    useEffect(() => {
        if (user && user.isAuth) {
            getLocation()
        }
    }, [user.isAuth])

    useEffect(() => {
        console.log('yes');
        Adress.location.fetch && getLocation()
        Adress.setLocation(false, 'fetch')
    }, [Adress.location.fetch])


    useEffect(() => {
        !isGeolocationEnabled ? Adress.setLocation('not_enabled', 'status') : coords ? Adress.setLocation('detected', 'status') : Adress.setLocation('in_progress', 'status')
    }, [isGeolocationEnabled, coords])

    return (<></>)
})


export default Geolocator
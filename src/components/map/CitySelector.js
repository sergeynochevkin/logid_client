import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, FetcherContext, FilterAndSortContext, LimitContext, NotificationContext, SettingContext, StateContext, TranslateContext, TransportContext, UserContext, UserInfoContext } from '../..'
import './Map.css'
import { v4 } from "uuid";
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';

import remove from '../../assets/icons/remove.png';
import remove_dark from '../../assets/icons/remove_dark.png';

const CitySelector = observer(({ calcAllCities, calcСityOrderBounds, setRefreshMap }) => {
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)
    const { Notification } = useContext(NotificationContext)
    const { Limit } = useContext(LimitContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { State } = useContext(StateContext)
    const { Transport } = useContext(TransportContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const { user } = useContext(UserContext)

    let userCity = { lat: undefined, lng: undefined, name: '' }
    userCity.name = UserInfo.userInfo.city
    userCity.lat = parseFloat(UserInfo.userInfo.city_latitude)
    userCity.lng = parseFloat(UserInfo.userInfo.city_longitude)

    let autocomplete
    function initAutocomplete(id, country) {
        //eslint-disable-next-line no-undef
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(id),
            {
                types: ['locality', 'administrative_area_level_3'],
                componentRestrictions: { 'country': [`${country}`] },
                fields: ['geometry', 'name']
            },
        )
        autocomplete.addListener('place_changed', onPlaceChanged)
    }

    const subscription_cities_limit = SetNativeTranslate(Translate.language, {}, 'subscription_cities_limit')
    const city_already_added = SetNativeTranslate(Translate.language, {}, 'city_already_added')
    const added_order_tracking_city = SetNativeTranslate(Translate.language, {}, 'added_order_tracking_city')
    const no_need_to_add = SetNativeTranslate(Translate.language, {}, 'no_need_to_add')
    const your_default_city = SetNativeTranslate(Translate.language, {}, 'your_default_city')


    function onPlaceChanged(id) {
        var place = autocomplete.getPlace()
        let pattern = { lat: undefined, lng: undefined, name: '' }
        if (!place.geometry) {
            document.getElementById(id).placeholder = SetNativeTranslate(Translate.language, {}, 'enter_a_city_to_track')
            // dataReset()
        } else {
            pattern.name = place.name
            pattern.lat = place.geometry.location.lat()
            pattern.lng = place.geometry.location.lng()
            if (Setting.user_map_cities.length >= Limit.user_limits.carrier_take_order_city_limit) {
                Notification.addNotification([{ id: v4(), type: 'error', message: subscription_cities_limit }])
            }
            else if (Setting.user_map_cities.find(el => el.lat === pattern.lat && el.lng === pattern.lng)) {
                Notification.addNotification([{ id: v4(), type: 'error', message: `${city_already_added} ${place.name}` }])
            }
            else if (pattern.lat === parseFloat(userCity.lat) && pattern.lng === parseFloat(userCity.lng)) {
                Notification.addNotification([{ id: v4(), type: 'error', message: `${no_need_to_add} ${place.name}${your_default_city}` }])
            }
            else {
                let data = [...Setting.user_map_cities]
                data.push(pattern)
                Setting.setUserMapCities(data)
                State.setUserStateField(data, 'user_map_cities', UserInfo.userInfo.id)
                Notification.addNotification([{ id: v4(), type: 'success', message: `${added_order_tracking_city} ${place.name}` }])
                if (Setting.all_cities === true) {
                    calcAllCities()
                    setRefreshMap(true)
                }
                fetcher.setOrders(true)
            }
        }
    }

    useEffect(() => {
        initAutocomplete('city', Adress.country.google_code)
        Setting.setUserMapCity(State.user_state.user_map_citу && Object.keys(State.user_state.user_map_citу).length !== 0 ? State.user_state.user_map_city : userCity)
        Setting.setUserMapCities(State.user_state.user_map_cities ? State.user_state.user_map_cities : [])
    }, [])


    function resetAllCities() {
        Setting.setAllCities(false)
        calcСityOrderBounds()
        setRefreshMap(true)
        //убрать из стейт
        State.setUserStateField(Setting.all_cities, 'all_cities', UserInfo.userInfo.id)
    }
    
    return (
        <>

            {user.user.role !== 'driver' ?
                <input className='city_selector_input' id='city'
                    placeholder={SetNativeTranslate(Translate.language, {}, 'enter_a_city_to_track')}
                ></input> : <></>}

            {((Transport.transports.map(el => el.type).includes('car') || Transport.transports.map(el => el.type).includes('truck') || Transport.transports.map(el => el.type).includes('minibus') || Transport.transports.map(el => el.type).includes('combi')) && Setting.user_map_cities.length >= 1) &&
                <div className='button_row'>
                    <div
                        className={FilterAndSort.filters.intercity ? 'map_scale_button active' : Setting.app_theme === 'light' ? 'map_scale_button' : 'map_scale_button map_scale_button_dark'}
                        onClick={() => {
                            if (!FilterAndSort.filters.intercity) {
                                FilterAndSort.setFilters(true, 'intercity')
                            } else {
                                FilterAndSort.setFilters(false, 'intercity')
                            }
                            fetcher.setOrders(true)
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'intercity_only')}</div>
                </div>
            }

            {Setting.user_map_cities.length >= 1 &&
                <div className='button_row'>
                    <div
                        className={Setting.all_cities ? 'map_scale_button active' : Setting.app_theme === 'light' ? 'map_scale_button' : 'map_scale_button map_scale_button_dark'}
                        onClick={() => {
                            if (Setting.all_cities === false) {
                                calcAllCities()
                                setRefreshMap(true)
                                FilterAndSort.setFilters('', 'city')
                                State.setUserStateField(Setting.all_cities, 'all_cities', UserInfo.userInfo.id)
                                fetcher.setOrdersNew(true)
                            }
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'all_cities')}</div>
                </div>
            }

            <div className='button_row'>
                <div
                    className={State.user_state.user_map_city && State.user_state.user_map_city.lat === userCity.lat && State.user_state.user_map_city.lng === userCity.lng && Setting.all_cities !== true ? 'map_scale_button active' : Setting.app_theme === 'light' ? 'map_scale_button' : 'map_scale_button map_scale_button_dark'}
                    onClick={() => {
                        Setting.setUserMapCity(userCity)
                        State.setUserStateField(userCity, 'user_map_city', UserInfo.userInfo.id)
                        FilterAndSort.setFilters(userCity, 'city')
                        fetcher.setOrdersNew(true)
                        resetAllCities()
                    }}
                >{userCity.name}</div>
            </div>
            {[...Setting.user_map_cities, ...State.supervisor_state.cities].map(city =>
                <div className='button_row'
                    key={city.name}
                >
                    <div
                        className={State.user_state.user_map_city && State.user_state.user_map_city.lat === city.lat && State.user_state.user_map_city.lng === city.lng && Setting.all_cities !== true ? 'map_scale_button active' : Setting.app_theme === 'light' ? 'map_scale_button' : 'map_scale_button map_scale_button_dark'}
                        onClick={() => {
                            Setting.setUserMapCity(city)
                            State.setUserStateField(city, 'user_map_city', UserInfo.userInfo.id)
                            FilterAndSort.setFilters(city, 'city')
                            fetcher.setOrdersNew(true)
                            resetAllCities()

                        }}
                    >{city.name}</div>

                    {user.user.role !== 'driver' ?
                        <div className={Setting.app_theme === 'light' ? "map_action_icon_container" : "map_action_icon_container dark"}>
                            <img className={"remove_city_icon"} src={Setting.app_theme === 'light' ? remove : remove_dark}
                                alt='delete city'
                                onClick={() => {
                                    if (city.lat === Setting.user_map_city.lat && city.lng === Setting.user_map_city.lng) {
                                        Setting.setUserMapCity(userCity)
                                        State.setUserStateField(Setting.user_map_city, 'user_map_city', UserInfo.userInfo.id)
                                    }
                                    Setting.setUserMapCities([...Setting.user_map_cities].filter(el => el.lat !== city.lat && el.lng !== city.lng))
                                    State.setUserStateField(Setting.user_map_cities, 'user_map_cities', UserInfo.userInfo.id)
                                    if (Setting.user_map_cities.length >= 1 && Setting.all_cities === true) {
                                        calcAllCities()
                                        setRefreshMap(true)
                                    }
                                    else if (Setting.user_map_cities.length >= 1 && Setting.all_cities === false) {
                                        calcСityOrderBounds()
                                        setRefreshMap(true)
                                    }
                                    else if (Setting.user_map_cities.length === 0 && Setting.all_cities === true) {
                                        resetAllCities()
                                    }
                                    fetcher.setOrders(true)
                                }}
                            />
                        </div> : <></>}

                </div>
            )}
        </>
    )
})

export default CitySelector
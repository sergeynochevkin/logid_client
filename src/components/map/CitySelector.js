import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, FilterAndSortContext, LimitContext, NotificationContext, SettingContext, StateContext, TransportContext, UserInfoContext } from '../..'
import './Map.css'
import { v4 } from "uuid";
import close_white from '../../../src/assets/close_white.png';

const CitySelector = observer(({ setFetchStart, calcAllCities, calcСityOrderBounds, setRefreshMap }) => {
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)
    const { Notification } = useContext(NotificationContext)
    const { Limit } = useContext(LimitContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { State } = useContext(StateContext)
    const { Transport } = useContext(TransportContext)
    const { FilterAndSort } = useContext(FilterAndSortContext)

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

    function onPlaceChanged(id) {
        var place = autocomplete.getPlace()
        let pattern = { lat: undefined, lng: undefined, name: '' }
        if (!place.geometry) {
            document.getElementById(id).placeholder = 'Введите город'
            // dataReset()
        } else {
            pattern.name = place.name
            pattern.lat = place.geometry.location.lat()
            pattern.lng = place.geometry.location.lng()
            if (Setting.user_map_cities.length >= Limit.user_limits.carrier_take_order_city_limit) {
                Notification.addNotification([{ id: v4(), type: 'error', message: `Вы достигли лимта городов для отслеживания заказов доступного с вашей подпиской` }])
            }
            else if (Setting.user_map_cities.find(el => el.lat === pattern.lat && el.lng === pattern.lng)) {
                Notification.addNotification([{ id: v4(), type: 'error', message: `Вы уже добавили город отслеживания заказов ${place.name}` }])
            }
            else if (pattern.lat === parseFloat(userCity.lat) && pattern.lng === parseFloat(userCity.lng)) {
                Notification.addNotification([{ id: v4(), type: 'error', message: `Нет необходимости добавлять ${place.name} это ваш город по умолчанию` }])
            }
            else {
                let data = [...Setting.user_map_cities]
                data.push(pattern)
                Setting.setUserMapCities(data)
                State.setUserStateField(data, 'user_map_cities', UserInfo.userInfo.id)
                Notification.addNotification([{ id: v4(), type: 'success', message: `Добавлен город отслеживания заказов ${place.name}` }])
                if (Setting.all_cities === true) {
                    calcAllCities()
                    setRefreshMap(true)
                }
                setFetchStart(true)
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
            <input className='city_selector_input' id='city'
                placeholder='Введите город для отслеживания'
            ></input>

            {/* Кнопка только межгород, если у перевозчика есть кар бас трак комби меняет фильтр делать - осталось доработать фетч расстояние между центрами больше чем баундс или баундс * 2! */}
            {((Transport.transports.map(el => el.type).includes('car') || Transport.transports.map(el => el.type).includes('truck') || Transport.transports.map(el => el.type).includes('minibus') || Transport.transports.map(el => el.type).includes('combi')) && Setting.user_map_cities.length >= 1) &&
                <div className='button_row'>
                    <div
                        className={!FilterAndSort.filters.intercity ? 'map_scale_button' : 'map_scale_button active'}
                        onClick={() => {
                            if (!FilterAndSort.filters.intercity) {
                                FilterAndSort.setFilters(true, 'intercity')
                            } else {
                                FilterAndSort.setFilters(false, 'intercity')
                            }
                            setFetchStart(true)
                        }}
                    >Только межгород</div>
                </div>
            }

            {/* Кнопка на все города если больше одного города меняет баундс делать! */}
            {Setting.user_map_cities.length >= 1 &&
                <div className='button_row'>
                    <div
                        className={!Setting.all_cities ? 'map_scale_button' : 'map_scale_button active'}
                        onClick={() => {
                            if (Setting.all_cities === false) {
                                calcAllCities()
                                setRefreshMap(true)
                                State.setUserStateField(Setting.all_cities, 'all_cities', UserInfo.userInfo.id)
                            } else {
                                resetAllCities()
                            }
                        }}
                    >Все города</div>
                </div>
            }

            <div className='button_row'>
                <div
                    className={State.user_state.user_map_city && State.user_state.user_map_city.lat === userCity.lat && State.user_state.user_map_city.lng === userCity.lng && Setting.all_cities !== true ? 'map_scale_button active' : 'map_scale_button'}
                    onClick={() => {
                        Setting.setUserMapCity(userCity)
                        State.setUserStateField(userCity, 'user_map_city', UserInfo.userInfo.id)
                        resetAllCities()
                    }}
                >{userCity.name}</div>
            </div>
            {Setting.user_map_cities.map(city =>
                <div className='button_row'
                    key={city.name}
                >
                    <div
                        className={State.user_state.user_map_city && State.user_state.user_map_city.lat === city.lat && State.user_state.user_map_city.lng === city.lng && Setting.all_cities !== true ? 'map_scale_button active' : 'map_scale_button'}
                        onClick={() => {
                            Setting.setUserMapCity(city)
                            State.setUserStateField(city, 'user_map_city', UserInfo.userInfo.id)
                            resetAllCities()
                        }}
                    >{city.name}</div>
                    <img src={close_white}
                        className={'delete_icon'}
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
                            setFetchStart(true)
                        }}
                    ></img>
                </div>
            )}
        </>
    )
})

export default CitySelector
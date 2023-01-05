import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { AdressContext, SettingContext, TranslateContext, UserInfoContext } from '../..'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import '../ui/form/Form.css'

import './Order.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import PoinItem from '../point/PoinItem'

const OrderFormPointItem = observer(({ pointFormData, formData, addField, setPointFormData, pointItem, index, dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler, handleFormChange, handleFormBlur, removeField, calculateTime, setCalculate, move_up, move_down, setCurrentPoint }) => {

    const { UserInfo } = useContext(UserInfoContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)

    useEffect(() => {
        Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
        Setting.setBounds({
            north: Setting.center.lat + parseFloat(Setting.bounds_limit),
            south: Setting.center.lat - parseFloat(Setting.bounds_limit),
            east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
            west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
        }
        )
    }, [])


    let autocomplete
    function initAutocomplete(id) {
        if (Adress.country) {
            //eslint-disable-next-line no-undef
            autocomplete = new google.maps.places.Autocomplete(
                document.getElementById(id),
                {
                    bounds: Setting.bounds,
                    strictBounds: true,
                    types: ['geocode'],
                    componentRestrictions: { 'country': [`${Adress.country.google_code}`] },
                    fields: ['geometry', 'address_components', 'name'],
                    language: Adress.country.google_language
                },
            )
            autocomplete.addListener('place_changed', onPlaceChanged)
        }
    }

    useEffect(() => {
        initAutocomplete(pointItem.id)
    }, [])

    useEffect(() => {
        initAutocomplete(pointItem.id)
    }, [pointFormData.length, Setting.bounds_limit, pointItem.sequence])


    function onPlaceChanged(id) {
        var place = autocomplete.getPlace()
        var address_components = autocomplete.getPlace().address_components
        if (!place.geometry) {
            document.getElementById(id).placeholder = SetNativeTranslate(Translate.language, {}, 'enter_plase')
        } else {
            let data = [...pointFormData]
            data[index].point.value = place.name
            data[index].latitude = place.geometry.location.lat()
            data[index].longitude = place.geometry.location.lng()
            data[index].city = address_components[2].long_name
            data[index].point.isEmptyError = false
            setPointFormData(data)
            setCalculate(true)
        }
    }

    const dataReset = () => {
        let data = [...pointFormData]
        if (data[index].latitude && data[index].longitude) {
            data[index].point.value = ''
            data[index].latitude = undefined
            data[index].longitude = undefined
            data[index].city = ''
            data[index].point.isEmptyError = true
            setPointFormData(data)
            // autocomplete.set('place', null) // whether it is necessary?
        }
    }

    return (
        <div className={Setting.app_theme === 'light' ? 'point_container' : 'point_container point_container_dark'}
            onDragStart={(e) => dragStartHandler(e, pointItem)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, pointItem)}
            draggable={true}
            key={index}
        >
            <div className='point_fields_container'>
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input
                        id={pointItem.id}
                        name='point'
                        defaultValue={pointItem.point.value}
                        onChange={() => {
                            if (pointFormData[index].value !== '') {
                                dataReset()
                            }
                        }}
                        onBlur={event => {
                            handleFormBlur(index, event)
                        }}
                        style={{ borderLeft: (pointItem.point.isEmptyError) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    ></Input>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}
                    >
                        {pointItem.point.isDirty && pointItem.point.isEmptyError ?
                            pointItem.point.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input
                        name='customer_comment'
                        placeholder={SetNativeTranslate(Translate.language, {}, 'comment')}
                        defaultValue={pointItem.customer_comment.value}
                        onChange={event => handleFormChange(index, event)}
                        onBlur={event => handleFormBlur(index, event)}
                    ></Input>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}
                    >
                        {!pointItem.customer_comment.isEmptyError && (pointItem.customer_comment.minLengthError || pointItem.customer_comment.maxLengthError) ?
                            pointItem.customer_comment.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>

                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input
                        name='time' placeholder={SetNativeTranslate(Translate.language, {}, 'time')}
                        type="datetime-local"
                        value={pointItem.time.value}
                        onChange={event => handleFormChange(index, event)}
                        onBlur={event => handleFormBlur(index, event)}
                        style={{ borderLeft: (pointItem.time.isEmptyError) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    ></Input>
                    <div className='change_time_buttons_container'>
                        {pointItem.sequence === 1 &&
                            <div className='change_time_button'>now</div>
                        }
                        {pointItem.sequence !== 1 &&
                            <div className='change_time_button'></div>
                        }
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 600, pointItem.sequence, 'increase')
                            }}
                        >+10m</div>
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 3600, pointItem.sequence, 'increase')
                            }}
                        >+1h</div>
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 86400, pointItem.sequence, 'increase')
                            }}
                        >+1d</div>
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 600, pointItem.sequence, 'decrease')
                            }}
                        >-10m</div>
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 3600, pointItem.sequence, 'decrease')
                            }}
                        >-1h</div>
                        <div className='change_time_button'
                            onClick={() => {
                                calculateTime(JSON.parse(formData.direction_responce ? formData.direction_responce : false), 86400, pointItem.sequence, 'decrease')
                            }}
                        >-1d</div>

                    </div>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}
                    >
                        {pointItem.time.isEmptyError ?
                            pointItem.time.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>

            </div>

            <div className='poit_action_buttons_container'>

                {pointFormData.length > 2 ?
                    <span className="material-symbols-outlined point_action_icon"
                        onClick={() => {
                            removeField(pointItem)
                        }}
                    >
                        close
                    </span>
                    : <></>}

                {pointItem.sequence !== 1 ?
                    <span className="material-symbols-outlined point_action_icon"
                        onClick={() => {
                            setCurrentPoint(pointItem)
                            move_up(pointItem)
                        }}
                    >
                        arrow_upward
                    </span>
                    : <></>}

                {pointItem.sequence !== 50 ?
                    <span className="material-symbols-outlined point_action_icon"
                        onClick={() => {
                            setCurrentPoint(pointItem)
                            move_down(pointItem)
                        }}
                    >
                        arrow_downward
                    </span>
                    : <></>}

                {pointFormData.length !== 50 ?
                    <span className="material-symbols-outlined point_action_icon"
                        onClick={() => {
                            addField(pointItem)
                        }}
                    >
                        add
                    </span>
                    : <></>}

            </div>
        </div>
    )
})

export default OrderFormPointItem
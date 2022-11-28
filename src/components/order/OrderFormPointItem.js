import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AdressContext, LimitContext, SettingContext, UserInfoContext } from '../..'
import { AddDeleteFieldButton } from '../ui/form/AddDeleteFieldButton'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'

const PointContainer = styled.div`
display:flex;
flex-direction:column;
gap:5px;
padding:10px;
border-radius:10px 10px 10px 20px;
align-items:center;
cursor: grab;
box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.5);
background-color: rgb(245, 245, 245, 0.8)
`

const OrderFormPointItem = observer(({  Adress, pointFormData, setPointFormData, pointItem, index, dragStartHandler, dragLeaveHandler, dragEndHandler, dragOverHandler, dropHandler, handleFormChange, handleFormBlur, removeField, calculateRoute, setCalculate }) => {

    const { UserInfo } = useContext(UserInfoContext)
    const { Setting }= useContext(SettingContext)
   
useEffect(()=>{
    Setting.setCenter({ lat: parseFloat(UserInfo.userInfo.city_latitude), lng: parseFloat(UserInfo.userInfo.city_longitude) })
    Setting.setBounds({
        north: Setting.center.lat + parseFloat(Setting.bounds_limit),
        south: Setting.center.lat - parseFloat(Setting.bounds_limit),
        east: Setting.center.lng + parseFloat(Setting.bounds_limit) * 2,
        west: Setting.center.lng - parseFloat(Setting.bounds_limit) * 2,
    }
    )   
},[])

    let autocomplete
    function initAutocomplete(id, country) {
        //eslint-disable-next-line no-undef
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById(id),
            {
                bounds: Setting.bounds,
                strictBounds: true,
                types: ['geocode'],
                componentRestrictions: { 'country': [`${country}`] },
                fields: ['geometry', 'address_components', 'name']
            },
        )
        autocomplete.addListener('place_changed', onPlaceChanged)
    }

    useEffect(() => {
        initAutocomplete(pointItem.id, Adress.country.google_code)
    }, [])

    useEffect(() => {
        initAutocomplete(pointItem.id, Adress.country.google_code)
    }, [pointFormData.length, Setting.bounds_limit])


    function onPlaceChanged(id) {
        var place = autocomplete.getPlace()
        var address_components = autocomplete.getPlace().address_components
        if (!place.geometry) {
            document.getElementById(id).placeholder = 'Введите адрес'
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
        data[index].point.value = ''
        data[index].latitude = undefined
        data[index].longitude = undefined
        data[index].city = ''
        data[index].point.isEmptyError = true
        setPointFormData(data)
        autocomplete.set('place',null);//надо ли?
    }

    return (
        <PointContainer
            onDragStart={(e) => dragStartHandler(e, pointItem)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, pointItem)}
            draggable={true}
            key={index}
        >
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
                    placeholder='Комментарий'
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
            {index === 0 || index === pointFormData.length - 1 ?
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input
                        name='time' placeholder='Время'
                        type="datetime-local"
                        defaultValue={pointItem.time.value}
                        onChange={event => handleFormChange(index, event)}
                        onBlur={event => handleFormBlur(index, event)}
                        style={{ borderLeft: (pointItem.time.isEmptyError) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    >
                    </Input>
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
                : <></>}

            {pointFormData.length > 2 && (index !== 0 && index !== pointFormData.length - 1) ? <AddDeleteFieldButton onClick={() => {
                removeField(index)
            }}>удалить адрес</AddDeleteFieldButton> : <></>}
        </PointContainer>
    )
})

export default OrderFormPointItem
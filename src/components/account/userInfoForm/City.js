import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'
import AdressComponent from './AdressComponent'

const City = observer(({ formData, setFormData, cityEditable }) => {
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)

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

    useEffect(() => {
        initAutocomplete('city', Adress.country.google_code)
    }, [])

    useEffect(() => {
        initAutocomplete('city', Adress.country.google_code)
        dataReset()
    }, [Adress.country])

    const dataReset = () => {
        let data = { ...formData }
        data.city.value = ''
        data.city_latitude = undefined
        data.city_longitude = undefined
        data.city.notValid = true

        data.company_adress.value = ''
        data.company_adress_latitude = undefined
        data.company_adress_longitude = undefined
        data.company_adress.notValid = true

        setFormData(data)
    }


    function onPlaceChanged(id) {
        var place = autocomplete.getPlace()
        if (place) {
            if (!place.geometry) {
                document.getElementById(id).placeholder = SetNativeTranslate(Translate.language,{},'enter_city')
            } else {
                let data = { ...formData }
                data.city.value = place.name
                data.city_latitude = place.geometry.location.lat()
                data.city_longitude = place.geometry.location.lng()
                data.city.notValid = false

                setFormData(data)
            }
        }
    }

    return (
        <>
            <VerticalContainer
                style={{ gap: '0px' }}>
                <Input
                    placeholder={SetNativeTranslate(Translate.language,{},'enter_city')}
                    defaultValue={formData.city.value} name="city" id='city'
                    onChange={() => {
                        if (formData.city.value !== '') {
                            dataReset()
                        }
                    }}
                    onBlur={() => {
                        let data = { ...formData }
                        data.city.isDirty = true
                        setFormData(data)
                    }}
                    style={{ borderLeft: formData.city.notValid ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                >
                </Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {formData.city.notValid && formData.city.isDirty ?
                        SetNativeTranslate(Translate.language,{},'select_city').toLowerCase() :
                        ''
                    }
                </FieldName>
            </VerticalContainer>
        </>


    )
})

export default City
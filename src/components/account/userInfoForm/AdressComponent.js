import React, { useContext, useEffect } from 'react'
import { AdressContext, TranslateContext, UserInfoContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const AdressComponent = ({ formData, setFormData, parent }) => {

  const { Adress } = useContext(AdressContext)
  const { UserInfo } = useContext(UserInfoContext)
  const { Translate } = useContext(TranslateContext)

  let lat
  let lng

  if (parent === 'account' || parent === 'user'  ) {
    lat = parseFloat(UserInfo.userInfo.city_latitude)
    lng = parseFloat(UserInfo.userInfo.city_longitude)
  }

  const center = parent !== 'account' ? { lat: formData.city_latitude, lng: formData.city_longitude } : { lat: lat, lng: lng }

  const defaultBounds = {
    north: center.lat + 0.2,
    south: center.lat - 0.2,
    east: center.lng + 0.2,
    west: center.lng - 0.2,
  };


  let autocomplete
  function initAutocomplete(id, country) {
    //eslint-disable-next-line no-undef
    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById(id),
      {
        bounds: defaultBounds,
        strictBounds: true,
        types: ['geocode'],
        componentRestrictions: { 'country': [`${country}`] },
        fields: ['geometry', 'name'],
        language:Adress.country.google_language
      },
    )
    autocomplete.addListener('place_changed', onPlaceChanged)
  }

  useEffect(() => {
    initAutocomplete('company_adress', Adress.country.google_code)
  }, [])

  useEffect(() => {
    initAutocomplete('company_adress', Adress.country.google_code)
  }, [formData.city_latitude, formData.city_longitude])

  function onPlaceChanged(id) {
    var place = autocomplete.getPlace()
    if (place) {
      if (!place.geometry) {
        document.getElementById(id).placeholder = SetNativeTranslate(Translate.language,{},'adress_place_holder')
      } else {
        let data = { ...formData }
        data.company_adress.value = place.name
        data.company_adress_latitude = place.geometry.location.lat()
        data.company_adress_longitude = place.geometry.location.lng()
        data.company_adress.notValid = false
        setFormData(data)
      }
    }
  }

  const dataReset = () => {
    let data = { ...formData }
    data.company_adress.value = ''
    data.company_adress_latitude = undefined
    data.company_adress_longitude = undefined
    data.company_adress.notValid = true
    setFormData(data)
  }

  return (
    <>
      <VerticalContainer
        style={{ gap: '0px' }}
      >
        <Input placeholder={SetNativeTranslate(Translate.language,{},'adress_place_holder')} defaultValue={formData.company_adress.value}
          onChange={() => {
            if (formData.company_adress.value !== '') {
              dataReset()
            }
          }}
          onBlur={() => {
            let data = { ...formData }
            data.company_adress.isDirty = true
            setFormData(data)
          }}
          style={{ borderLeft: formData.company_adress.notValid ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
          type="text" name="company_adress" id='company_adress'></Input>

        <FieldName
          style={{
            fontWeight: 'normal',
            color: 'rgb(254, 111, 103,0.8)'
          }}>
          {(formData.company_adress.notValid && formData.company_adress.isDirty) ?
            SetNativeTranslate(Translate.language,{},'select_adress').toLowerCase() :
            ''
          }
        </FieldName>
      </VerticalContainer>
    </>
  )
}

export default AdressComponent
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext } from '../../..'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const Country = observer(({ formData, setFormData }) => {

    const { Adress } = useContext(AdressContext)

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Select defaultValue={formData.country.value} name="country" id='country'
                onChange={(e) => {
                    formData.country.onChange(e)
                    Adress.setCountry(Adress.countries.find(el => el.value === e.target.value))
                }}
                onBlur={e => formData.country.onBlur(e)}
                style={{ borderLeft: formData.country.notValid || formData.country.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            >
                <option hidden >{SetTranslate('country_content')}</option>
                {Adress.countries.map(country =>
                    <option value={country.value} key={country.id}>{SetTranslate(country.value)}</option>
                )}
            </Select>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {formData.country.isEmpty && formData.country.isDirty ?
                    SetTranslate('select_country').toLowerCase() :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
})

export default Country


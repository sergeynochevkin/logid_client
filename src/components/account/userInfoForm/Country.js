import { observer } from 'mobx-react-lite'
import React, { useContext} from 'react'
import { AdressContext } from '../../..'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Select } from '../../ui/form/Select'

const Country = observer(({ formData, setFormData }) => {

    const { Adress } = useContext(AdressContext)    

    return (
        <>
            <Select defaultValue={formData.country.value} name="country" id='country'
                onChange={(e) => {
                    formData.country.onChange(e)                    
                    Adress.setCountry(Adress.countries.find(el => el.value === e.target.value))                                     
                }}
                onBlur={e => formData.country.onBlur(e)}
                style={{ borderLeft: formData.country.notValid || formData.country.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            >
                <option hidden >Страна</option>
                {Adress.countries.map(country =>
                    <option value={country.value} key={country.id}>{SetTranslate(country.value)}</option>
                )}
            </Select>            
        </>
    )
})

export default Country


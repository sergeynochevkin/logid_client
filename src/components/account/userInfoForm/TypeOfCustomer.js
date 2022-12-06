import React from 'react'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const TypeOfCustomer = ({ formData, setFormData }) => {



    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Select value={formData.type_of_customer.value}
                onChange={(e) => formData.type_of_customer.onChange(e)}
                onBlur={e => formData.type_of_customer.onBlur(e)}
                name="type_of_customer" id='type_of_customer'
                style={{ borderLeft: formData.type_of_customer.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            >
                <option defaultValue hidden>{SetTranslate('delivery_for_place_holder')}</option>
                <option value="retail">{SetTranslate('retail')}</option>
                <option value="wholesale">{SetTranslate('wholesale')}</option>
                <option value="food_delivery">{SetTranslate('food_delivery')}в</option>
                <option value="ready_food_delivery">{SetTranslate('ready_food_delivery')}</option>
                <option value="electronics_repair">{SetTranslate('electronics_repair')}</option>
                <option value="for_myself">{SetTranslate('for_myself')}</option>
            </Select>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}>
                {formData.type_of_customer.isEmpty && formData.type_of_customer.isDirty ?
                    SetTranslate('delivery_for_validation') :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default TypeOfCustomer
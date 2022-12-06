import { observer } from 'mobx-react-lite'
import React from 'react'
import { useInput } from '../../../hooks/useInput'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const OrderType = observer( ({ formData, setFormData }) => {

    return (

        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Select value={formData.order_type.value}

                style={{ borderLeft: (formData.order_type.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                onChange={(e) => formData.order_type.onChange(e)}
                onBlur={e => formData.order_type.onBlur(e)}

                name="order_type" id="order_type"
            >
                <option defaultValue hidden>{SetTranslate('order_type_place_holder')}</option>
                <option value='order'>{SetTranslate('order')}</option>
                <option value='auction'>{SetTranslate('auction')}</option>
            </Select>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.order_type.isEmpty && formData.order_type.isDirty) ?
                    SetTranslate('select_order_type') :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
})

export default OrderType
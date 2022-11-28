import React from 'react'
import { useInput } from '../../../hooks/useInput'
import { Select } from '../../ui/form/Select'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const OrderType = ({ formData, setFormData }) => { 

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
                <option defaultValue hidden>Тип заказа</option>
                <option value='order'>Заказ</option>
                <option value='auction'>Аукцион</option>
            </Select>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.order_type.isEmpty && formData.order_type.isDirty) ?
                    'выберите тип заказа' :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default OrderType
import React from 'react'
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
                <option defaultValue hidden>Для чего вам доставка</option>
                <option value="retail">Розничная торговля</option>
                <option value="wholesale">Оптовая торговля</option>
                <option value="food_delivery">Доставка продуктов</option>
                <option value="ready_food_delivery">Доставка готовых блюд</option>
                <option value="electronics_repair">Ремонт электроники</option>
                <option value="for_myself">В личных целях</option>
            </Select>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}>
                {formData.type_of_customer.isEmpty && formData.type_of_customer.isDirty ?
                    'выберите для чего вам доставка' :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default TypeOfCustomer
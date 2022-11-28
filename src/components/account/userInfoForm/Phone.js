import React from 'react'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const Phone = ({ formData, setFormData }) => {

  

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder='Телефон' value={formData.phone.value}
                onChange={(e) => formData.phone.onChange(e)}
                onBlur={e => formData.phone.onBlur(e)}
                type="text" name="phone" id='phone'
                style={{ borderLeft: formData.phone.notValid || formData.phone.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            ></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.phone.isEmpty && formData.phone.isDirty) || (formData.phone.minLengthError) || (formData.phone.maxLengthError) || (formData.phone.formatError) ?
                    formData.phone.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default Phone
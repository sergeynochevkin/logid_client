import React from 'react'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const PassportNumber = ({ formData, setFormData }) => {




    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={SetTranslate('passport_number_place_holder')}
                value={formData.passport_number.value}
                onChange={(e) => formData.passport_number.onChange(e)}
                onBlur={e => formData.passport_number.onBlur(e)}
                type="text" name="passport_number" id='passport_number'
                style={{ borderLeft: formData.passport_number.notValid || formData.passport_number.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            ></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}>
                {(formData.passport_number.isEmpty && formData.passport_number.isDirty) || (formData.passport_number.minLengthError) || (formData.passport_number.maxLengthError) || (formData.passport_number.formatError) ?
                    formData.passport_number.errorMessage :
                    ''}
            </FieldName>
        </VerticalContainer>
    )
}

export default PassportNumber
import React from 'react'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const CompanyINN = ({ formData, setFormData }) => {

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={SetTranslate('company_inn_place_holder')} value={formData.company_inn.value}
                onChange={(e) => formData.company_inn.onChange(e)}
                onBlur={e => formData.company_inn.onBlur(e)}
                type="text" name="company_inn" id='company_inn'
                style={{ borderLeft: formData.company_inn.notValid || formData.company_inn.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            >

            </Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.company_inn.isEmpty && formData.company_inn.isDirty) || (formData.company_inn.minLengthError) || (formData.company_inn.maxLengthError) || (formData.company_inn.formatError) ?
                    formData.company_inn.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default CompanyINN
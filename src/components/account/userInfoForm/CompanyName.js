import React from 'react'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const CompanyName = ({ formData, setFormData }) => {



  return (
    <VerticalContainer
      style={{ gap: '0px' }}
    >
      <Input placeholder='Название компании' value={formData.company_name.value}
        onChange={(e) => formData.company_name.onChange(e)}
        onBlur={e => formData.company_name.onBlur(e)}
        style={{ borderLeft: formData.company_name.notValid || formData.company_name.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
        type="text" name="company_name" id='company_name'></Input>
      <FieldName
        style={{
          fontWeight: 'normal',
          color: 'rgb(254, 111, 103,0.8)'
        }}
      >
        {(formData.company_name.isEmpty && formData.company_name.isDirty) || (formData.company_name.minLengthError) || (formData.company_name.maxLengthError) ?
          formData.company_name.errorMessage :
          ''
        }
      </FieldName>
    </VerticalContainer>)
}

export default CompanyName
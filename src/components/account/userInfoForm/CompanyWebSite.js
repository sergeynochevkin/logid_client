import React from 'react'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const CompanyWebSite = ({ formData, setFormData }) => {

  

  return (
    <VerticalContainer
      style={{ gap: '0px' }}
    >
      <Input placeholder='Сайт компании' value={formData.website.value}
        onChange={(e) => formData.website.onChange(e)}
        onBlur={e => formData.website.onBlur(e)}
      style={{ borderLeft: formData.website.notValid && !formData.website.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
        type="text" name="website" id='website'></Input>
      <FieldName
        style={{
          fontWeight: 'normal',
          color: 'rgb(254, 111, 103,0.8)'
        }}
      >
        {(formData.website.minLengthError) || (formData.website.maxLengthError) || (formData.website.formatError) ?
          formData.website.errorMessage :
          ''
        }
      </FieldName>
    </VerticalContainer>
  )
}

export default CompanyWebSite
import React from 'react'
import { SetTranslate } from '../../../modules/SetTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const NameSurNameFathersName = ({ formData, setFormData }) => {  

  return (
    <VerticalContainer
      style={{ gap: '0px' }}>
      <Input placeholder={SetTranslate('name_surname_fathersname_place_holder')} value={formData.name_surname_fathersname.value} onChange={(e) => formData.name_surname_fathersname.onChange(e)} onBlur={e => formData.name_surname_fathersname.onBlur(e)} type="name_surname_fathersname" name="name_surname_fathersname"
      style={{ borderLeft: formData.name_surname_fathersname.notValid || formData.name_surname_fathersname.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
      >
      </Input>
      <FieldName
        style={{
          fontWeight: 'normal',
          color: 'rgb(254, 111, 103,0.8)'
        }}
      >
        {(formData.name_surname_fathersname.isEmpty && formData.name_surname_fathersname.isDirty) || (formData.name_surname_fathersname.minLengthError) || (formData.name_surname_fathersname.maxLengthError) ?
          formData.name_surname_fathersname.errorMessage :
          ''
        }
      </FieldName>      
    </VerticalContainer>
  )
}

export default NameSurNameFathersName
import React from 'react'
import { useInput } from '../../../hooks/useInput'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const OrderComment = ({ formData, setFormData }) => { 

  return (

    <VerticalContainer
      style={{ gap: '0px' }}
    >
      <Input placeholder='Комментарий к заказу' value={formData
        .order_comment.value}

        style={{ borderLeft: (formData.order_comment.notValid && !formData.order_comment.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
        onChange={(e) => formData.order_comment.onChange(e)}
        onBlur={e => formData.order_comment.onBlur(e)}

        type="text" name="order_comment" id="order_comment"></Input>
      <FieldName
        style={{
          fontWeight: 'normal',
          color: 'rgb(254, 111, 103,0.8)'
        }}
      >
        {(formData.order_comment.minLengthError) || (formData.order_comment.maxLengthError) ?
          formData.order_comment.errorMessage :
          ''
        }
      </FieldName>
    </VerticalContainer>


  )
}

export default OrderComment
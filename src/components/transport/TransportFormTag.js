import React from 'react'
import { useInput } from '../../hooks/useInput'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'

const TransportFormTag = ({formData}) => {

    formData.tag = useInput('', { isEmpty: true, minLength: 4, maxLength: 12 }, '')

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input value={formData.tag.value}
                placeholder='Название или государственный знак'
                onChange={(e) => formData.tag.onChange(e)}
                onBlur={e => formData.tag.onBlur(e)}
                style={{ borderLeft: (formData.tag.notValid || formData.tag.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                name="tag" id="tag"
            ></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.tag.isEmpty && formData.tag.isDirty) || (formData.tag.minLengthError) || (formData.tag.maxLengthError) ?
                    formData.tag.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default TransportFormTag
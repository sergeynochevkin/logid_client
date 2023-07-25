import React, { useContext, useEffect } from 'react'
import { useInput } from '../../hooks/useInput'
import { Input } from '../ui/form/Input'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { TranslateContext } from '../..'

const TransportFormTag = observer(({ formData, setError,error }) => {
    const { Translate } = useContext(TranslateContext)

    formData.tag = useInput('', { isEmpty: true, minLength: 4, maxLength: 20 }, SetNativeTranslate(Translate.language, {
        russian: ['Метка'],
        english: ['Tag']
    }))



    useEffect(() => {
        formData.tag.notValid ? setError({ ...error, tag: true }) : setError({ ...error, tag: false })
    }, [formData.tag.notValid])

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input value={formData.tag.value}
                placeholder={SetNativeTranslate(Translate.language, {}, 'transport_tag')}
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
})

export default TransportFormTag
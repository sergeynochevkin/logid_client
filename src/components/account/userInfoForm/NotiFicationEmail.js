import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const NotificationEmail =  ({ formData, setFormData }) => {

    const { Translate } = useContext(TranslateContext)

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={SetNativeTranslate(Translate.language,{},'your_email')}
                value={formData.email.value}
                style={{ borderLeft: (formData.email.notValid || formData.email.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                onChange={(e) => formData.email.onChange(e)}
                onBlur={e => formData.email.onBlur(e)}
                type="text" name="email" id="email"
            ></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.email.isEmpty && formData.email.isDirty) || (formData.email.minLengthError) || (formData.email.maxLengthError) || (formData.email.formatError) ?
                    formData.email.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default NotificationEmail
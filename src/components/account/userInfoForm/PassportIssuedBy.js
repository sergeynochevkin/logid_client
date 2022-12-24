import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const PassportIssuedBy = ({ formData, setFormData }) => {

    const { Translate } = useContext(TranslateContext)

    return (
        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={SetNativeTranslate(Translate.language,{}, 'passport_issued_by_place_holder')}
                value={formData.passport_issued_by.value}
                onChange={(e) => formData.passport_issued_by.onChange(e)}
                onBlur={e => formData.passport_issued_by.onBlur(e)}
                type="text" name="passport_issued_by" id='passport_issued_by'
                style={{ borderLeft: formData.passport_issued_by.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
            ></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.passport_issued_by.isEmpty && formData.passport_issued_by.isDirty) || (formData.passport_issued_by.minLengthError) || (formData.passport_issued_by.maxLengthError) ?
                    formData.passport_issued_by.errorMessage :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default PassportIssuedBy
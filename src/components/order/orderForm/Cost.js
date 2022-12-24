import { observer } from 'mobx-react-lite'
import React from 'react'
import { useContext } from 'react'
import { AdressContext, TranslateContext } from '../../..'
import { useInput } from '../../../hooks/useInput'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const Cost = ({ formData, setFormData }) => {
    const {Adress} = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)

    return (

        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={`${SetNativeTranslate(Translate.language,{},'cost')} ${Adress.country.currency}`} value={formData
                .cost.value}

                style={{ borderLeft: ((formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_type.value === 'order' && formData.cost.isEmpty)) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                onChange={(e) => formData.cost.onChange(e)}
                onBlur={e => formData.cost.onBlur(e)}

                type={formData.cost.isEmpty ? 'text' : 'number'} name="cost" id="cost"></Input>
            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.cost.minLengthError) || (formData.cost.maxLengthError) || (formData.cost.formatError) ?
                    formData.cost.errorMessage :
                    formData.order_type.value === 'order' && formData.cost.isEmpty && formData.cost.isDirty  ? SetNativeTranslate(Translate.language,{},'cost_required') :
                    ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default Cost
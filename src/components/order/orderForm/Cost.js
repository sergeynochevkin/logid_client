import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useContext } from 'react'
import { AdressContext, TranslateContext } from '../../..'
import { useInput } from '../../../hooks/useInput'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'
import { CardButton } from '../../ui/button/CardButton'
import RecommendCost from './RecommendCost'

const Cost = ({ formData, setFormData, setCalculate, recommended, setRecommended }) => {
    const { Adress } = useContext(AdressContext)
    const { Translate } = useContext(TranslateContext)


    return (

        <VerticalContainer
            style={{ gap: '0px' }}
        >
            <Input placeholder={`${SetNativeTranslate(Translate.language, {}, 'cost')} ${Adress.country.currency}`} value={formData
                .cost.value}

                style={{ borderLeft: ((formData.cost.notValid && !formData.cost.isEmpty) || (formData.order_type.value === 'order' && formData.cost.isEmpty)) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                onChange={(e) => {
                    formData.cost.onChange(e);
                    setRecommended(false)
                }}
                onBlur={e => formData.cost.onBlur(e)}

                type={formData.cost.isEmpty ? 'text' : 'number'} name="cost" id="cost">
            </Input>
            {Adress.country.value === 'russia' &&
                <RecommendCost recommended={recommended} setCalculate={setCalculate} />
            }

            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'green'
                }}
            >
                {recommended ? 
                    SetNativeTranslate(Translate.language, {
                        russian: [`указана рекомендованная стоимость, вы можете ее изменить`],
                        english: [`the recommended price is indicated, you can change it`],
                        spanish: [`el precio recomendado está indicado, puedes cambiarlo.`],
                        turkish: [`tavsiye edilen fiyat belirtilmiştir, değiştirebilirsiniz`],
                        сhinese: [`已标明建议价格，您可以更改`],
                        hindi: [`अनुशंसित मूल्य दर्शाया गया है, आप इसे बदल सकते हैं`],
                    })
                 : ''}
            </FieldName>

            <FieldName
                style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                }}
            >
                {(formData.cost.minLengthError) || (formData.cost.maxLengthError) || (formData.cost.formatError) ?
                    formData.cost.errorMessage :
                    formData.order_type.value === 'order' && formData.cost.isEmpty && formData.cost.isDirty ? SetNativeTranslate(Translate.language, {}, 'cost_required') :
                        ''
                }
            </FieldName>
        </VerticalContainer>
    )
}

export default Cost
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { TranslateContext } from '../../..'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const Password = ({ authFormData, setAuthFormData , comparePassword, setComparePassword}) => {
    const{Translate} = useContext(TranslateContext)
    const [comparePasswordActive, setComparePasswordActive] = useState(false)
    const password_hint = SetNativeTranslate(Translate.language,{},'password_hint')
    const Password = SetNativeTranslate(Translate.language,{},'password')
    const compare_passwords = SetNativeTranslate(Translate.language,{},'compare_passwords')
    const password_repeat = SetNativeTranslate(Translate.language,{},'password_repeat')

    return (
        <VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={Password}
                    style={{ borderLeft: authFormData.password.notValid || authFormData.password.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    value={authFormData.password.value}
                    onChange={(e) => authFormData.password.onChange(e)} onBlur={e => authFormData.password.onBlur(e)} type="password" name="password" id="password"
                ></Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {(authFormData.password.isEmpty && authFormData.password.isDirty) || (authFormData.password.minLengthError) || (authFormData.password.maxLengthError) ?
                        authFormData.password.errorMessage : (authFormData.password.formatError) ? password_hint :
                            ''
                    }
                </FieldName>
            </VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder={password_repeat} value={comparePassword} onChange={(e) => {
                    setComparePassword(e.target.value)
                    setComparePasswordActive(true)
                }}
                    style={{ borderLeft: authFormData.password.value !== comparePassword || !comparePassword ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    onBlur={e => authFormData.password.onBlur(e)}
                    type="password"></Input>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}
                >
                    {authFormData.password.value !== comparePassword && comparePasswordActive && !authFormData.password.isEmpty ?
                        compare_passwords : ''
                    }
                </FieldName>
            </VerticalContainer>
        </VerticalContainer>
    )
}

export default Password
import React, { useState } from 'react'
import { Input } from '../../ui/form/Input'
import { FieldName } from '../../ui/page/FieldName'
import { VerticalContainer } from '../../ui/page/VerticalContainer'

const Password = ({ authFormData, setAuthFormData }) => {
    const [comparePassword, setComparePassword] = useState('')
    const [comparePasswordActive, setComparePasswordActive] = useState(false)



    return (
        <VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder="Ваш пароль"
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
                    {(authFormData.password.isEmpty && authFormData.password.isDirty) || (authFormData.password.minLengthError) || (authFormData.password.maxLengthError) || (authFormData.password.formatError) ?
                        authFormData.password.errorMessage :
                        ''
                    }
                </FieldName>
            </VerticalContainer>
            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Input placeholder="Пароль еще раз" value={comparePassword} onChange={(e) => {
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
                        'пароли не совпадают' : ''
                    }
                </FieldName>
            </VerticalContainer>
        </VerticalContainer>
    )
}

export default Password
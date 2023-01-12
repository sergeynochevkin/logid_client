import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext } from '../..'
import PersonalDataAgreementRussia from './PersonalDataAgreementRussia'
import PrivacyPolicyRussia from './PrivacyPolicyRussia'
import UserAgreementRussia from './UserAgreementRussia'

const Agreement = observer(() => {

    const { ComponentFunction } = useContext(ComponentFunctionContext)

    return (
        <>
            {
                ComponentFunction.agreement === 'UserAgeement' ? <UserAgreementRussia /> :
                    ComponentFunction.agreement === 'PersonalDataAgreement' ? <PersonalDataAgreementRussia /> :
                        ComponentFunction.agreement === 'PrivacyPolicy' ? <PrivacyPolicyRussia /> : <></>
            }
        </>

    )
})

export default Agreement
import { observer } from 'mobx-react-lite'
import React, { Suspense, useContext } from 'react'
import { ComponentFunctionContext } from '../..'
import './Legality.css'

// import UserAgreementRussia from './UserAgreementRussia'
// import PersonalDataAgreementRussia from './PersonalDataAgreementRussia'
// import PrivacyPolicyRussia from './PrivacyPolicyRussia'

const PersonalDataAgreementRussia = React.lazy(() => import('./PersonalDataAgreementRussia'))
const PrivacyPolicyRussia = React.lazy(() => import('./PrivacyPolicyRussia'))
const UserAgreementRussia = React.lazy(() => import('./UserAgreementRussia'))


const Agreement = observer(() => {

    const { ComponentFunction } = useContext(ComponentFunctionContext)

    return (
        <>
            {
                ComponentFunction.agreement === 'UserAgeement' ? <Suspense><UserAgreementRussia /></Suspense> :
                    ComponentFunction.agreement === 'PersonalDataAgreement' ? <Suspense><PersonalDataAgreementRussia /></Suspense> :
                        ComponentFunction.agreement === 'PrivacyPolicy' ? <Suspense><PrivacyPolicyRussia /></Suspense> : <></>
            }
        </>

    )
})

export default Agreement
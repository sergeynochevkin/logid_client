import { observer } from 'mobx-react-lite'
import React, { Suspense, useContext, useEffect } from 'react'
import { ComponentFunctionContext, SettingContext } from '../..'
import './Legality.css'
import { useLocation } from 'react-router-dom'
import PageFallBack from '../ui/loader/PageFallBack'

// import UserAgreementRussia from './UserAgreementRussia'
// import PersonalDataAgreementRussia from './PersonalDataAgreementRussia'
// import PrivacyPolicyRussia from './PrivacyPolicyRussia'

const PersonalDataAgreementRussia = React.lazy(() => import('./PersonalDataAgreementRussia'))
const PrivacyPolicyRussia = React.lazy(() => import('./PrivacyPolicyRussia'))
const UserAgreementRussia = React.lazy(() => import('./UserAgreementRussia'))


const Agreement = observer(() => {
    let location = useLocation()

    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const{Setting} = useContext(SettingContext)

    useEffect(() => {
        location.pathname === '/privacy_policy' && ComponentFunction.setAgreement('PrivacyPolicy')
        location.pathname === '/user_agreement' && ComponentFunction.setAgreement('UserAgeement')
    }, [])

    return (
        <div className={location.pathname === '/privacy_policy' || location.pathname === '/user_agreement' ? `page_container ${Setting.app_theme}` : ''}>
            {
                ComponentFunction.agreement === 'UserAgeement' ? <Suspense fallback={<PageFallBack />}><UserAgreementRussia /></Suspense> :
                    ComponentFunction.agreement === 'PersonalDataAgreement' ? <Suspense fallback={<PageFallBack />}><PersonalDataAgreementRussia /></Suspense> :
                        ComponentFunction.agreement === 'PrivacyPolicy' ? <Suspense fallback={<PageFallBack />}><PrivacyPolicyRussia /></Suspense> : <></>
            }
        </div>

    )
})

export default Agreement
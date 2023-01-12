import React from 'react'
import PersonalDataAgreementRussia from './PersonalDataAgreementRussia'
import PrivacyPolicyRussia from './PrivacyPolicyRussia'
import UserAgreementRussia from './UserAgreementRussia'

const Agreement = ({ agreement }) => {
    return (
        <>
            {
                agreement === 'UserAgeement' ? <UserAgreementRussia /> :
                    agreement === 'PersonalDataAgreement' ? <PersonalDataAgreementRussia /> :
                        agreement === 'PrivacyPolicy' ? <PrivacyPolicyRussia /> : <></>
            }
        </>

    )
}

export default Agreement
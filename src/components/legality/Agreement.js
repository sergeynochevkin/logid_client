import React from 'react'
import PersonalDataAgreement from './PersonalDataAgreement'
import PrivacyPolicy from './PrivacyPolicy'
import UserAgreementRussia from './UserAgreementRussia'

const Agreement = ({ agreement }) => {
    return (
        <>
            {
                agreement === 'UserAgeement' ? <UserAgreementRussia /> :
                    agreement === 'PersonalDataAgreement' ? <PersonalDataAgreement /> :
                        agreement === 'PrivacyPolicy' ? <PrivacyPolicy /> : <></>
            }
        </>

    )
}

export default Agreement
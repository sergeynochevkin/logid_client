import React from 'react'
import PersonalDataAgreement from './PersonalDataAgreement'
import PrivacyPolicy from './PrivacyPolicy'
import UserAgreement from './UserAgreement'

const Agreement = ({ agreement }) => {
    return (
        <>
            {
                agreement === 'UserAgeement' ? <UserAgreement /> :
                    agreement === 'PersonalDataAgreement' ? <PersonalDataAgreement /> :
                        agreement === 'PrivacyPolicy' ? <PrivacyPolicy /> : <></>
            }
        </>

    )
}

export default Agreement
import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import OtherRatingModalContent from './OtherRatingModalContent'
import { CardColName } from '../ui/card/CardColName'
import Modal from '../ui/modal/Modal'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { SetTranslate } from '../../modules/SetTranslate'
import { UserContext, UserInfoContext } from '../..'

const OtherRatingComponent = observer(({ onePartnerInfo, onePartnerOtherRatingByThisUserInfo, setFetchPartnersStart, onePartner }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)

    const [modalActive, setModalActive] = useState(false)

    const initialState = {
        raterUserInfoId: undefined,
        ratedUserInfoId: undefined,
        solvency: onePartnerOtherRatingByThisUserInfo ? onePartnerOtherRatingByThisUserInfo.solvency : '',
        role: user.user.role
    }

    const [formData, setFormData] = useState(initialState)

    const formReset = () => {
        setFormData(initialState)
    }

    return (
        <>
            {user.user.role === 'carrier' && onePartnerOtherRatingByThisUserInfo ?
                <HorizontalContainer>
                    <CardColName
                        style={{ cursor: 'pointer' }}

                        onClick={(event) => {
                            event.stopPropagation()
                            setModalActive(true)
                        }}
                    >
                        {onePartnerOtherRatingByThisUserInfo.solvency === 0 ? SetTranslate('rate_solvency') : SetTranslate('change_solvency')}
                    </CardColName>
                    <div>{onePartnerOtherRatingByThisUserInfo.solvensy}</div>

                </HorizontalContainer>
                : <></>}

            <Modal
                modalActive={modalActive}
                setModalActive={setModalActive}
                parent={'otherRatingComponent'}
                formReset={formReset}
            >
                <OtherRatingModalContent formReset={formReset} formData={formData} setFormData={setFormData} setModalActive={setModalActive} UserInfo={UserInfo} onePartnerInfo={onePartnerInfo} setFetchPartnersStart={setFetchPartnersStart} onePartnerOtherRatingByThisUserInfo={onePartnerOtherRatingByThisUserInfo} onePartner={onePartner} />
            </Modal>
        </>
    )
})

export default OtherRatingComponent
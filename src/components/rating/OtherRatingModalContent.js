import { observer } from 'mobx-react-lite'
import React from 'react'
import { updateOtherRating } from '../http/ratingApi'
import { CardButton } from './ui/button/CardButton'
import { CardColName } from './ui/card/CardColName'
import { CardRow } from './ui/card/CardRow'
import { VerticalContainer } from './ui/page/VerticalContainer'
import { v4 } from "uuid";
import { NotificationContext, UserContext } from '../index'
import { useContext } from 'react'
import { SetTranslate } from '../../modules/SetTranslate'

const OtherRatingModalContent = observer(({ formData, setFormData, setModalActive, onePartnerInfo, UserInfo, setFetchPartnersStart, onePartner, onePartnerOtherRatingByThisUserInfo, formReset }) => {
    const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)
    formData.raterUserInfoId = UserInfo.userInfo.id
    formData.ratedUserInfoId = onePartnerInfo.id
    const rated_customer_solvency = SetTranslate('rated_customer_solvency')
    const rated_carrier_solvency = SetTranslate('rated_carrier_solvency')

    const click = async () => {
        try {
            let data;
            data = await updateOtherRating(
                formData
            )
            Notification.addNotification([{ id: v4(), type: 'success', message: `${user.user.role === 'carrier' ? rated_customer_solvency : rated_carrier_solvency}` }])
            setFetchPartnersStart(true)
            setModalActive(false)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <VerticalContainer>
            <CardRow>
                <CardColName>{onePartnerInfo.id}</CardColName>
                <CardColName
                    style={{
                        backgroundColor: onePartner.status === 'normal' ? 'rgb(241,196,15,0.8)' :
                            onePartner.status === 'priority' ? 'rgb(129, 199, 132,0.8)' :
                                onePartner.status === 'blocked' ? 'rgb(254, 111, 103,0.8)' : ''
                    }}
                >
                    {onePartnerInfo.legal === 'person' ?
                        <>{onePartnerInfo.name_surname_fathersname}</>
                        :
                        <>{onePartnerInfo.company_name}</>
                    }
                </CardColName>

            </CardRow>
            <CardRow>
                <CardColName>{SetTranslate('solvency')}</CardColName>
                {ratingScale.map(grade =>
                    <CardColName
                        value={formData.solvency}
                        onClick={() => {
                            setFormData({ ...formData, solvency: grade })
                        }}
                        key={grade}

                        style={{
                            cursor: formData.solvency !== grade ? 'pointer' : 'default',
                            backgroundColor: formData.solvency === grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>
            <CardRow>
                <CardButton
                    onClick={click}
                >{SetTranslate('rate')}</CardButton>
                <CardButton
                    onClick={() => {
                        setModalActive(false)
                        formReset()
                    }}
                >{SetTranslate('close')}</CardButton>
            </CardRow>

        </VerticalContainer>
    )
})

export default OtherRatingModalContent
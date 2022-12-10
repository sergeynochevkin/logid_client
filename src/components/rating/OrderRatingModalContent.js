import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { TranslateContext, UserContext, UserInfoContext } from '../..'
import { createOrderRating } from '../../http/ratingApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'
import { SetTranslate } from '../../modules/SetTranslate'

const OrderRatingModalContent = observer(({ setModalActive, formData, setFormData, setFetchStart, oneOrder, setFetchPartnersStart, formReset }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)
    const rated_carrier = SetTranslate(Translate.language, 'rated_carrier')
    const rated_customer = SetTranslate(Translate.language, 'rated_customer')
    const on_order = SetTranslate(Translate.language, 'on_order')
    const on_auction = SetTranslate(Translate.language, 'on_auction')

    const ratingScale = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    formData.orderId = oneOrder.id
    formData.raterUserInfoId = UserInfo.userInfo.id
    user.user.role === 'customer' ? formData.ratedUserInfoId = oneOrder.carrierId :
        user.user.role === 'carrier' ? formData.ratedUserInfoId = oneOrder.userInfoId : formData.ratedUserInfoId = undefined

    const click = async () => {
        try {
            let data;
            data = await createOrderRating(
                formData
            ).then(
                Notification.addNotification([{ id: v4(), type: 'success', message: `${user.user.role === 'carrier' ? rated_customer : rated_carrier} ${oneOrder.order_type === 'order' ? on_order : on_auction} ${oneOrder.id}` }])
            ).then(formReset())
            setFetchStart(true)
            setFetchPartnersStart(true)
            setModalActive(false)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <VerticalContainer>
            <CardRow>
                <CardColName>{SetTranslate(Translate.language, 'politeness')}</CardColName>
                {ratingScale.map(grade =>
                    <CardColName
                        value={formData.politeness}
                        onClick={() => {
                            setFormData({ ...formData, politeness: grade })
                        }}
                        key={grade}

                        style={{
                            cursor: formData.politeness !== grade ? 'pointer' : 'default',
                            backgroundColor: formData.politeness === grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>


            <CardRow>
                <CardColName>
                    {user.user.role === 'carrier' ? SetTranslate(Translate.language, 'no_downtime') :
                        user.user.role === 'customer' ? SetTranslate(Translate.language, 'submission_fulfillment') : ''}
                </CardColName>
                {ratingScale.map(grade =>
                    <CardColName
                        value={formData.in_time}
                        onClick={() => {
                            setFormData({ ...formData, in_time: grade })
                        }}
                        key={grade}

                        style={{
                            cursor: formData.in_time !== grade ? 'pointer' : 'default',
                            backgroundColor: formData.in_time === grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>


            <CardRow>
                <CardColName>
                    {user.user.role === 'carrier' ? SetTranslate(Translate.language, 'loading_unloading') :
                        user.user.role === 'customer' ? SetTranslate(Translate.language, 'transport_quality') : ''}
                </CardColName>
                {ratingScale.map(grade =>
                    <CardColName
                        value={formData.facilities}
                        onClick={() => {
                            setFormData({ ...formData, facilities: grade })
                        }}
                        key={grade}

                        style={{
                            cursor: formData.facilities !== grade ? 'pointer' : 'default',
                            backgroundColor: formData.facilities === grade ? 'rgb(255, 186, 65, 0.8)' : 'lightgray',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>
            <CardRow>
                <CardButton
                    disabled={!formData.politeness || !formData.facilities || !formData.in_time}
                    onClick={click}
                >{SetTranslate(Translate.language, 'rate')}</CardButton>
                <CardButton
                    onClick={() => {
                        setModalActive(false)
                        formReset()
                    }}
                >{SetTranslate(Translate.language, 'close')}</CardButton>
            </CardRow>
        </VerticalContainer>
    )
})

export default OrderRatingModalContent
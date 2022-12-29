import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { FetcherContext, NotificationContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { v4 } from "uuid";
import { VerticalContainer } from '../ui/page/VerticalContainer';
import { CardColName } from '../ui/card/CardColName';
import { CardRow } from '../ui/card/CardRow';
import { CardButton } from '../ui/button/CardButton';
import { createOrderRating } from '../../http/ratingApi';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';

const OrderRatingModalContent = observer(({ setModalActive, formData, setFormData, setFetchStart, oneOrder, formReset }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)
    const rated_carrier = SetNativeTranslate(Translate.language,{}, 'rated_carrier')
    const rated_customer = SetNativeTranslate(Translate.language,{}, 'rated_customer')
    const on_order = SetNativeTranslate(Translate.language,{}, 'on_order')
    const on_auction = SetNativeTranslate(Translate.language,{}, 'on_auction')
    const { fetcher } = useContext(FetcherContext)
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
            fetcher.setPartners(true)
            setModalActive(false)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <VerticalContainer>
            <CardRow>
                <CardColName>{SetNativeTranslate(Translate.language,{}, 'politeness')}</CardColName>
                {ratingScale.map(grade =>
                    <CardColName
                        value={formData.politeness}
                        onClick={() => {
                            setFormData({ ...formData, politeness: grade })
                        }}
                        key={grade}

                        style={{
                            cursor: formData.politeness !== grade ? 'pointer' : 'default',
                            backgroundColor: formData.politeness === grade ? 'rgb(255, 186, 65, 0.8)' : '',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>


            <CardRow>
                <CardColName>
                    {user.user.role === 'carrier' ? SetNativeTranslate(Translate.language,{}, 'no_downtime') :
                        user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{}, 'submission_fulfillment') : ''}
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
                            backgroundColor: formData.in_time === grade ? 'rgb(255, 186, 65, 0.8)' : '',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>


            <CardRow>
                <CardColName>
                    {user.user.role === 'carrier' ? SetNativeTranslate(Translate.language,{}, 'loading_unloading') :
                        user.user.role === 'customer' ? SetNativeTranslate(Translate.language,{}, 'transport_quality') : ''}
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
                            backgroundColor: formData.facilities === grade ? 'rgb(255, 186, 65, 0.8)' : '',
                            padding: '5px'
                        }}
                    >{grade}</CardColName>
                )}
            </CardRow>
            <CardRow>
                <CardButton
                    disabled={!formData.politeness || !formData.facilities || !formData.in_time}
                    onClick={click}
                >{SetNativeTranslate(Translate.language,{}, 'rate')}</CardButton>
                <CardButton
                    onClick={() => {
                        setModalActive(false)
                        formReset()
                    }}
                >{SetNativeTranslate(Translate.language,{}, 'close')}</CardButton>
            </CardRow>
        </VerticalContainer>
    )
})

export default OrderRatingModalContent
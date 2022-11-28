import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { UserContext, UserInfoContext } from '../..'
import { createOrderRating } from '../../http/ratingApi'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import { CardRow } from '../ui/card/CardRow'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'

const OrderRatingModalContent = observer(({ setModalActive, formData, setFormData, setFetchStart, oneOrder, setFetchPartnersStart, formReset }) => {
    const { UserInfo } = useContext(UserInfoContext)
    const { user } = useContext(UserContext)
    const { Notification } = useContext(NotificationContext)

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
                Notification.addNotification([{ id: v4(), type: 'success', message: `Вы оценили ${user.user.role === 'carrier' ? 'заказчика' : 'перевозчика'} по ${oneOrder.order_type === 'order' ? `заказу` : `аукциону`} ${oneOrder.id}` }])
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
                <CardColName>Вежливость</CardColName>
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
                    {user.user.role === 'carrier' ? 'Отсутствие простоя по вине заказчика' :
                        user.user.role === 'customer' ? 'Своевременная подача и выполнение' : ''}
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
                    {user.user.role === 'carrier' ? 'Организация погрузки и выгрузки' :
                        user.user.role === 'customer' ? 'Качество транспорта' : ''}
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
                disabled = {!formData.politeness || !formData.facilities || !formData.in_time}
                    onClick={click}
                >Оценить</CardButton>
                <CardButton
                    onClick={() => {
                        setModalActive(false)
                        formReset()
                    }}
                >Закрыть</CardButton>
            </CardRow>
        </VerticalContainer>
    )
})

export default OrderRatingModalContent
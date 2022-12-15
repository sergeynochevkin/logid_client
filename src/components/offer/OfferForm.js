import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { setTime } from '../../modules/setTime'
import { useInput } from '../../hooks/useInput'
import { createOffer, deleteOffer, updateOffer } from '../../http/offerApi'
import { CardButton } from '../ui/button/CardButton'
import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Label } from '../ui/form/Label'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { Smaller } from '../ui/text/Smaller'
import { v4 } from "uuid";
import { AdressContext, NotificationContext, TranslateContext, UserContext } from '../../index'
import { sendMail } from '../../http/mailApi'
import { SetTranslate } from '../../modules/SetTranslate'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const Container = styled.div`
display:flex;
flex-direction:column;
gap: 5px;
align-items:center;
`

const OfferForm = observer(({ setModalActive, UserInfo, oneOrder, formData, setFormData, thisCarrierOffer, setFetchStart, firstPoint, formReset }) => {
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)
    formData.userInfoId = oneOrder.userInfoId
    formData.carrierId = UserInfo.userInfo.id
    formData.orderId = oneOrder.id
    thisCarrierOffer ? formData.this_carrier_offer_id = thisCarrierOffer.id : formData.this_carrier_offer_id = undefined

    const validCost = /^\d+$/

    formData.time_from = useInput(thisCarrierOffer ? setTime(new Date(thisCarrierOffer.time_from), 0, 'form') : firstPoint ? setTime(new Date(firstPoint.time), 0, 'form') : '', { isEmpty: true }, SetTranslate('arrival_time_field_name').toLowerCase())
    formData.cost = useInput(thisCarrierOffer ? thisCarrierOffer.cost : '', { isEmpty: true, minLength: 2, maxLength: 6, validFormat: validCost }, SetTranslate('cost').toLowerCase())
    formData.carrier_comment = useInput(thisCarrierOffer ? thisCarrierOffer.carrier_comment : '', { isEmpty: true, minLength: 8, maxLength: 20 }, SetTranslate('comment').toLowerCase())

    const click = async (event) => {
        try {
            event.preventDefault();
            if (thisCarrierOffer) {
                await updateOffer(
                    formData
                )
                await sendMail(user.user.role, oneOrder.id, 'offer', 'update')
                Notification.addNotification([{
                    id: v4(), type: 'success', message: SetNativeTranslate(
                        Translate.language, {
                        russian: ['Вы изменили предложение к', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id],
                        english: ['You have changed the offer to the', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id]
                    }
                    )
                }])
                formReset()
            } else {
                await createOffer(
                    formData
                )
                sendMail(user.user.role, oneOrder.id, 'offer', 'create')
                Notification.addNotification([{
                    id: v4(), type: 'success', message: SetNativeTranslate(
                        Translate.language, {
                        russian: ['Вы сделали предложение к', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id],
                        english: ['You have made an offer to the', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id]
                    }
                    )
                }])
            }
            setModalActive(false)
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
            setModalActive(false)
            formReset()
        }
    }

    const delOffer = async (event) => {
        try {
            event.preventDefault();
            await deleteOffer(thisCarrierOffer.id).then(sendMail(user.user.role, oneOrder.id, 'offer', 'delete'))
            setFetchStart(true)
            setModalActive(false)
            Notification.addNotification([{
                id: v4(), type: 'success', message: SetNativeTranslate(
                    Translate.language, {
                    russian: ['Вы удалили предложение к', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id],
                    english: ['You have deleted an offer to the', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id]
                }
                )
            }])
            formReset()
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container>
            <Form>
                <Smaller>{SetNativeTranslate(
                    Translate.language, {
                    russian: ['Ваше предложение'],
                    english: ['Your offer']
                }
                )}</Smaller>
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input placeholder={`${SetTranslate('cost')} ${Adress.country.currency}`} value={formData
                        .cost.value}
                        onChange={(e) => formData.cost.onChange(e)}
                        onBlur={e => formData.cost.onBlur(e)}
                        style={{ borderLeft: (formData.cost.notValid || formData.cost.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                        type="text" name="cost" id="cost"></Input>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}>
                        {(formData.cost.isEmpty && formData.cost.isDirty) || (formData.cost.minLengthError) || (formData.cost.maxLengthError) || formData.cost.formatError ?
                            formData.cost.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>

                <Label>{SetTranslate('arrival_time_field_name')}</Label>
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input placeholder={SetTranslate('arrival_time_field_name')} value={formData
                        .time_from.value}

                        onChange={(e) => formData.time_from.onChange(e)}
                        onBlur={e => formData.time_from.onBlur(e)}
                        style={{ borderLeft: (formData.time_from.notValid || formData.time_from.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}

                        name="time_from"
                        type="datetime-local"
                        id="time_from">
                    </Input>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}>
                        {(formData.time_from.isEmpty && formData.time_from.isDirty) ?
                            formData.time_from.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>

                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input placeholder={SetNativeTranslate(
                        Translate.language, {
                        russian: ['Комментарий к предложению'],
                        english: ['Comment on the offer']
                    }
                    )} value={formData
                        .carrier_comment.value}
                        onChange={(e) => formData.carrier_comment.onChange(e)}
                        onBlur={e => formData.carrier_comment.onBlur(e)}
                        style={{ borderLeft: (formData.carrier_comment.notValid && !formData.carrier_comment.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                        type="text" name="carrier_comment" id="carrier_comment">
                    </Input>
                    <FieldName
                        style={{
                            fontWeight: 'normal',
                            color: 'rgb(254, 111, 103,0.8)'
                        }}>
                        {(formData.carrier_comment.minLengthError) || (formData.carrier_comment.maxLengthError) ?
                            formData.carrier_comment.errorMessage :
                            ''
                        }
                    </FieldName>
                </VerticalContainer>

            </Form>
            <div>
                <CardButton onClick={click}
                    disabled={(formData.carrier_comment.notValid && !formData.carrier_comment.isEmpty) || formData.cost.notValid || formData.time_from.notValid}
                >{thisCarrierOffer ? SetTranslate('edit') : SetTranslate('send')}</CardButton>
                {thisCarrierOffer ?
                    <CardButton
                        onClick={delOffer}
                    >{SetTranslate('delete')}</CardButton>
                    : <></>}
                <CardButton onClick={() => {
                    setModalActive(false);
                    setFormData({});
                    formReset()
                }}>{SetTranslate('close')}</CardButton>
            </div>
        </Container>
    )
})

export default OfferForm
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
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
import { AdressContext, FetcherContext, NotificationContext, TranslateContext, TransportContext, UserContext } from '../../index'
import { sendMail } from '../../http/mailApi'
import './Offer.css'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import TransportOfferSelectorItem from './TransportOfferSelectorItem'

const Container = styled.div`
display:flex;
flex-direction:column;
gap: 5px;
align-items:center;
`

const OfferForm = observer(({ setModalActive, UserInfo, oneOrder, formData, setFormData, thisCarrierOffer, firstPoint, formReset }) => {
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)
    const { Translate } = useContext(TranslateContext)
    const { Adress } = useContext(AdressContext)
    const { fetcher } = useContext(FetcherContext)
    const { Transport } = useContext(TransportContext)
    formData.userInfoId = oneOrder.userInfoId
    formData.carrierId = UserInfo.userInfo.id
    formData.orderId = oneOrder.id
    thisCarrierOffer ? formData.this_carrier_offer_id = thisCarrierOffer.id : formData.this_carrier_offer_id = undefined


    const validCost = /^\d+$/

    formData.time_from = useInput(thisCarrierOffer ? setTime(new Date(thisCarrierOffer.time_from), 0, 'form') : firstPoint ? setTime(new Date(firstPoint.time), 0, 'form') : '', { isEmpty: true }, SetNativeTranslate(Translate.language, {}, 'arrival_time_field_name').toLowerCase())
    formData.cost = useInput(thisCarrierOffer ? thisCarrierOffer.cost : '', { isEmpty: true, minLength: 2, maxLength: 6, validFormat: validCost }, SetNativeTranslate(Translate.language, {}, 'cost').toLowerCase())
    formData.carrier_comment = useInput(thisCarrierOffer ? thisCarrierOffer.carrier_comment : '', { isEmpty: true, minLength: 8, maxLength: 70 }, SetNativeTranslate(Translate.language, {}, 'comment').toLowerCase())

    useEffect(() => {
        formData.transportid = thisCarrierOffer ? thisCarrierOffer.transportid : Transport.transports.filter(el => el.type === oneOrder.type).length === 1 ? Transport.transports.filter(el => el.type === oneOrder.type).id : undefined
    }, [])

    // am i need it?
    useEffect(() => {
        if (oneOrder.order_status === 'new') {
            if (Transport.transports.filter(el => el.type === oneOrder.type).length === 1) {
                setFormData({ ...formData, transportid: Transport.transports.find(el => el.type === oneOrder.type).id })
            }
        }
    }, [])

    const click = async (event) => {
        try {
            event.preventDefault();
            if (thisCarrierOffer) {
                await updateOffer(
                    formData
                )
                await sendMail(Translate.language, user.user.role, oneOrder.id, 'offer', 'update')
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
                    Translate.language,
                    formData
                )
                sendMail(Translate.language, user.user.role, oneOrder.id, 'offer', 'create')
                Notification.addNotification([{
                    id: v4(), type: 'success', message: SetNativeTranslate(
                        Translate.language, {
                        russian: ['Вы сделали предложение к', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id],
                        english: ['You have made an offer to the', oneOrder.order_type === 'order' ? `закау` : `аукциону`, oneOrder.id]
                    }
                    )
                }])
            }
            fetcher.setOrdersNew(true)
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
            await deleteOffer(thisCarrierOffer.id).then(sendMail(Translate.language, user.user.role, oneOrder.id, 'offer', 'delete'))
            fetcher.setOrdersNew(true)
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
                    <Input placeholder={`${SetNativeTranslate(Translate.language, {}, 'cost')} ${Adress.country.currency}`} value={formData
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

                <Label>{SetNativeTranslate(Translate.language, {}, 'arrival_time_field_name')}</Label>
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input placeholder={SetNativeTranslate(Translate.language, {}, 'arrival_time_field_name')} value={formData
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

                    {Transport.transports.filter(el => el.type === oneOrder.type).length > 1 ?
                        <div className='transport_selector_container'>
                            <div className='transport_selector_header'>
                                {SetNativeTranslate(Translate.language,
                                    {
                                        russian: ['Выбeрите способ доставки'],
                                        english: ['Choose a shipping method']
                                    }
                                )}
                            </div>
                            <div className='transport_items_container'>
                                {Transport.transports.filter(el => el.type === oneOrder.type).map(item => <TransportOfferSelectorItem key={item.id} thisTransport={item} setFormData={setFormData} formData={formData} />)}
                            </div>

                        </div> : <></>
                    }


                </VerticalContainer>

            </Form>
            <div className='offer_modal_buttons_container'>
                <CardButton onClick={click}
                    disabled={(formData.carrier_comment.notValid && !formData.carrier_comment.isEmpty) || formData.cost.notValid || formData.time_from.notValid || formData.transportid === undefined}
                >{thisCarrierOffer ? SetNativeTranslate(Translate.language, {}, 'edit') : SetNativeTranslate(Translate.language, {}, 'send')}</CardButton>
                {thisCarrierOffer ?
                    <CardButton
                        onClick={delOffer}
                    >{SetNativeTranslate(Translate.language, {}, 'delete')}</CardButton>
                    : <></>}
                <CardButton onClick={() => {
                    setModalActive(false);
                    setFormData({});
                    formReset()
                }}>{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
            </div>
        </Container>
    )
})

export default OfferForm
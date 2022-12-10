import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { OrderContext, UserContext, UserInfoContext, SettingContext, TranslateContext } from '../..'
import { useInput } from '../../hooks/useInput'
import { updatePoint } from '../../http/pointApi'
import { CardButton } from '../ui/button/CardButton'
import { Input } from '../ui/form/Input'
import { Field } from '../ui/page/Field'
import { FieldName } from '../ui/page/FieldName'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'
import { SetTranslate } from '../../modules/SetTranslate'

const PointStatusForm = observer(({ setModalActive, onePoint, setPointFetchStart, formData, setFormData, formReset }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { Notification } = useContext(NotificationContext)
    const { order } = useContext(OrderContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    formData.role = user.user.role
    formData.carrier_comment = useInput('', { isEmpty: true, minLength: 3, maxLength: 20 }, SetTranslate(Translate.language,'comment'))

    const you_canceled = SetTranslate(Translate.language,'you_canceled')
    const you_postponed = SetTranslate(Translate.language,'you_postponed')
    const you_took = SetTranslate(Translate.language,'you_took')
    const you_restored = SetTranslate(Translate.language,'you_restored')
    const you_finished = SetTranslate(Translate.language,'you_finished')
    const last = SetTranslate(Translate.language,'last')
    const point = SetTranslate(Translate.language,'point')
    const of_order = SetTranslate(Translate.language,'of_order')



    const click = async (event) => {
        try {
            await updatePoint(
                formData.id,
                formData.status,
                formData.carrier_comment.value,
                formData.updated_by,
                formData.updated_time,
                formData.finished_time,
                formData.role
            )
            Notification.addNotification([{
                id: v4(), type: 'success', message: `${formData.status === 'postponed' ? you_postponed :
                    formData.status === 'canceled' ? you_canceled :
                        formData.status === 'inWork' ? you_took :
                            formData.status === 'new' ? you_restored : you_finished}
                            ${onePoint.sequence === 50 ? last : ''} ${point} ${onePoint.sequence !== 50 ? onePoint.sequence : ''} ${of_order} ${order.order.id}`
            }])
            setModalActive(false)
            setPointFetchStart(true)
            formReset()
        } catch (e) {
            alert(e.response.data.message)
        }
    }



    return (
        <VerticalContainer>
            <FieldName>{SetTranslate(Translate.language,'adress')}</FieldName>
            <Field style={{ cursor: 'default', backgroundColor: Setting.app_theme === 'dark' ? 'black' : '', border: Setting.app_theme === 'dark' ? 'none' : '' }}>{onePoint.point}</Field>


            {(onePoint.status !== 'completed' && onePoint.status !== 'canceled') && user.user.role !== 'customer' ?
                <VerticalContainer
                    style={{ gap: '0px' }}
                >
                    <Input placeholder='Комментарий'
                        value={formData.carrier_comment.value}
                        style={{ borderLeft: (formData.carrier_comment.notValid || formData.carrier_comment.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '', backgroundColor: Setting.app_theme === 'dark' ? 'black' : '', border: Setting.app_theme === 'dark' ? 'none' : '' }}
                        onChange={(e) => formData.carrier_comment.onChange(e)}
                        onBlur={e => formData.carrier_comment.onBlur(e)}
                    ></Input>
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
                :

                <></>}

            <HorizontalContainer>

                {onePoint.status === 'new' || onePoint.status === null || onePoint.status === 'inWork' || onePoint.status === 'postponed' ?
                    <CardButton onClick={() => {
                        formData.status = 'completed';
                        formData.updated_by = UserInfo.userInfo.id;
                        formData.finished_time = new Date();
                        click()
                    }}
                        disabled={formData.carrier_comment.minLengthError || formData.carrier_comment.maxLengthError}
                    >{SetTranslate(Translate.language,'finish')}</CardButton>
                    : <></>}

                {onePoint.status === null || onePoint.status === 'new' ?
                    <CardButton onClick={() => {
                        formData.status = 'postponed';
                        formData.updated_by = UserInfo.userInfo.id;
                        formData.updated_time = new Date();
                        click()
                    }}
                        disabled={formData.carrier_comment.notValid && user.user.role === 'carrier'}
                    >{SetTranslate(Translate.language,'postpone')}</CardButton>
                    : <></>}

                {onePoint.status === null || onePoint.status === 'new' || onePoint.status === 'postponed' ?
                    <CardButton onClick={() => {
                        if (formData.carrier_comment && user.user.role === 'carrier') {
                            formData.status = 'canceled';
                            formData.updated_by = UserInfo.userInfo.id;
                            formData.updated_time = new Date();
                            click()
                        } else if (user.user.role === 'customer') {
                            formData.status = 'canceled';
                            formData.updated_by = UserInfo.userInfo.id;
                            formData.updated_time = new Date();
                            click()
                        }
                        else (
                            Notification.addNotification([{
                                id: v4(), type: 'error', message: SetTranslate(Translate.language,'reason_of_cancellation')
                            }])
                        )
                    }}
                        disabled={formData.carrier_comment.notValid && user.user.role === 'carrier'}
                    >{SetTranslate(Translate.language,'cancel')}</CardButton>
                    : <></>}
                {onePoint.status === null || onePoint.status === 'new' || onePoint.status === 'postponed' ?
                    <><CardButton onClick={() => {
                        formData.status = 'inWork';
                        formData.updated_by = UserInfo.userInfo.id;
                        formData.updated_time = new Date();
                        click()
                    }}
                        disabled={formData.carrier_comment.minLengthError || formData.carrier_comment.maxLengthError}
                    >{SetTranslate(Translate.language,'take')}</CardButton>
                    </>
                    : <></>}
                {user.user.role === 'customer' && (onePoint.status === 'canceled' || onePoint.status === 'completed') ?
                    <CardButton onClick={() => {
                        formData.status = 'new';
                        formData.carrier_comment = ''
                        formData.updated_by = UserInfo.userInfo.id;
                        formData.updated_time = new Date();
                        formData.finished_time = new Date(0);
                        click()
                    }}>{SetTranslate(Translate.language,'restore')}</CardButton>
                    : <></>}

                <CardButton onClick={() => {
                    setModalActive(false)
                    formReset()
                }}>{SetTranslate(Translate.language,'close')}</CardButton>
            </HorizontalContainer>
        </VerticalContainer>
    )
})

export default PointStatusForm


import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { fetchUserInfo } from '../../http/userInfoApi'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import AccountItem from './AccountItem'
import { SetTranslate } from '../../modules/SetTranslate'
import RatingView from '../rating/RatingView'
import { FieldName } from '../ui/page/FieldName'
import Modal from '../ui/modal/Modal'
import SubscriptionForm from '../subscription/SubscriptionForm'
import SubscriptionStatusComponent from '../subscription/SubscriptionStatusComponent'
import { useFetching } from '../../hooks/useFetching'
import { fetchUser } from '../../http/userAPI'
import AccountActivationStatus from './AccountActivationStatus'
import './Account.css'


const Account = observer(({ setFetchPartnersStart }) => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [fetchStart, setFetchStart] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [passwordEditable, setPasswordEditable] = useState(false)
    const [loginEditable, setLoginEditable] = useState(false)
    const [cityEditable, setCityEditable] = useState(false)
    const [adressEditable, setAdressEditable] = useState(false)
    const { Setting } = useContext(SettingContext)

    const { Translate } = useContext(TranslateContext)

    const [fetching, error] = useFetching(async () => {
        await fetchUser(user.user.id).then(data => user.setUser(data))
        await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data))
        setFetchStart(false)
    })

    useEffect(() => {
        fetching()
    }, [fetchStart])

    const containerClassName = Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'

    return (<>
        {Translate.translation.length > 0 ?
            <HorizontalContainer
                style={{ marginTop: '10px', alignItems: 'flex-start' }}>
                <Modal modalActive={modalActive} setModalActive={setModalActive}>
                    <SubscriptionForm setFetchPartnersStart={setFetchPartnersStart} setModalActive={setModalActive} />
                </Modal>
                <VerticalContainer>
                    <AccountActivationStatus containerClassName={containerClassName} />
                    <div
                        className={containerClassName}>
                        <AccountItem fieldName='Электронная почта для авторизации' fieldValue={user.user.email} editable={true} attachedField={'authEmail'} setFetchStart={setFetchStart} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                        <AccountItem fieldName='Пароль' fieldValue={'****************'} editable={true} attachedField={'password'} setFetchStart={setFetchStart} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                    </div>
                    <div
                        className={containerClassName}>
                        <FieldName>Ваш рейтинг</FieldName>
                        <RatingView user={user} onePartnerInfo={UserInfo.userInfo} parent='account' />
                    </div>
                </VerticalContainer>
                <VerticalContainer>
                    <div
                        className={containerClassName}>
                        <AccountItem fieldName='id' fieldValue={UserInfo.userInfo.id} editable={false} />

                        <AccountItem fieldName='Фамилия, имя, отчество' fieldValue={UserInfo.userInfo.name_surname_fathersname} editable={true} attachedField={'name_surname_fathersname'} setFetchStart={setFetchStart} />

                        <AccountItem fieldName='Страна' fieldValue={SetTranslate(UserInfo.userInfo.country)} editable={false} attachedField={'country'} setFetchStart={setFetchStart} />
                        <AccountItem fieldName='Город' fieldValue={UserInfo.userInfo.city} editable={true} attachedField={'city'} setFetchStart={setFetchStart} setFetchPartnersStart={setFetchPartnersStart} cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable} />
                        {UserInfo.userInfo.phone ? <AccountItem fieldName='Телефон' fieldValue={UserInfo.userInfo.phone} editable={true} attachedField={'phone'} setFetchStart={setFetchStart} /> : <></>}

                        <AccountItem fieldName='Электронная почта для уведомлений' fieldValue={UserInfo.userInfo.email} editable={true} attachedField={'email'} setFetchStart={setFetchStart} />

                        {UserInfo.userInfo.company_adress ? <AccountItem fieldName='Адрес' fieldValue={UserInfo.userInfo.company_adress} editable={true} attachedField={'company_adress'} setFetchStart={setFetchStart}
                            cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable}
                        /> : <></>}
                        {UserInfo.userInfo.type_of_customer ? <AccountItem fieldName='Вам нужна доставка для' fieldValue={SetTranslate(UserInfo.userInfo.type_of_customer)} editable={true} attachedField={'type_of_customer'} setFetchStart={setFetchStart} /> : <></>}
                    </div>
                    <div
                        className={containerClassName}>
                        <AccountItem fieldName='Партнер может добавить вас с помощью кода' fieldValue={UserInfo.userInfo.uuid} editable={false} attachedField={''} setFetchStart={setFetchStart} />
                    </div>
                </VerticalContainer>
                <VerticalContainer>
                    <div
                        className={containerClassName}>
                        {UserInfo.userInfo.legal === 'sole_trader' || UserInfo.userInfo.legal === 'entity' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName='Вы' fieldValue={SetTranslate(UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.company_name ? <AccountItem fieldName='Название компании' fieldValue={UserInfo.userInfo.company_name} editable={true} attachedField={'company_name'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.website ? <AccountItem fieldName='Сайт' fieldValue={UserInfo.userInfo.website} editable={true} attachedField={'website'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.company_inn ? <AccountItem fieldName='ИНН' fieldValue={UserInfo.userInfo.company_inn} editable={true} attachedField={'company_inn'} setFetchStart={setFetchStart} /> : <></>}
                        </> : <></>}
                        {UserInfo.userInfo.legal === 'person' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName='Вы' fieldValue={SetTranslate(UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_number ? <AccountItem fieldName='Номер паспорта' fieldValue={UserInfo.userInfo.passport_number} editable={true} attachedField={'passport_number'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_date_of_issue ? <AccountItem fieldName='Дата выдачи' fieldValue={UserInfo.userInfo.passport_date_of_issue} editable={true} attachedField={'passport_date_of_issue'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_issued_by ? <AccountItem fieldName='Кем выдан' fieldValue={UserInfo.userInfo.passport_issued_by} editable={true} attachedField={'passport_issued_by'} setFetchStart={setFetchStart} /> : <></>}
                        </> : <></>}
                    </div>
                    <div
                        className={containerClassName}>
                        <FieldName>Состояние подписки</FieldName>
                        <SubscriptionStatusComponent setModalActive={setModalActive} />
                    </div>
                </VerticalContainer>
            </HorizontalContainer> : <></>
        }
    </>
    )
})

export default Account
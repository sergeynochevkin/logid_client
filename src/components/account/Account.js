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
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'


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
                        <AccountItem fieldName={SetTranslate('auth_email')} fieldValue={user.user.email} editable={true} attachedField={'authEmail'} setFetchStart={setFetchStart} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                        <AccountItem fieldName={SetTranslate('password')} fieldValue={'****************'} editable={true} attachedField={'password'} setFetchStart={setFetchStart} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                    </div>
                    <div
                        className={containerClassName}>
                        <FieldName>{SetTranslate('your_rating')}</FieldName>
                        <RatingView user={user} onePartnerInfo={UserInfo.userInfo} parent='account' />
                    </div>
                </VerticalContainer>
                <VerticalContainer>
                    <div
                        className={containerClassName}>
                        <AccountItem fieldName='id' fieldValue={UserInfo.userInfo.id} editable={false} />

                        <AccountItem fieldName={SetNativeTranslate(Translate.language,{},'name_surname_fathersname_validation')} fieldValue={UserInfo.userInfo.name_surname_fathersname} editable={true} attachedField={'name_surname_fathersname'} setFetchStart={setFetchStart} />

                        <AccountItem fieldName={SetTranslate('country_content')} fieldValue={SetTranslate(UserInfo.userInfo.country)} editable={false} attachedField={'country'} setFetchStart={setFetchStart} />
                        <AccountItem fieldName={SetTranslate('city_content')} fieldValue={UserInfo.userInfo.city} editable={true} attachedField={'city'} setFetchStart={setFetchStart} setFetchPartnersStart={setFetchPartnersStart} cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable} />
                        {UserInfo.userInfo.phone ? <AccountItem fieldName={SetTranslate('phone_content')} fieldValue={UserInfo.userInfo.phone} editable={true} attachedField={'phone'} setFetchStart={setFetchStart} /> : <></>}

                        <AccountItem fieldName={SetTranslate('notification_email_content')} fieldValue={UserInfo.userInfo.email} editable={true} attachedField={'email'} setFetchStart={setFetchStart} />

                        {UserInfo.userInfo.company_adress ? <AccountItem fieldName={SetTranslate('adress_content')} fieldValue={UserInfo.userInfo.company_adress} editable={true} attachedField={'company_adress'} setFetchStart={setFetchStart}
                            cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable}
                        /> : <></>}
                        {UserInfo.userInfo.type_of_customer ? <AccountItem fieldName={SetTranslate('delivery_for')} fieldValue={SetTranslate(UserInfo.userInfo.type_of_customer)} editable={true} attachedField={'type_of_customer'} setFetchStart={setFetchStart} /> : <></>}
                    </div>
                    <div
                        className={containerClassName}>
                        <AccountItem fieldName={SetTranslate('can_add')} fieldValue={UserInfo.userInfo.uuid} editable={false} attachedField={''} setFetchStart={setFetchStart} />
                    </div>
                </VerticalContainer>
                <VerticalContainer>
                    <div
                        className={containerClassName}>
                        {UserInfo.userInfo.legal === 'sole_trader' || UserInfo.userInfo.legal === 'entity' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName={SetTranslate('legal_content')} fieldValue={SetTranslate(UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.company_name ? <AccountItem fieldName={SetTranslate('company_name_content')} fieldValue={UserInfo.userInfo.company_name} editable={true} attachedField={'company_name'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.website ? <AccountItem fieldName={SetTranslate('website_content')} fieldValue={UserInfo.userInfo.website} editable={true} attachedField={'website'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.company_inn ? <AccountItem fieldName={SetTranslate('company_inn_content')} fieldValue={UserInfo.userInfo.company_inn} editable={true} attachedField={'company_inn'} setFetchStart={setFetchStart} /> : <></>}
                        </> : <></>}
                        {UserInfo.userInfo.legal === 'person' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName={SetTranslate('legal_content')} fieldValue={SetTranslate(UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_number ? <AccountItem fieldName={SetTranslate('passport_number_content')} fieldValue={UserInfo.userInfo.passport_number} editable={true} attachedField={'passport_number'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_date_of_issue ? <AccountItem fieldName={SetTranslate('passport_date_of_issue_content')} fieldValue={UserInfo.userInfo.passport_date_of_issue} editable={true} attachedField={'passport_date_of_issue'} setFetchStart={setFetchStart} /> : <></>}
                            {UserInfo.userInfo.passport_issued_by ? <AccountItem fieldName={SetTranslate('passport_issued_by_content')} fieldValue={UserInfo.userInfo.passport_issued_by} editable={true} attachedField={'passport_issued_by'} setFetchStart={setFetchStart} /> : <></>}
                        </> : <></>}
                    </div>
                    <div
                        className={containerClassName}>
                        <FieldName>{SetTranslate('subscription_status')}</FieldName>
                        <SubscriptionStatusComponent setModalActive={setModalActive} />
                    </div>
                </VerticalContainer>
            </HorizontalContainer> : <></>
        }
    </>
    )
})

export default Account
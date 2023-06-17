import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import AccountItem from './AccountItem'
import RatingView from '../rating/RatingView'
import { FieldName } from '../ui/page/FieldName'
import Modal from '../ui/modal/Modal'
import SubscriptionForm from '../subscription/SubscriptionForm'
import SubscriptionStatusComponent from '../subscription/SubscriptionStatusComponent'
import AccountActivationStatus from './AccountActivationStatus'
import './Account.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import AccountInfoStatus from './AccountInfoStatus'


const Account = observer(() => {
    const { user } = useContext(UserContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [modalActive, setModalActive] = useState(false)
    const [passwordEditable, setPasswordEditable] = useState(false)
    const [loginEditable, setLoginEditable] = useState(false)
    const [cityEditable, setCityEditable] = useState(false)
    const [adressEditable, setAdressEditable] = useState(false)
    const { Setting } = useContext(SettingContext)

    const { Translate } = useContext(TranslateContext)

    const containerClassName = Setting.app_theme === 'light' ? 'account_container' : 'account_container account_container_dark'

    return (<>

        <HorizontalContainer
            style={{ marginTop: '10px', alignItems: 'flex-start' }}>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <SubscriptionForm setModalActive={setModalActive} />
            </Modal>
            <VerticalContainer>
                <AccountActivationStatus containerClassName={containerClassName} />
                <div
                    className={containerClassName}>
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'auth_email')} fieldValue={user.user.email} editable={true} attachedField={'authEmail'} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'password')} fieldValue={'****************'} editable={true} attachedField={'password'} loginEditable={loginEditable} setLoginEditable={setLoginEditable} passwordEditable={passwordEditable} setPasswordEditable={setPasswordEditable} />
                </div>
                <div
                    className={containerClassName}>
                    <FieldName>{SetNativeTranslate(Translate.language, {}, 'your_rating')}</FieldName>
                    <RatingView user={user} onePartnerInfo={UserInfo.userInfo} parent='account' />
                </div>
            </VerticalContainer>
            <VerticalContainer>
                <div
                    className={containerClassName}>
                    <AccountItem fieldName='id' fieldValue={UserInfo.userInfo.id} editable={false} />

                    {UserInfo.userInfo.name_surname_fathersname ?
                        <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'name_surname_fathersname_validation')} fieldValue={UserInfo.userInfo.name_surname_fathersname} editable={true} attachedField={'name_surname_fathersname'} /> : <></>}

                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'country_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.country)} editable={false} attachedField={'country'} />
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'city_content')} fieldValue={UserInfo.userInfo.city} editable={true} attachedField={'city'} cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable} />
                    {UserInfo.userInfo.phone ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'phone_content')} fieldValue={UserInfo.userInfo.phone} editable={true} attachedField={'phone'} /> : <></>}

                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'notification_email_content')} fieldValue={UserInfo.userInfo.email} editable={true} attachedField={'email'} />

                    {UserInfo.userInfo.company_adress ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'adress_content')} fieldValue={UserInfo.userInfo.company_adress} editable={true} attachedField={'company_adress'}
                        cityEditable={cityEditable} setCityEditable={setCityEditable} adressEditable={adressEditable} setAdressEditable={setAdressEditable}
                    /> : <></>}
                    {UserInfo.userInfo.type_of_customer ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'delivery_for')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.type_of_customer)} editable={true} attachedField={'type_of_customer'} /> : <></>}
                </div>
                <div
                    className={containerClassName}>
                    <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'can_add')} fieldValue={UserInfo.userInfo.uuid} editable={false} attachedField={''} />
                </div>
            </VerticalContainer>

            {UserInfo.userInfo.legal ?
                <VerticalContainer>
                    <div
                        className={containerClassName}>
                        {UserInfo.userInfo.legal === 'sole_trader' || UserInfo.userInfo.legal === 'entity' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'legal_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} /> : <></>}
                            {UserInfo.userInfo.company_name ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'company_name_content')} fieldValue={UserInfo.userInfo.company_name} editable={true} attachedField={'company_name'} /> : <></>}
                            {UserInfo.userInfo.website ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'website_content')} fieldValue={UserInfo.userInfo.website} editable={true} attachedField={'website'} /> : <></>}
                            {UserInfo.userInfo.company_inn ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'company_inn_content')} fieldValue={UserInfo.userInfo.company_inn} editable={true} attachedField={'company_inn'} /> : <></>}
                        </> : <></>}
                        {UserInfo.userInfo.legal === 'person' ? <>
                            {UserInfo.userInfo.legal ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'legal_content')} fieldValue={SetNativeTranslate(Translate.language, {}, UserInfo.userInfo.legal)} editable={true} attachedField={'legal'} /> : <></>}
                            {UserInfo.userInfo.passport_number ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_number_content')} fieldValue={UserInfo.userInfo.passport_number} editable={true} attachedField={'passport_number'} /> : <></>}
                            {UserInfo.userInfo.passport_date_of_issue ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_date_of_issue_content')} fieldValue={UserInfo.userInfo.passport_date_of_issue} editable={true} attachedField={'passport_date_of_issue'} /> : <></>}
                            {UserInfo.userInfo.passport_issued_by ? <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'passport_issued_by_content')} fieldValue={UserInfo.userInfo.passport_issued_by} editable={true} attachedField={'passport_issued_by'} /> : <></>}
                        </> : <></>}
                    </div>
                    <div
                        className={containerClassName}>
                        <FieldName>{SetNativeTranslate(Translate.language, {}, 'subscription_status')}</FieldName>
                        <SubscriptionStatusComponent setModalActive={setModalActive} />
                    </div>
                </VerticalContainer>
                :
                <VerticalContainer>
                    <AccountInfoStatus containerClassName={containerClassName} />
                </VerticalContainer>

            }


        </HorizontalContainer> : <></>

    </>
    )
})

export default Account
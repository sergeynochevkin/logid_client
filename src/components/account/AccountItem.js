import React, { useContext, useEffect, useState } from 'react'
import { Field } from '../ui/page/Field'
import { FieldName } from '../ui/page/FieldName'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import NameSurNameFathersName from './userInfoForm/NameSurNameFathersName'
import { AdressContext, FetcherContext, NotificationContext, SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { CardButton } from '../ui/button/CardButton'
import Country from './userInfoForm/Country'
import City from './userInfoForm/City'
import CompanyINN from './userInfoForm/CompanyINN'
import CompanyName from './userInfoForm/CompanyName'
import CompanyWebSite from './userInfoForm/CompanyWebSite'
import Legal from './userInfoForm/Legal'
import PassportIssuedBy from './userInfoForm/PassportIssuedBy'
import PassportNumber from './userInfoForm/PassportNumber'
import Phone from './userInfoForm/Phone'
import TypeOfCustomer from './userInfoForm/TypeOfCustomer'
import AdressComponent from './userInfoForm/AdressComponent'
import PassportDateOfIssue from './userInfoForm/PassportDateOfIssue'
import { updateUserInfo } from '../../http/userInfoApi'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import NotificationEmail from './userInfoForm/NotiFicationEmail'
import Email from './userInfoForm/Email'
import Password from './userInfoForm/Password'
import { useInput } from '../../hooks/useInput'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite'
import { update } from '../../http/userAPI'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const AccountItem = observer(({ fieldName, fieldValue, editable, attachedField, setLoginEditable, setPasswordEditable, passwordEditable, loginEditable, adressEditable, setAdressEditable, cityEditable, setCityEditable }) => {
    const [fieldEditable, setFieldEditable] = useState(false)
    const { UserInfo } = useContext(UserInfoContext)
    const { Adress } = useContext(AdressContext)
    const { Notification } = useContext(NotificationContext)
    const { user } = useContext(UserContext)
    const { State } = useContext(StateContext)
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { fetcher } = useContext(FetcherContext)
    const [comparePassword, setComparePassword] = useState('')

    const message = SetNativeTranslate(Translate.language, {}, attachedField)

    const initialValue = {
        id: '',
        country: '',
        legal: '',
        city: { value: '', isDirty: false, notValid: true },
        phone: '',
        website: '',
        company_name: '',
        company_inn: '',
        company_adress: { value: '', isDirty: false, notValid: true },
        type_of_customer: '',
        name_surname_fathersname: '',
        passport_number: '',
        passport_date_of_issue: '',
        passport_issued_by: '',
        email: '',
        city_latitude: '',
        city_longitude: '',
        company_adress_latitude: '',
        company_adress_longitude: ''

        // id: '',
        // [attachedField]: '',
    }

    const [formData, setFormData] = useState(
        initialValue
    )

    const authInitialValue = {
        userId: undefined,
        email: '',
        password: ''
    }
    const [authFormData, setAuthFormData] = useState(authInitialValue)
    authFormData.userId = user.user.id

    const validInn = /^[1-9]+[0-9]*$/
    const validWebSite = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validPassportNumber = /^[а-яА-ЯёЁa-zA-Z0-9]+$/
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/
    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/

    formData.id = UserInfo.userInfo.id
    formData.name_surname_fathersname = useInput('', { isEmpty: true, minLength: 10, maxLength: 50 }, SetNativeTranslate(Translate.language, {}, 'name_surname_fathersname_validation').toLowerCase())
    formData.company_inn = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validInn }, SetNativeTranslate(Translate.language, {}, 'company_inn'))
    formData.company_name = useInput('', { isEmpty: true, minLength: 6, maxLength: 30 }, SetNativeTranslate(Translate.language, {}, 'company_name'))
    formData.website = useInput('', { isEmpty: true, minLength: 6, maxLength: 30, validFormat: validWebSite }, SetNativeTranslate(Translate.language, {}, 'website'))
    formData.country = useInput('', { isEmpty: true })
    authFormData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {}, 'auth_email_validation'))
    formData.legal = useInput('', { isEmpty: true })
    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {}, 'email'))
    formData.passport_date_of_issue = useInput('', { isEmpty: true }, SetNativeTranslate(Translate.language, {}, 'passport_date_of_issue'))
    formData.passport_issued_by = useInput('', { isEmpty: true, minLength: 10, maxLength: 60 }, SetNativeTranslate(Translate.language, {}, 'passport_issued_by'))
    formData.passport_number = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPassportNumber }, SetNativeTranslate(Translate.language, {}, 'passport_number'))
    authFormData.password = useInput('', { isEmpty: true, minLength: 6, maxLength: 20, validFormat: validPassword }, SetNativeTranslate(Translate.language, {}, 'password').toLowerCase())
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone'))
    formData.type_of_customer = useInput('', { isEmpty: true })


    const updateUserInfoAction = async (event) => {
        try {
            let data;
            event.preventDefault();
            data = await updateUserInfo(
                formData
            )
            attachedField === 'city' && user.user.role === 'carrier' ? clearCity() : setFieldEditable(false)
            attachedField === 'city' && setCityEditable(false)
            attachedField === 'company_adress' && setAdressEditable(false)
            setFormData(initialValue)
            // attachedField === 'company_adress' && setAdressEditable(false)                 
            fetcher.setAccountUserInfo(true)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${SetNativeTranslate(Translate.language, {}, 'you_have_changed')} ${message}` }])
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    function clearCity() {
        setAdressEditable(false)
        setFieldEditable(false)
        console.log(cityEditable);
        for (const city of State.user_state.user_map_cities) {
            if (parseFloat(city.lat) === formData.city_latitude && parseFloat(city.lng) === formData.city_longitude) {
                let data = [...Setting.user_map_cities]
                // Setting.setUserMapCities(data.filter(el => parseFloat(el.lat) !== parseFloat(city.lat) && parseFloat(el.lng) !== parseFloat(city.lng)))
                State.setUserStateField(Setting.user_map_cities, 'user_map_cities', UserInfo.userInfo.id)
            }
        }
    }

    const updateUserAction = async (event) => {
        try {
            let data;
            event.preventDefault();
            data = await update(
                authFormData.userId,
                authFormData.email.value,
                authFormData.password.value,
                Translate.language
            )
            authFormData.email.setValue('')
            authFormData.password.setValue('')
            authFormData.email.setDirty(false)
            authFormData.password.setDirty(false)
            setLoginEditable(false)
            setPasswordEditable(false)
            fetcher.setAccountUser(true)
            Notification.addNotification([{ id: v4(), type: 'success', message: `${SetNativeTranslate(Translate.language, {}, 'you_have_changed')} ${message}` }])
        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    return (
        <VerticalContainer style={{ gap: '0px' }}>
            <FieldName>{attachedField === 'city' && cityEditable ? SetNativeTranslate(Translate.language, {}, 'city_adress') : fieldName}</FieldName>
            <HorizontalContainer
                style={{ alignItems: 'center' }}>
                {(!fieldEditable && attachedField !== 'password' && attachedField !== 'authEmail') || (!passwordEditable && attachedField === 'password') || (!loginEditable && attachedField === 'authEmail') ?
                    <Field style={{ backgroundColor: Setting.app_theme !== 'light' && '#141414', borderColor: Setting.app_theme !== 'light' && '#414141' }}>{fieldValue}
                        {editable ?
                            <div>
                                {(!fieldEditable && attachedField !== 'password' && attachedField !== 'authEmail') || (!passwordEditable && attachedField === 'password') || (!loginEditable && attachedField === 'authEmail') ?
                                    <CardButton
                                        style={{ height: '15px' }}
                                        disabled={(loginEditable && attachedField === 'password') || (passwordEditable && attachedField === 'authEmail')
                                            || (cityEditable && attachedField === 'company_adress') || (adressEditable && attachedField === 'city')}
                                        onClick={() => {
                                            if (attachedField !== 'authEmail' || attachedField !== 'password' || attachedField !== 'city' || attachedField !== 'company_adress') {
                                                setFieldEditable(true)
                                            }
                                            if (attachedField === 'authEmail') {
                                                setLoginEditable(true)
                                            }
                                            if (attachedField === 'password') {
                                                setPasswordEditable(true)
                                            }
                                            if (attachedField === 'city') {
                                                setCityEditable(true)
                                                setAdressEditable(false)
                                            }
                                            if (attachedField === 'company_adress') {
                                                setAdressEditable(true)
                                                setCityEditable(false)
                                            }
                                        }}
                                    >{SetNativeTranslate(Translate.language, {}, 'edit')}</CardButton> :
                                    <></>
                                }
                            </div> : <></>}
                    </Field>
                    :
                    attachedField === 'name_surname_fathersname' ? <NameSurNameFathersName formData={formData} /> :
                        attachedField === 'country' ? <Country formData={formData} Adress={Adress} /> :

                            attachedField === 'city' ?
                                <VerticalContainer>
                                    <City formData={formData} setFormData={setFormData} />
                                    {formData.city.notValid === false &&
                                        <AdressComponent formData={formData} setFormData={setFormData} />
                                    }
                                </VerticalContainer>
                                :
                                attachedField === 'company_inn' ? <CompanyINN formData={formData} /> :
                                    attachedField === 'company_name' ? <CompanyName formData={formData} /> :
                                        attachedField === 'company_adress' ? <AdressComponent formData={formData} setFormData={setFormData} Adress={Adress} parent={'account'} /> :
                                            attachedField === 'website' ? <CompanyWebSite formData={formData} /> :
                                                attachedField === 'legal' ? <Legal formData={formData} /> :
                                                    attachedField === 'passport_issued_by' ? <PassportIssuedBy formData={formData} /> :
                                                        attachedField === 'passport_date_of_issue' ? <PassportDateOfIssue formData={formData} /> :
                                                            attachedField === 'passport_number' ? <PassportNumber formData={formData} /> :
                                                                attachedField === 'phone' ? <Phone formData={formData} /> :
                                                                    attachedField === 'type_of_customer' ? <TypeOfCustomer formData={formData} /> :
                                                                        attachedField === 'email' ? <NotificationEmail formData={formData} /> :
                                                                            attachedField === 'authEmail' ? <Email authFormData={authFormData} /> :
                                                                                attachedField === 'password' ? <Password authFormData={authFormData} comparePassword={comparePassword} setComparePassword={setComparePassword} />
                                                                                    : <></>}
            </HorizontalContainer>

            {(fieldEditable && attachedField !== 'password' && attachedField !== 'authEmail') || (passwordEditable && attachedField === 'password') || (loginEditable && attachedField === 'authEmail') ?
                <HorizontalContainer>
                    <CardButton
                        style={{ height: '15px' }}
                        onClick={() => {
                            if (attachedField !== 'authEmail' || attachedField !== 'password' || attachedField !== 'city' || attachedField !== 'company_adress') {
                                setFieldEditable(false)
                            }
                            if (attachedField === 'authEmail') {
                                setLoginEditable(false)
                            }
                            if (attachedField === 'password') {
                                setPasswordEditable(false)
                            }
                            if (attachedField === 'city') {
                                setCityEditable(false)
                            }
                            if (attachedField === 'company_adress') {
                                setAdressEditable(false)
                            }
                        }}
                    >Отменить</CardButton>

                    {attachedField !== 'password' && attachedField !== 'authEmail' ?
                        <CardButton
                            style={{ height: '15px' }}
                            onClick={updateUserInfoAction}
                            disabled={((formData[attachedField].notValid)
                                || (formData[attachedField].value === 'person' && (formData.passport_issued_by.notValid || formData.passport_number.notValid || formData.passport_date_of_issue.notValid))
                                || ((formData[attachedField].value === 'entity' || formData[attachedField].value === 'sole_trader') && (formData.company_inn.notValid || formData.company_name.notValid || (formData.website.notValid && !formData.website.isEmpty))) || (attachedField === 'city' && formData.company_adress.notValid)
                            )}
                        >Сохранить</CardButton> : <></>}

                    {attachedField == 'password' || attachedField == 'authEmail' ?
                        <CardButton
                            style={{ height: '15px' }}
                            onClick={updateUserAction}
                            disabled={(authFormData.email.notValid && attachedField === 'authEmail')
                                || (authFormData.password.notValid && attachedField === 'password') || (authFormData.password.value !== comparePassword && attachedField === 'password')}
                        >Сохранить</CardButton> : <></>}

                </HorizontalContainer> : <></>}
        </VerticalContainer>
    )
})

export default AccountItem
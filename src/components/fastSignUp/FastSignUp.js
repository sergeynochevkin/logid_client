import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, ComponentFunctionContext, FetcherContext, LimitContext, NotificationContext, SettingContext, SubscriptionContext, TranslateContext, TransportContext, UserContext, UserInfoContext } from '../..'
import { useInput } from '../../hooks/useInput'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import TransportFormSection from '../transport/TransportFormSection'
import { Button } from '../ui/button/Button'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import { Input } from '../ui/form/Input'
import { Select } from '../ui/form/Select'
import { FieldName } from '../ui/page/FieldName'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import ReCAPTCHA from "react-google-recaptcha";
import { v4 } from "uuid";
import arrow_up from '../../assets/icons/arrow_up_.png';
import arrow_up_dark from '../../assets/icons/arrow_up_dark_.png';

import './FastSignUp.css'
import City from '../account/userInfoForm/City'
import { useFetching } from '../../hooks/useFetching'
import { fast_registration } from '../../http/userAPI'
import { MAIN_ROUTE, MANAGER_ROUTE, USER_ROUTE } from '../../utils/consts'
import { useNavigate } from 'react-router-dom'
import { fetchUserInfo } from '../../http/userInfoApi'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const FastSignUp = observer(() => {
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)
    const { Adress } = useContext(AdressContext)
    const [comparePassword, setComparePassword] = useState('')
    const [comparePasswordActive, setComparePasswordActive] = useState(false)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const [reCapchaChecked, setReCapchaChecked] = useState(false)
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { Notification } = useContext(NotificationContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { fetcher } = useContext(FetcherContext)
    const { height, width } = useWindowDimensions();
    const [formVisible, setFormVisible] = useState()



    useEffect(() => {
        if (width < 770) {
            setFormVisible(false)
        } else { setFormVisible(true) }
    }, [])

    let cookies_accepted = JSON.parse(localStorage.getItem('cookies_accepted'))

    function onRecaptchaChange() {
        setReCapchaChecked(true)
    }

    const [fetching, error] = useFetching(async () => {
        await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data)
        )
        if (user.user.role === 'carrier') {
            fetcher.setTransports(true)
        }
        fetcher.setSubscriptions(true)
    })


    const click = async (event) => {
        event.preventDefault()
        try {
            let data;
            data = await fast_registration(
                Translate.language,
                formData.phone.value,
                formData.email.value,
                formData.password.value,
                formData.role.value,
                formData.country.value,
                formData.user_agreement_accepted,
                formData.privacy_policy_accepted,
                formData.age_accepted,
                formData.cookies_accepted.total,
                formData.personal_data_agreement_accepted,

                // value?                
                formData.city.value,
                formData.city_place_id,
                formData.city_latitude,
                formData.city_longitude,

                formData.load_capacity.value,
                formData.side_type.value,
                formData.type.value,

                formData.from_fast,

                formData.thermo_bag,
                formData.hydraulic_platform,
                formData.side_loading,
                formData.glass_stand,
                formData.refrigerator_minus,
                formData.refrigerator_plus,
                formData.thermo_van,
                formData.tag,



            )
            user.setUser(data)



            Notification.addNotification([{
                id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
                    {
                        russian: ['Вы зарегистрированы, ссылка для активации аккаунта отрправлена на указанный email'],
                        english: ['You are registered, a link to activate your account has been sent to the specified email']
                    }
                )
            }])

            fetching()

            localStorage.setItem('cookies_accepted', JSON.stringify({ total: true, auth: true, main: true }))
            user.setIsAuth(true)
            if (user.user.role === 'carrier' || user.user.role === 'customer') { navigate(USER_ROUTE) }
            else if (user.user.role === 'manager') { navigate(MANAGER_ROUTE) }
            else if (user.user.role === 'admin') { navigate(MAIN_ROUTE) }
            else { navigate(MAIN_ROUTE) }

        } catch (e) {
            // no errors!
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }

    let initialValue = {
        //auth
        email: '',
        password: '',
        role: '',
        code: '',
        country: '',
        user_agreement_accepted: false,
        privacy_policy_accepted: false,
        age_accepted: false,
        personal_data_agreement_accepted: false,
        cookies_accepted: cookies_accepted,

        //user info
        userId: undefined,
        country: '',
        legal: '',
        city: { value: '', isDirty: false, notValid: true },
        city_place_id: '',
        city_latitude: '',
        city_longitude: '',
        phone: '',
        website: '',
        company_name: '',
        company_inn: '',
        company_adress: { value: '', isDirty: false, notValid: true },
        company_adress_latitude: '',
        company_adress_longitude: '',
        type_of_customer: '',
        name_surname_fathersname: '',
        passport_number: '',
        passport_date_of_issue: '',
        passport_issued_by: '',
        email: '',
        from_fast: true,

        //transport
        thermo_bag: false,
        hydraulic_platform: false,
        side_loading: false,
        glass_stand: false,
        refrigerator_minus: false,
        refrigerator_plus: false,
        thermo_van: false,
        userInfoId: undefined,
        tag: '',
        type: '',
    }

    const [formData, setFormData] = useState(initialValue)

    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    formData.country = useInput('', { isEmpty: true })
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/
    formData.country.value = Adress.country.value
    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {
        russian: ['email'],
        english: ['email']
    }))
    formData.password = useInput('', { isEmpty: true, minLength: 6, maxLength: 20, validFormat: validPassword }, SetNativeTranslate(Translate.language, {
        russian: ['пароль'],
        english: ['password']
    }))


    const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
    formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content').toLowerCase())

    formData.role = useInput('', { isEmpty: true })
  
    formData.load_capacity = useInput('', { isEmpty: true },)
    formData.side_type = useInput('', { isEmpty: true },)
    formData.type = useInput('', { isEmpty: true },)
    formData.tag = SetNativeTranslate(Translate.language, {
        russian: ['Первый способ доставки'],
        english: ['First shipping method']
    })

    return (
        <>
            {formVisible ?
                <form className='fast_sign_up_container'>


                    <div className='fast_sign_up_section'>
                        <City parent={'fast_sign_up'} formData={formData} setFormData={setFormData} />
                    </div>

                    <div className='fast_sign_up_section'>

                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Input placeholder={SetNativeTranslate(Translate.language, {
                                russian: ['Ваш телефон'],
                                english: ['Your phone']
                            }, '')} value={formData.phone.value}
                                onChange={(e) => formData.phone.onChange(e)}
                                onBlur={e => formData.phone.onBlur(e)}
                                type="text" name="phone" id='phone'
                                style={{ borderLeft: formData.phone.notValid || formData.phone.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                            ></Input>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {(formData.phone.isEmpty && formData.phone.isDirty) || (formData.phone.minLengthError) || (formData.phone.maxLengthError) || (formData.phone.formatError) ?
                                    formData.phone.errorMessage :
                                    ''
                                }
                            </FieldName>
                        </VerticalContainer>

                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'your_email')}
                                value={formData.email.value}
                                style={{ borderLeft: (formData.email.notValid || formData.email.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                                onChange={(e) => formData.email.onChange(e)}
                                onBlur={e => formData.email.onBlur(e)}
                                type="text" name="email" id="email"
                                autoComplete='email'
                            ></Input>

                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {(formData.email.isEmpty && formData.email.isDirty) || (formData.email.minLengthError) || (formData.email.maxLengthError) || (formData.email.formatError) ?
                                    formData.email.errorMessage :
                                    ''
                                }
                            </FieldName>
                        </VerticalContainer>
                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'your_password')}
                                style={{ borderLeft: formData.password.notValid || formData.password.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                                value={formData.password.value}
                                onChange={(e) => formData.password.onChange(e)} onBlur={e => formData.password.onBlur(e)} type="password" name="password" id="password"
                                autoComplete='current-password'
                            ></Input>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {(formData.password.isEmpty && formData.password.isDirty) || (formData.password.minLengthError) || (formData.password.maxLengthError) ?
                                    formData.password.errorMessage : (formData.password.formatError) ? SetNativeTranslate(Translate.language, {}, 'password_hint') :
                                        ''
                                }
                            </FieldName>
                        </VerticalContainer>
                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'password_repeat')} value={comparePassword} onChange={(e) => {
                                setComparePassword(e.target.value)
                                setComparePasswordActive(true)
                            }}
                                style={{ borderLeft: formData.password.value !== comparePassword || !comparePassword ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                                onBlur={e => formData.password.onBlur(e)}
                                type="password"
                                autoComplete='new-password'
                            ></Input>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {formData.password.value !== comparePassword && comparePasswordActive && !formData.password.isEmpty ?
                                    SetNativeTranslate(Translate.language, {}, 'compare_passwords') : ''
                                }
                            </FieldName>
                        </VerticalContainer>
                        <VerticalContainer
                            style={{ gap: '0px' }}
                        >
                            <Select
                                defaultValue={formData.role.value}
                                onChange={(e) => formData.role.onChange(e)}
                                onBlur={e => formData.role.onBlur(e)}
                                name="role" id="role"
                                style={{ borderLeft: formData.role.notValid || formData.role.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                            >
                                <option disabled hidden value={formData.role.value}>{SetNativeTranslate(Translate.language, {}, 'who_are_you')}</option>
                                <option value='customer'>{SetNativeTranslate(Translate.language, {}, 'customer')}</option>
                                <option value='carrier'>{SetNativeTranslate(Translate.language, {}, 'carrier')}</option>
                                {/* <option value='admin'>admin</option> */}
                            </Select>
                            <FieldName
                                style={{
                                    fontWeight: 'normal',
                                    color: 'rgb(254, 111, 103,0.8)'
                                }}
                            >
                                {formData.role.isEmpty && formData.role.isDirty ?
                                    SetNativeTranslate(Translate.language, {}, 'select_role') :
                                    ''
                                }
                            </FieldName>
                        </VerticalContainer>
                    </div>

                    {formData.role.value === 'carrier' && formData.role.value !== '' ?
                        <div className='fast_sign_up_section'>
                            <TransportFormSection parent={'fast_sign_up'} formData={formData} setFormData={setFormData} />
                        </div>
                        : <></>
                    }

                    <div className='auth_check_box_list_section'>
                        <div className='auth_check_box_list_container'>
                            {Adress.country.value === 'russia' &&
                                <>
                                    <CheckBoxContainer >
                                        <CheckBoxSection >
                                            <input type='checkbox' className='auth_checkbox' checked={formData.user_agreement_accepted && 'checked'} value={formData.user_agreement_accepted} onChange={() => {
                                                formData.user_agreement_accepted === false ? setFormData({ ...formData, user_agreement_accepted: true }) :
                                                    setFormData({ ...formData, user_agreement_accepted: false })
                                            }}></input>
                                            <label className='auth_check_box_label' >
                                                <div className='auth_checkbox_text'>
                                                    <div>
                                                        {SetNativeTranslate(Translate.language, {
                                                            russian: [`подтвердите согласие с`],
                                                            english: [`confirm your agreement with`]
                                                        })}
                                                    </div>
                                                    <div className='auth_agreement_link'
                                                        onClick={() => {
                                                            ComponentFunction.setAgreement('UserAgeement')
                                                            ComponentFunction.setAgreementModal(true)
                                                        }}
                                                    >
                                                        {SetNativeTranslate(Translate.language, {
                                                            russian: [`пользовательским соглашением`],
                                                            english: [`user agremeent`]
                                                        })}
                                                    </div>
                                                </div>
                                            </label>
                                        </CheckBoxSection>
                                    </CheckBoxContainer>
                                    <CheckBoxContainer >
                                        <CheckBoxSection >
                                            <input type='checkbox' className='auth_checkbox' checked={formData.privacy_policy_accepted && 'checked'} value={formData.privacy_policy_accepted} onChange={() => {
                                                formData.privacy_policy_accepted === false ? setFormData({ ...formData, privacy_policy_accepted: true }) :
                                                    setFormData({ ...formData, privacy_policy_accepted: false })
                                            }}></input>
                                            <label className='auth_check_box_label' >
                                                <div className='auth_checkbox_text'>
                                                    <div>{SetNativeTranslate(Translate.language, {
                                                        russian: [`подтвердите согласие с`],
                                                        english: [`confirm your agreement with`]
                                                    })}</div>
                                                    <div className='auth_agreement_link'
                                                        onClick={() => {
                                                            ComponentFunction.setAgreement('PrivacyPolicy')
                                                            ComponentFunction.setAgreementModal(true)
                                                        }}
                                                    >
                                                        {SetNativeTranslate(Translate.language, {
                                                            russian: [`политикой конфиденциальности`],
                                                            english: [`privacy policy`]
                                                        })}
                                                    </div>
                                                </div>
                                            </label>
                                        </CheckBoxSection>
                                    </CheckBoxContainer>

                                    <CheckBoxContainer >
                                        <CheckBoxSection >
                                            <input type='checkbox' className='auth_checkbox' checked={formData.personal_data_agreement_accepted && 'checked'} value={formData.personal_data_agreement_accepted} onChange={() => {
                                                formData.personal_data_agreement_accepted === false ? setFormData({ ...formData, personal_data_agreement_accepted: true }) :
                                                    setFormData({ ...formData, personal_data_agreement_accepted: false })
                                            }}></input>
                                            <label className='auth_check_box_label' >
                                                <div className='auth_checkbox_text'>
                                                    <div>{SetNativeTranslate(Translate.language, {
                                                        russian: [`подтвердите`],
                                                        english: [`confirm your`]
                                                    })}</div>
                                                    <div className='auth_agreement_link'
                                                        onClick={() => {
                                                            ComponentFunction.setAgreement('PersonalDataAgreement')
                                                            ComponentFunction.setAgreementModal(true)
                                                        }}
                                                    >
                                                        {SetNativeTranslate(Translate.language, {
                                                            russian: [`согласие на обработку персональных данных`],
                                                            english: [`consent to the processing of personal data`]
                                                        })}
                                                    </div>
                                                </div>
                                            </label>
                                        </CheckBoxSection>
                                    </CheckBoxContainer>

                                    <CheckBoxContainer >
                                        <CheckBoxSection >
                                            <input type='checkbox' className='auth_checkbox' checked={formData.age_accepted && 'checked'} value={formData.age_accepted} onChange={() => {
                                                formData.age_accepted === false ? setFormData({ ...formData, age_accepted: true }) :
                                                    setFormData({ ...formData, age_accepted: false })
                                            }}></input>
                                            <>
                                                <label className='auth_check_box_label' >{SetNativeTranslate(Translate.language, {
                                                    russian: [`подтвердите, что вам исполнилось 18 лет`],
                                                    english: [`confirm that you are over 18 years old`]
                                                })}</label>
                                            </>
                                        </CheckBoxSection>
                                    </CheckBoxContainer>
                                </>}
                            {!cookies_accepted.auth &&
                                <CheckBoxContainer >
                                    <CheckBoxSection >
                                        <input type='checkbox' className='auth_checkbox' checked={formData.cookies_accepted.total && 'checked'} value={formData.cookies_accepted.total}

                                            onChange={() => {
                                                let data = { ...formData }
                                                if (!data.cookies_accepted.total) {
                                                    data.cookies_accepted.total = true
                                                } else {
                                                    data.cookies_accepted.total = false
                                                }
                                                setFormData(data)
                                            }}

                                        ></input>
                                        <>
                                            <label className='auth_check_box_label' >{SetNativeTranslate(Translate.language, {
                                                russian: [`подтвердите, cсогласие на сбор cookies`],
                                                english: [`confirm your consent to the collection of cookies`]
                                            })}</label>
                                        </>
                                    </CheckBoxSection>
                                </CheckBoxContainer>
                            }

                        </div>
                    </div>

                    <ReCAPTCHA
                        sitekey="6LclICciAAAAALsvyUMJwZq8Rk2GJOL3YQqN4syk"
                        onChange={onRecaptchaChange}
                    />

                    <Button

                        onClick={click}
                        disabled={
                            formData.email.notValid ||
                            formData.password.notValid ||
                            formData.role.notValid ||
                            formData.phone.notValid ||//check!
                            formData.password.value !== comparePassword ||
                            !reCapchaChecked ||
                            (!formData.user_agreement_accepted && Adress.country.value === 'russia') ||
                            (!formData.privacy_policy_accepted && Adress.country.value === 'russia') ||
                            (!formData.age_accepted && Adress.country.value === 'russia') ||
                            !formData.cookies_accepted.total ||
                            (!formData.personal_data_agreement_accepted && Adress.country.value === 'russia') ||

                            formData.city.notValid ||

                            formData.role.value === 'carrier' &&
                            formData.type.isEmpty
                            || (
                                (formData.load_capacity.isEmpty && formData.type.value === 'truck') ||
                                (formData.load_capacity.isEmpty && formData.type.value === 'minibus') ||
                                (formData.side_type.isEmpty && formData.type.value === 'truck')
                            )
                        }
                    >
                        {
                            SetNativeTranslate(Translate.language, {
                                russian: ['Быстрая регистрация'],
                                english: ['Fast sign up']
                            })
                        }</Button>

                    {width < 770 && <img className='fast_sign_up_arrow_up' onClick={() => {
                        setFormVisible(false)
                    }} src={arrow_up_dark} ></img>}

                </form> : <Button
                    onClick={() => {
                        setFormVisible(true)
                    }}
                >
                    {
                        SetNativeTranslate(Translate.language, {
                            russian: ['Быстрая регистрация'],
                            english: ['Fast sign up']
                        })
                    }
                </Button>
            }
        </>
    )
})

export default FastSignUp
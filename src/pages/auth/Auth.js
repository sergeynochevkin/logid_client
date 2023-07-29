import React, { useContext, useEffect, useState } from 'react'
import { Link } from '../../components/ui/link/Link'
import { Area50 } from '../../components/ui/area/Area50'
import { Button } from '../../components/ui/button/Button'
import { Form } from '../../components/ui/form/Form'
import { Input } from '../../components/ui/form/Input'
import { Name } from '../../components/ui/text/Name'
import { Select } from '../../components/ui/form/Select'
import PageContainer from '../../components/ui/page/PageContainer'
import { Comment } from '../../components/ui/form/Comment'
import { useNavigate, useLocation } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, RECOVERY_ROUTE, USER_ROUTE, MANAGER_ROUTE, ADMIN_ROUTE } from '../../utils/consts';
import { code, login, registration, restore, update } from '../../http/userAPI'
import { observer } from 'mobx-react-lite'
import { AdressContext, ComponentFunctionContext, FetcherContext, SettingContext, StateContext, SubscriptionContext, TranslateContext, TransportContext, UserContext, UserInfoContext } from '../..'
import { useFetching } from '../../hooks/useFetching'
import { fetchUserInfo } from '../../http/userInfoApi'
import { useInput } from '../../hooks/useInput'
import { VerticalContainer } from '../../components/ui/page/VerticalContainer'
import { FieldName } from '../../components/ui/page/FieldName'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'
import ReCAPTCHA from "react-google-recaptcha";
import { HorizontalContainer } from '../../components/ui/page/HorizontalContainer'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import './Auth.css'
import { fetchUserState } from '../../http/stateApi'
import { CheckBoxContainer } from '../../components/ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../../components/ui/form/CheckBoxSection'
import Country from '../../components/account/userInfoForm/Country'


const Auth = observer(({ }) => {
  const { user } = useContext(UserContext)
  const { UserInfo } = useContext(UserInfoContext)
  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE
  const isRegister = location.pathname === REGISTRATION_ROUTE
  const isRecovery = location.pathname === RECOVERY_ROUTE
  const [comparePassword, setComparePassword] = useState('')
  const [comparePasswordActive, setComparePasswordActive] = useState(false)
  const { Notification } = useContext(NotificationContext)
  const [reCapchaChecked, setReCapchaChecked] = useState(false)
  const [codeSend, setCodeSend] = useState(false)
  const { Translate } = useContext(TranslateContext)
  const { Setting } = useContext(SettingContext)
  const { Adress } = useContext(AdressContext)
  const { State } = useContext(StateContext)
  const { fetcher } = useContext(FetcherContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)



  let cookies_accepted = JSON.parse(localStorage.getItem('cookies_accepted'))

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    code: '',
    country: '',
    user_agreement_accepted: false,
    privacy_policy_accepted: false,
    age_accepted: false,
    personal_data_agreement_accepted: false,
    cookies_accepted: cookies_accepted
  })



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
  formData.role = useInput('', { isEmpty: true })
  formData.code = useInput('', { isEmpty: true }, SetNativeTranslate(Translate.language, {
    russian: ['код подтверждения'],
    english: ['confirmation code']
  }))

  const [fetching, error] = useFetching(async () => {
    await fetchUserInfo(user.user.id).then(data => {
      if (data === null) {
        UserInfo.setUserInfo({})
        // auth preload for admin!
        if (user.user.role === 'admin') {
          fetcher.setManagementUsers(true)
          fetcher.setManagementTransports(true)
          fetcher.setManagementOrders(true)
        }
      } else {
        UserInfo.setUserInfo(data)
        data && fetcher.setUserAppSetting(true)
        if (data.country !== Adress.country.value) {
          Adress.setCountry(Adress.countries.find(el => el.value === data.country))
        }
        fetchUserState(data.id).then(stateData => {
          let state = JSON.parse(stateData.state)
          if (state.app_theme) {
            Setting.setAppTheme(state.app_theme)
          }
          let country = Adress.countries.find(el => el.value === data.country)
          if (state.language) {
            if (state.language !== 'english' && state.language !== country.default_language) {
              Translate.setLanguage(country.default_language)
            } else {
              Translate.setLanguage(state.language)
            }
          } else {
            State.setUserStateField(Translate.language, 'language', data.id)
          }
          if (state.adress_history) {
            Setting.setAdressHistory(state.adress_history)
          }
        })
        if (user.user.role === 'carrier' || user.user.role === 'customer') {
          fetcher.setOrdersAll(true)
          fetcher.setSubscriptions(true)
        }
        if (user.user.role === 'carrier') {
          fetcher.setTransports(true)
        }
      }
    })
  })

  const sendCodeAction = async () => {
    try {
      let data = await code(formData.email.value, Translate.language)
      Notification.addNotification([{
        id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
          {
            russian: ['Код отправлен'],
            english: ['Code sent']
          }
        )
      }])
      setCodeSend(true)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  const updatePasswordAction = async () => {
    try {
      let data = await restore(formData.password.value, formData.code.value, Translate.language)
      setCodeSend(false)
      user.setUser(data)
      UserInfo.setUserInfo({})
      await fetching()
      Notification.addNotification([{
        id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
          {
            russian: ['Пароль изиенен, доступ восстановлен, вы авторизованы'],
            english: ['Password changed, access restored, you are logged in']
          }
        )
      }])
      user.setIsAuth(true)
      if (user.user.role === 'carrier' || user.user.role === 'customer') { navigate(USER_ROUTE) }
      else { navigate(MAIN_ROUTE) }
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(formData.email.value, formData.password.value, Translate.language)
        user.setUser(data)
        Notification.addNotification([{
          id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
            {
              russian: ['Вы авторизованы'],
              english: ['You are logged in']
            }
          )
        }])
        fetching()
      }
      else {
        data = await registration(formData.email.value, formData.password.value, formData.role.value, Translate.language, formData.country.value, formData.user_agreement_accepted, formData.privacy_policy_accepted, formData.age_accepted, formData.cookies_accepted.total, formData.personal_data_agreement_accepted)
        user.setUser(data)
        Notification.addNotification([{
          id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
            {
              russian: ['Вы зарегистрированы, ссылка для активации аккаунта отрправлена на указанный email'],
              english: ['You are registered, a link to activate your account has been sent to the specified email']
            }
          )
        }])
      }
      localStorage.setItem('cookies_accepted', JSON.stringify({ total: true, auth: true, main: true }))
      user.setIsAuth(true)
      if (user.user.role === 'carrier' || user.user.role === 'customer') { navigate(USER_ROUTE) }
      else if (user.user.role === 'manager') { navigate(MANAGER_ROUTE) }
      else if (user.user.role === 'admin') { navigate(MAIN_ROUTE) }
      else { navigate(MAIN_ROUTE) }
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  function onRecaptchaChange() {
    setReCapchaChecked(true)
  }

  return (
    <PageContainer>
      {isLogin ? <title>{SetNativeTranslate(Translate.language, {}, 'authorization')}</title> : isRegister ? <title>{SetNativeTranslate(Translate.language, {}, 'registration')}</title> : isRecovery ? <title>{SetNativeTranslate(Translate.language, {}, 'password_recovery')}</title> : <></>}
      <Area50></Area50>

      <Form>
        <Name>{isLogin ? SetNativeTranslate(Translate.language, {}, 'authorization') : isRegister ? SetNativeTranslate(Translate.language, {}, 'registration') : isRecovery ? SetNativeTranslate(Translate.language, {}, 'password_recovery') : ''} </Name>

        {isRegister && <Country setFormData={setFormData} formData={formData} parent='auth' />}

        {(isRecovery && !codeSend) || isLogin || isRegister ?
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
          : <></>}

        {isLogin || isRegister || (isRecovery && codeSend) ?
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
          </VerticalContainer> :
          <></>}

        {isRegister || (isRecovery && codeSend) ?
          <>
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

            {isRegister ?
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
                  <option value='admin'>admin</option>
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
              : <></>}
          </> :
          <></>
        }
        {isRecovery && codeSend ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'Сonfirmation_code')}
              style={{ borderLeft: formData.code.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
              value={formData.code.value}
              onChange={(e) => formData.code.onChange(e)} onBlur={e => formData.code.onBlur(e)} type="text" name="code" id="code"
              autoComplete='one-time-code'
            ></Input>
            <FieldName
              style={{
                fontWeight: 'normal',
                color: 'rgb(254, 111, 103,0.8)'
              }}
            >
              {(formData.code.isEmpty && formData.code.isDirty) || (formData.code.minLengthError) || (formData.code.maxLengthError) || (formData.code.formatError) ?
                formData.code.errorMessage :
                ''
              }
            </FieldName>
          </VerticalContainer>
          : <></>}

        {isRegister ?
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
          : <></>
        }

        <ReCAPTCHA
          sitekey="6LclICciAAAAALsvyUMJwZq8Rk2GJOL3YQqN4syk"
          onChange={onRecaptchaChange}
        />

        <HorizontalContainer>
          <Button
            disabled={
              formData.email.notValid ||
              (formData.password.notValid && (isRegister || isLogin || (isRecovery && codeSend))) ||
              (formData.role.notValid && isRegister) ||
              (formData.password.value !== comparePassword && (isRegister ||
                (isRecovery && codeSend))) ||
              !reCapchaChecked ||
              (isRecovery && codeSend && formData.code.isEmpty) ||
              (isRegister && !formData.user_agreement_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.privacy_policy_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.age_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.cookies_accepted.total) ||
              (isRegister && !formData.personal_data_agreement_accepted)
            }
            onClick={(event) => {
              event.preventDefault()
              if (isRegister || isLogin) {
                click()
              }
              if (isRecovery && !codeSend) {
                event.preventDefault()
                sendCodeAction()
              }
              if (isRecovery && codeSend) {
                event.preventDefault()
                updatePasswordAction()
              }
            }}
          >{isLogin ? SetNativeTranslate(Translate.language, {}, 'sign_in') : isRegister ? SetNativeTranslate(Translate.language, {}, 'sign_up') : (isRecovery && !codeSend) ? SetNativeTranslate(Translate.language, {}, 'send_code') : (isRecovery && codeSend) ? SetNativeTranslate(Translate.language, {}, 'save_and_sign_in') : ''}</Button>
          {isRecovery && codeSend ?
            <Button
              onClick={() => {
                setCodeSend(false)
                formData.code.setValue('')
                formData.code.setDirty(false)
                formData.password.setValue('')
                formData.password.setDirty(false)
                setComparePassword('')
              }}
            >{SetNativeTranslate(Translate.language, {}, 'send_new_code')}</Button> : <></>}
        </HorizontalContainer>

        {isLogin ?
          <div
            style={{ display: 'flex', gap: '5px' }}>

            <Link onClick={() =>
              navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'registration')}</Link>
            <Link onClick={() =>
              navigate(RECOVERY_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'password_recovery')}</Link>
          </div>
          : isRegister ?
            <Comment>{SetNativeTranslate(Translate.language, {}, 'have_an_account')}<Link onClick={() =>
              navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</Link></Comment>
            : isRecovery ?
              <div
                style={{ display: 'flex', gap: '5px' }}>

                <Link onClick={() =>
                  navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'registration')}</Link>
                <Link onClick={() =>
                  navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</Link>
              </div>
              : <></>
        }
      </Form>

      {/* {Adress.country.value === 'russia' ?
        <div className={Setting.app_theme === 'light' ? 'auth_disclaimer' : 'auth_disclaimer dark'}>{SetNativeTranslate(Translate.language, {
          russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, за исключением вашего рейтинга в сервисе, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение,он не добавил вас или вы не доавили его по предоставленному друг другу уникальному айди, полученному в разделе аккаунт сервиса. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
          english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The Service is not a carrier, carrier representative, customer, customer representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, with the exception of your rating in the service, if he or you did not take your order to work, he or you did not agree to his offer, he did not add you or you did not add him using the unique ID provided to each other, obtained in the service account section. The Service does not provide other users with information about your partners']
        })}</div> :
        <div className={Setting.app_theme === 'light' ? 'auth_disclaimer' : 'auth_disclaimer dark'}>{SetNativeTranslate(Translate.language, {
          russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, за исключением вашего рейтинга в сервисе, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение,он не добавил вас или вы не доавили его по предоставленному друг другу уникальному айди, полученному в разделе аккаунт сервиса. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
          english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer. The Service is not a carrier, carrier representative, customer, customer representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, with the exception of your rating in the service, if he or you did not take your order to work, he or you did not agree to his offer, he did not add you or you did not add him using the unique ID provided to each other, obtained in the service account section. The Service does not provide other users with information about your partners']
        })}</div>
      } */}


    </PageContainer>
  )
})

export default Auth
import React, { useContext, useState } from 'react'
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
import { REGISTRATION_ROUTE, LOGIN_ROUTE, CUSTOMER_ROUTE, CARRIER_ROUTE, MAIN_ROUTE, RECOVERY_ROUTE } from '../../utils/consts';
import { code, login, registration, restore, update } from '../../http/userAPI'
import { observer } from 'mobx-react-lite'
import { AdressContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../..'
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


const Auth = observer(() => {
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


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    code: ''
  })

  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/

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
    await fetchUserInfo(user.user.id).then(data => data === null ? UserInfo.setUserInfo({}) : UserInfo.setUserInfo(data))
  })

  const sendCodeAction = async () => {
    try {
      let data = await code(formData.email.value)
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
      let data = await restore(formData.password.value, formData.code.value)
      setCodeSend(false)
      user.setUser(data)
      UserInfo.setUserInfo({})
      fetching()
      Notification.addNotification([{
        id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
          {
            russian: ['Пароль изиенен, доступ восстановлен, вы авторизованы'],
            english: ['Password changed, access restored, you are logged in']
          }
        )
      }])
      user.setIsAuth(true)
      if (user.user.role === 'carrier') { navigate(CARRIER_ROUTE) }
      else if (user.user.role === 'customer') { navigate(CUSTOMER_ROUTE) }
      else { navigate(MAIN_ROUTE) }
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(formData.email.value, formData.password.value)
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
        data = await registration(formData.email.value, formData.password.value, formData.role.value)
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
      user.setIsAuth(true)
      if (user.user.role === 'carrier') { navigate(CARRIER_ROUTE) }
      else if (user.user.role === 'customer') { navigate(CUSTOMER_ROUTE) }
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
      {isLogin ? <title>{SetNativeTranslate(Translate.language,{},'authorization')}</title> : isRegister ? <title>{SetNativeTranslate(Translate.language,{},'registration')}</title> : isRecovery ? <title>{SetNativeTranslate(Translate.language,{},'password_recovery')}</title> : <></>}
      <Area50></Area50>

      <Form>
        <Name>{isLogin ? SetNativeTranslate(Translate.language,{},'authorization') : isRegister ? SetNativeTranslate(Translate.language,{},'registration') : isRecovery ? SetNativeTranslate(Translate.language,{},'password_recovery') : ''} </Name>

        {(isRecovery && !codeSend) || isLogin || isRegister ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetNativeTranslate(Translate.language,{},'your_email')}
              value={formData.email.value}
              style={{ borderLeft: (formData.email.notValid || formData.email.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
              onChange={(e) => formData.email.onChange(e)}
              onBlur={e => formData.email.onBlur(e)}
              type="text" name="email" id="email"
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
            <Input placeholder={SetNativeTranslate(Translate.language,{},'your_password')}
              style={{ borderLeft: formData.password.notValid || formData.password.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
              value={formData.password.value}
              onChange={(e) => formData.password.onChange(e)} onBlur={e => formData.password.onBlur(e)} type="password" name="password" id="password"
            ></Input>
            <FieldName
              style={{
                fontWeight: 'normal',
                color: 'rgb(254, 111, 103,0.8)'
              }}
            >
              {(formData.password.isEmpty && formData.password.isDirty) || (formData.password.minLengthError) || (formData.password.maxLengthError) ?
                formData.password.errorMessage : (formData.password.formatError) ? SetNativeTranslate(Translate.language,{},'password_hint') :
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
              <Input placeholder={SetNativeTranslate(Translate.language,{},'password_repeat')} value={comparePassword} onChange={(e) => {
                setComparePassword(e.target.value)
                setComparePasswordActive(true)
              }}
                style={{ borderLeft: formData.password.value !== comparePassword || !comparePassword ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
                onBlur={e => formData.password.onBlur(e)}
                type="password"></Input>
              <FieldName
                style={{
                  fontWeight: 'normal',
                  color: 'rgb(254, 111, 103,0.8)'
                }}
              >
                {formData.password.value !== comparePassword && comparePasswordActive && !formData.password.isEmpty ?
                  SetNativeTranslate(Translate.language,{},'compare_passwords') : ''
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
                  <option disabled hidden value={formData.role.value}>{SetNativeTranslate(Translate.language,{},'who_are_you')}</option>
                  <option value='customer'>{SetNativeTranslate(Translate.language,{},'customer')}</option>
                  <option value='carrier'>{SetNativeTranslate(Translate.language,{},'carrier')}</option>
                </Select>
                <FieldName
                  style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                  }}
                >
                  {formData.role.isEmpty && formData.role.isDirty ?
                    SetNativeTranslate(Translate.language,{},'select_role') :
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
            <Input placeholder={SetNativeTranslate(Translate.language,{},'Сonfirmation_code')}
              style={{ borderLeft: formData.code.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
              value={formData.code.value}
              onChange={(e) => formData.code.onChange(e)} onBlur={e => formData.code.onBlur(e)} type="text" name="code" id="code"
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

        <ReCAPTCHA
          sitekey="6LclICciAAAAALsvyUMJwZq8Rk2GJOL3YQqN4syk"
          onChange={onRecaptchaChange}
        />

        <HorizontalContainer>
          <Button
            disabled={
              formData.email.notValid || (formData.password.notValid && (isRegister || isLogin || (isRecovery && codeSend))) || (formData.role.notValid && isRegister) || (formData.password.value !== comparePassword && (isRegister || (isRecovery && codeSend))) || !reCapchaChecked || (isRecovery && codeSend && formData.code.isEmpty)}
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
          >{isLogin ? SetNativeTranslate(Translate.language,{},'sign_in') : isRegister ? SetNativeTranslate(Translate.language,{},'sign_up') : (isRecovery && !codeSend) ? SetNativeTranslate(Translate.language,{},'send_code') : (isRecovery && codeSend) ? SetNativeTranslate(Translate.language,{},'save_and_sign_in') : ''}</Button>
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
            >{SetNativeTranslate(Translate.language,{},'send_new_code')}</Button> : <></>}
        </HorizontalContainer>

        {isLogin ?
          <div
            style={{ display: 'flex', gap: '5px' }}>

            <Link onClick={() =>
              navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language,{},'registration')}</Link>
            <Link onClick={() =>
              navigate(RECOVERY_ROUTE)}>{SetNativeTranslate(Translate.language,{},'password_recovery')}</Link>
          </div>
          : isRegister ?
            <Comment>{SetNativeTranslate(Translate.language,{},'have_an_account')}<Link onClick={() =>
              navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language,{},'sign_in')}</Link></Comment>
            : isRecovery ?
              <div
                style={{ display: 'flex', gap: '5px' }}>

                <Link onClick={() =>
                  navigate(REGISTRATION_ROUTE)}>{SetNativeTranslate(Translate.language,{},'registration')}</Link>
                <Link onClick={() =>
                  navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language,{},'sign_in')}</Link>
              </div>
              : <></>
        }
      </Form>

      {Adress.country.value === 'russia' ?
        <div className={Setting.app_theme === 'light' ? 'auth_disclaimer' : 'auth_disclaimer dark'}>{SetNativeTranslate(Translate.language, {
          russian: ['Все данные, предоставляемые в сервисе logid, далее сервисе, носят информационный характер и не являются публичной офертой определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации. Сервис не является перевозчиком, представителем перевозчика, заказчиком, представителем заказчика. Сервис собирает данные исключительно в представленном здесь объеме и с целью обеспечения коммуникации перевозчиков и заказчиков. В настоящий момент сервис не ведет проверки пользователей на юридическую чистоту и коммерческую добросовестность. Сервис ни в коей мере не несет ответственность за взаимные споры, разногласия, обстоятельства, возникшие в рамках выполнения договорных отношений между перевозчиками, заказчиками, диспетчерами и логистами. В том числе оп причине размещения перевозчиком или заказчиком недостоверной или не полной информации о заказе или статусе его прохождения, в том числе в случае возникновения технических ошибок в сервисе. Мы настоятельно рекомендуем связываться с выбранным партнером по представленным каналам связи, а также проверять документы, вести необходимую договорную работу и пользоваться страхованием грузов. Продолжая использование данного сервиса вы даете согласие на обработку ваших персональных данных в соответствии с соглашением о конфиденциальности и политикой использования персональных данных. Размещая заказ, соглашаясь на предложение, беря заказ в работу, вы осознаете, что представленные вами в сервис данные, а также ваш рейтинг внутри сервиса будут доступны заказчику или перевозчику с которым вы вступаете в коммуникацию, в полном объеме, с целью обеспечения юридической чистоты сделки. Сервис не предоставляет ваши данные партнеру и данные партнера вам, если он или вы не брали ваш заказ в работу, он или вы не соглашались на его предложение. Сервис не предоставляет другим пользователям информацию о ваших партнерах'],
          english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer determined by the provisions of Article 437 of the Civil Code of the Russian Federation. The service is not a carrier, a carrier`s representative, a customer, a customer`s representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, if he or you did not take your order to work, he or you did not agree to his offer. The Service does not provide other users with information about your partners']
        })}</div> :
        <div className={Setting.app_theme === 'light' ? 'auth_disclaimer' : 'auth_disclaimer dark'}>{SetNativeTranslate(Translate.language, {
          russian: ['No such language in your country'],
          english: ['All data provided in the logid service, hereinafter referred to as the service, is for informational purposes and is not a public offer. The service is not a carrier, a carrier`s representative, a customer, a customer`s representative. The service collects data solely to the extent presented here and for the purpose of ensuring communication between carriers and customers. At the moment, the service does not check users for legal purity and commercial integrity. The service is in no way responsible for mutual disputes, disagreements, circumstances that arose as part of the implementation of contractual relations between carriers, customers, dispatchers and logisticians. Including the reason for the placement by the carrier or the customer of inaccurate or incomplete information about the order or the status of its passage, including in the event of technical errors in the service. We strongly recommend contacting the selected partner through the provided communication channels, as well as checking documents, conducting the necessary contractual work and using cargo insurance. By continuing to use this service, you consent to the processing of your personal data in accordance with the confidentiality agreement and the policy on the use of personal data. By placing an order, agreeing to an offer, taking an order to work, you understand that the data you submitted to the service, as well as your rating within the service, will be available to the customer or carrier with whom you enter into communication in full, in order to ensure the legal purity of the transaction . The service does not provide your data to the partner and the data of the partner to you, if he or you did not take your order to work, he or you did not agree to his offer. The Service does not provide other users with information about your partners']
        })}</div>


      }


    </PageContainer>
  )
})

export default Auth
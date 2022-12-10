import React, { useContext, useState } from 'react'
import { Link } from '../components/ui/link/Link'
import { Area50 } from '../components/ui/area/Area50'
import { Button } from '../components/ui/button/Button'
import { Form } from '../components/ui/form/Form'
import { Input } from '../components/ui/form/Input'
import { Name } from '../components/ui/text/Name'
import { Select } from '../components/ui/form/Select'
import PageContainer from '../components/ui/page/PageContainer'
import { Comment } from '../components/ui/form/Comment'
import { useNavigate, useLocation } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, CUSTOMER_ROUTE, CARRIER_ROUTE, MAIN_ROUTE, RECOVERY_ROUTE } from '../../src/utils/consts';
import { code, login, registration, restore, update } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { TranslateContext, UserContext, UserInfoContext } from '..'
import { useFetching } from '../hooks/useFetching'
import { fetchUserInfo } from '../http/userInfoApi'
import { useInput } from '../hooks/useInput'
import { VerticalContainer } from '../components/ui/page/VerticalContainer'
import { FieldName } from '../components/ui/page/FieldName'
import { v4 } from "uuid";
import { NotificationContext } from '../index'
import ReCAPTCHA from "react-google-recaptcha";
import { HorizontalContainer } from '../components/ui/page/HorizontalContainer'
import { SetTranslate } from '../modules/SetTranslate'
import { SetNativeTranslate } from '../modules/SetNativeTranslate'


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


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    code: ''
  })

  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/

    formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetTranslate(Translate.language, 'email'))
  formData.password = useInput('', { isEmpty: true, minLength: 6, maxLength: 20, validFormat: validPassword }, SetTranslate(Translate.language, 'password').toLowerCase())
  formData.role = useInput('', { isEmpty: true })
  formData.code = useInput('', { isEmpty: true }, SetTranslate(Translate.language, 'confirmation_code'))


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
      {isLogin ? <title>{SetTranslate(Translate.language, 'authorization')}</title> : isRegister ? <title>{SetTranslate(Translate.language,'registration')}</title> : isRecovery ? <title>{SetTranslate(Translate.language,'password_recovery')}</title> : <></>}
      <Area50></Area50>

      <Form>
        <Name>{isLogin ? SetTranslate(Translate.language,'authorization') : isRegister ? SetTranslate(Translate.language,'registration') : isRecovery ? SetTranslate(Translate.language,'password_recovery') : ''} </Name>

        {(isRecovery && !codeSend) || isLogin || isRegister ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetTranslate(Translate.language, 'your_email')}
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
            <Input placeholder={SetTranslate(Translate.language,'your_password')}
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
              {(formData.password.isEmpty && formData.password.isDirty) || (formData.password.minLengthError) || (formData.password.maxLengthError) || (formData.password.formatError) ?
                formData.password.errorMessage :
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
              <Input placeholder={SetTranslate(Translate.language, 'password_repeat')} value={comparePassword} onChange={(e) => {
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
                  SetTranslate(Translate.language, 'compare_passwords') : ''
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
                  <option disabled hidden value={formData.role.value}>{SetTranslate(Translate.language, 'who_are_you')}</option>
                  <option value='customer'>{SetTranslate(Translate.language, 'customer')}</option>
                  <option value='carrier'>{SetTranslate(Translate.language, 'carrier')}</option>
                </Select>
                <FieldName
                  style={{
                    fontWeight: 'normal',
                    color: 'rgb(254, 111, 103,0.8)'
                  }}
                >
                  {formData.role.isEmpty && formData.role.isDirty ?
                    SetTranslate(Translate.language, 'select_role') :
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
            <Input placeholder={SetTranslate(Translate.language, 'Сonfirmation_code')}
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
          >{isLogin ? SetTranslate(Translate.language, 'sign_in') : isRegister ? SetTranslate(Translate.language, 'sign_up') : (isRecovery && !codeSend) ? SetTranslate(Translate.language, 'send_code') : (isRecovery && codeSend) ? SetTranslate(Translate.language, 'save_and_sign_in') : ''}</Button>
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
            >{SetTranslate(Translate.language, 'send_new_code')}</Button> : <></>}
        </HorizontalContainer>

        {isLogin ?
          <div
            style={{ display: 'flex', gap: '5px' }}>

            <Link onClick={() =>
              navigate(REGISTRATION_ROUTE)}>{SetTranslate(Translate.language, 'registration')}</Link>
            <Link onClick={() =>
              navigate(RECOVERY_ROUTE)}>{SetTranslate(Translate.language, 'password_recovery')}</Link>
          </div>
          : isRegister ?
            <Comment>{SetTranslate(Translate.language, 'have_an_account')}<Link onClick={() =>
              navigate(LOGIN_ROUTE)}>{SetTranslate(Translate.language, 'sign_in')}</Link></Comment>
            : isRecovery ?
              <div
                style={{ display: 'flex', gap: '5px' }}>

                <Link onClick={() =>
                  navigate(REGISTRATION_ROUTE)}>{SetTranslate(Translate.language, 'registration')}</Link>
                <Link onClick={() =>
                  navigate(LOGIN_ROUTE)}>{SetTranslate(Translate.language, 'sign_in')}</Link>
              </div>
              : <></>
        }
      </Form>
    </PageContainer>
  )
})

export default Auth
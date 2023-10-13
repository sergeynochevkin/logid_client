import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button/Button'
import { Form } from '../ui/form/Form'
import { Input } from '../ui/form/Input'
import { Name } from '../ui/text/Name'
import { Select } from '../ui/form/Select'
import { Comment } from '../ui/form/Comment'
import { useLocation, useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, USER_ROUTE, MANAGER_ROUTE } from '../../utils/consts';
import { activateDriver, code, fast_registration, login, restore } from '../../http/userAPI'
import { observer } from 'mobx-react-lite'
import { AdressContext, ComponentFunctionContext, FetcherContext, LinkContext, OrderContext, SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../..'
import { useFetching } from '../../hooks/useFetching'
import { fetchUserInfo } from '../../http/userInfoApi'
import { useInput } from '../../hooks/useInput'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { FieldName } from '../ui/page/FieldName'
import { v4 } from "uuid";
import { NotificationContext } from '../../index'
import ReCAPTCHA from "react-google-recaptcha";
import { HorizontalContainer } from '../ui/page/HorizontalContainer'

import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import './Auth.css'
import { fetchUserState } from '../../http/stateApi'
import { CheckBoxContainer } from '../ui/form/CheckBoxContainer'
import { CheckBoxSection } from '../ui/form/CheckBoxSection'
import TransportFormSection from '../transport/TransportFormSection'
import City from '../account/userInfoForm/City'
import { addContactView } from '../../http/adApi'
import PromoCodeComponent from './PromoCodeComponent'

import ym from 'react-yandex-metrika';



const Auth = observer(({ enterPoint, setModalActive, modalActive, parent, after_action }) => {
  const { user } = useContext(UserContext)
  const { link } = useContext(LinkContext)
  const { UserInfo } = useContext(UserInfoContext)
  const queryParams = new URLSearchParams(window.location.search)
  const { order } = useContext(OrderContext)
  let location = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isRecovery, setIsRecovery] = useState(false)
  const navigate = useNavigate()
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
  const order_status = queryParams.get("o_s")
  const role = queryParams.get("role")


  const [agreements, setAgreements] = useState(false)



  let ip = localStorage.getItem('currentIp')

  const enterAction = (enterPoint) => {
    if (enterPoint === 'isLogin') {
      setIsLogin(true)
      setIsRegister(false)
      setIsRecovery(false)
    }
    if (enterPoint === 'isRegister') {
      setIsRegister(true)
      setIsLogin(false)
      setIsRecovery(false)

    }
    if (enterPoint === 'isRecovery') {
      setIsRecovery(true)
      setIsLogin(false)
      setIsRegister(false)
    }
  }

  useEffect(() => {
    enterAction(enterPoint)
  }, [])

  useEffect(() => {
    if (!modalActive) {
      formReset()
    }
  }, [modalActive])

  let formReset = () => {
    setComparePassword('')

    formData.email.setValue('')
    formData.password.setValue('')
    formData.role.setValue('')
    formData.country.setValue('')
    formData.phone.setValue('')

    formData.email.setDirty(false)
    formData.password.setDirty(false)
    formData.role.setDirty(false)
    formData.country.setDirty(false)
    formData.phone.setDirty(false)

    // formData.tag.setValue('')
    // formData.tag.setDirty(false)
    // formData.ad_text.setValue('')
    // formData.ad_text.setDirty(false)
    // formData.type.setValue('')
    // formData.load_capacity.setValue('')
    // formData.side_type.setValue('')
    // formData.type.setDirty(false)
    // formData.load_capacity.setDirty(false)
    // formData.side_type.setDirty(false)
    setFormData(initialValue)
  }



  // let cookies_accepted = JSON.parse(localStorage.getItem('cookies_accepted'))

  let initialValue = {
    email: '',
    password: '',
    role: '',
    code: '',
    country: '',
    user_agreement_accepted: false,
    privacy_policy_accepted: false,
    age_accepted: false,
    personal_data_agreement_accepted: false,
    cookies_accepted: { total: false },
    promo_code: '',

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



  // const isLogin = location.pathname === LOGIN_ROUTE
  // const isRegister = location.pathname === REGISTRATION_ROUTE
  // const isRecovery = location.pathname === RECOVERY_ROUTE


  // set without routes if parent component at stay at the component after actions

  const [formData, setFormData] = useState(initialValue)


  const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  formData.country = useInput('', { isEmpty: true })
  const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s])/
  const validPhone = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/
  formData.phone = useInput('', { isEmpty: true, minLength: 6, maxLength: 18, validFormat: validPhone }, SetNativeTranslate(Translate.language, {}, 'phone_content'))

  formData.email = useInput('', { isEmpty: true, minLength: 6, maxLength: 40, validFormat: validEmail }, SetNativeTranslate(Translate.language, {
    russian: ['email'],
    english: ['email'],
    spanish: ['email'],
    turkish: ['e-posta'],
    сhinese: ['电子邮件'],
    hindi: ['ईमेल'],
  }))
  formData.password = useInput('', { isEmpty: true, minLength: 6, maxLength: 20, validFormat: validPassword }, SetNativeTranslate(Translate.language, {
    russian: ['пароль'],
    english: ['password'],
    spanish: ['contraseña'],
    turkish: ['şifre'],
    сhinese: ['密码'],
    hindi: ['पासवर्ड'],
  }))
  formData.role = useInput('', { isEmpty: true })
  formData.code = useInput('', { isEmpty: true }, SetNativeTranslate(Translate.language, {
    russian: ['код подтверждения'],
    english: ['confirmation code'],
    spanish: ['código de confirmación'],
    turkish: ['onay kodu'],
    сhinese: ['验证码'],
    hindi: ['पुष्टि कोड'],
  }))

  formData.load_capacity = useInput('', { isEmpty: true },)
  formData.side_type = useInput('', { isEmpty: true },)
  formData.type = useInput('', { isEmpty: true },)
  formData.tag = SetNativeTranslate(Translate.language, {
    russian: ['Первый способ доставки'],
    english: ['First shipping method'],
    spanish: ['Primer método de envío'],
    turkish: ['İlk gönderim yöntemi`'],
    сhinese: ['第一种运输方式'],
    hindi: ['पहली शिपिंग विधि'],
  })

  formData.country.value = Adress.country.value

  if (enterPoint === 'isRegister' && location.pathname !== "/board") {
    formData.role.value = !role ? '' : role
    formData.role.isEmpty = !role ? true : false
    formData.role.notValid = !role ? true : false
  }

  if (location.pathname === "/board" && enterPoint === 'isRegister') {
    formData.role.value = 'carrier'
    formData.role.isEmpty = false
    formData.role.notValid = false
  }

  useEffect(() => {
    let data = { ...formData }
    data.cookies_accepted.total = agreements
    setFormData({ ...data, user_agreement_accepted: agreements, privacy_policy_accepted: agreements, age_accepted: agreements, personal_data_agreement_accepted: agreements })
  }, [agreements])


  const [fetching, error] = useFetching(async () => {


    if (user.user.role === 'carrier' || user.user.role === 'customer') {
      fetcher.setDrivers(true)
    }

    await fetchUserInfo(user.user.id).then(data => {
      if (data === null) {
        UserInfo.setUserInfo({})
        // auth preload for admin!
        if (user.user.role === 'admin') {
          fetcher.setManagementRegistrations(true)
          fetcher.setManagementVisits(true)
          fetcher.setManagementUsers(true)
          fetcher.setManagementTransports(true)
          fetcher.setManagementOrders(true)
        }
      } else {
        UserInfo.setUserInfo(data)
        data && fetcher.setUserAppSetting(true)

        fetcher.setUserInfo(true)

        if (user.user.role === 'driver') {
          fetchUserInfo(user.user.user_id).then(data => { user.setSupervisor(data) })
        }


        if (data.country !== Adress.country.value) {
          Adress.setCountry(Adress.countries.find(el => el.value === data.country))
        }
        fetchUserState(data.id).then(stateData => {
          let state = JSON.parse(stateData.state)
          if (user.user.role === 'driver') {
            State.setSupervisorState(stateData.supervisor_state)
          }
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

          if (order_status) {
            order_status === 'new' && fetcher.setOrdersNew(true)
            order_status === 'inWork' && fetcher.setOrdersInWork(true)
            setTimeout(() => {
              fetcher.setOrdersAll(true)
            }, 1000)
          } else {
            fetcher.setOrdersAll(true)
          }

          fetcher.setSubscriptions(true)
        }

        if (user.user.role === 'carrier' || user.user.role === 'driver') {
          fetcher.setTransports(true)
        }

        if (after_action && data) {
          if (after_action.action === 'transport_contact_viewed') {
            addContactView('transport', after_action.transportId, ip, data.id)
            fetcher.setAdTransports(true)
          }

          if (after_action.action === 'add_ad') {
            if (user.user.role === 'carrier') {
              ComponentFunction.setPageFunction('transport')
            }

            if (user.user.role === 'customer') {
              let message = SetNativeTranslate(Translate.language,
                {
                  russian: ['Вы являетесь заказчиком и не можете добавить объявление, как перевозчик. Создайте аккаунт перевозчика'],
                  english: ['You are a customer and cannot add an ad as a carrier. Create a carrier account'],
                  spanish: ['Eres cliente y no puedes agregar un anuncio como transportista. Crear una cuenta de operador'],
                  turkish: ['Müşterisiniz ve operatör olarak reklam ekleyemezsiniz. Operatör hesabı oluşturun'],
                  сhinese: ['您是客户，无法添加广告作为载体。 创建运营商帐户'],
                  hindi: ['आप एक ग्राहक हैं और वाहक के रूप में कोई विज्ञापन नहीं जोड़ सकते। एक वाहक खाता बनाएँ'],
                }
              )

              !Notification.notifications.find(el => el.message === message) && Notification.addNotification([{
                id: v4(), type: 'error', message: message
              }])
            }
          }

          //problems!
          if (after_action.action === 'add_order') {
            if (user.user.role === 'carrier' || user.user.role === 'driver') {
              let message = SetNativeTranslate(Translate.language,
                {
                  russian: ['Вы являетесь перевозчиком и не можете создавать заказы. Создайте аккаунт заказчика'],
                  english: ['You are a carrier and cannot create orders. Create a customer account'],
                  spanish: ['Eres transportista y no puedes crear pedidos. Crear una cuenta de cliente'],
                  turkish: ['Taşıyıcısınız ve sipariş oluşturamazsınız. Müşteri hesabı oluşturun'],
                  сhinese: ['您是承运人，无法创建订单。 创建客户帐户'],
                  hindi: ['आप एक वाहक हैं और ऑर्डर नहीं बना सकते. एक ग्राहक खाता बनाएं'],
                }
              )
              !Notification.notifications.find(el => el.message === message) && Notification.addNotification([{
                id: v4(), type: 'error', message: message
              }])
            } else if (user.user.role === 'customer') {
              order.setIntegrationId()
              ComponentFunction.setPageFunction('orderForm')
              ComponentFunction.setOrderFormFunction('newOrder')
            }
          }
          navigate(USER_ROUTE)
        }



        if ((parent === 'navBar' || parent === 'fleet') && !after_action) {
          if (user.user.role === 'carrier' || user.user.role === 'customer' || user.user.role === 'driver') { navigate(USER_ROUTE) }
          else if (user.user.role === 'manager') { navigate(MANAGER_ROUTE) }
          else if (user.user.role === 'admin') { navigate(MAIN_ROUTE) }
          else { navigate(MAIN_ROUTE) }
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
            english: ['Code sent'],
            spanish: ['Código enviado'],
            turkish: ['Kod gönderildi'],
            сhinese: ['代码发送'],
            hindi: ['कोड भेजा है'],
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
            english: ['Password changed, access restored, you are logged in'],
            spanish: ['Contraseña cambiada, acceso restaurado, has iniciado sesión'],
            turkish: ['Şifre değiştirildi, erişim yeniden sağlandı, oturum açtınız'],
            сhinese: ['密码已更改，访问已恢复，您已登录'],
            hindi: ['पासवर्ड बदल गया, पहुंच बहाल हो गई, आप लॉग इन हैं'],
          }
        )
      }])
      user.setIsAuth(true)

      fetching()

      if (parent === 'navBar') {
        if (user.user.role === 'carrier' || user.user.role === 'customer' || user.user.role === 'driver') { navigate(USER_ROUTE) }
        else if (user.user.role === 'manager') { navigate(MANAGER_ROUTE) }
        else if (user.user.role === 'admin') { navigate(MAIN_ROUTE) }
        else { navigate(MAIN_ROUTE) }
      }


      setModalActive(false)

      setModalActive(false)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
    }
  }


  const click = async () => {
    try {
      let data;
      fetcher.setCustomLoading(true)
      if (isLogin) {
        data = await login(formData.email.value, formData.password.value, Translate.language, formData.user_agreement_accepted,
          formData.privacy_policy_accepted,
          formData.age_accepted,
          formData.personal_data_agreement_accepted,
          formData.cookies_accepted)
        user.setUser(data)

        if (link.after_actions.driver_activation && !data.isActivated) {
          try {
            await activateDriver(data.id, Translate.language).then(data => {
              Notification.addNotification([{
                id: v4(), type: 'success', message: data
              }])
              link.setAfterActions(false, 'driver_activation')
            })
          } catch (error) {
            Notification.addNotification([{ id: v4(), type: 'error', message: error.response.data.message }])
          }
        }

        Notification.addNotification([{
          id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
            {
              russian: ['Вы авторизованы'],
              english: ['You are logged in'],
              spanish: ['Has iniciado sesión'],
              turkish: ['Giriş yaptınız'],
              сhinese: ['您已登录'],
              hindi: ['आप लोग्ड इन हो चुके हैं'],
            }
          )
        }])       
      }
      else {
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
          formData.promo_code
        )
        user.setUser(data)

        ym('reachGoal', location.pathname === '/board' ? 'boardSignUp' : location.pathname === '/fleet' ? 'fleetSignUp' : 'mainSignUp')

        Notification.addNotification([{
          id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
            {
              russian: ['Вы зарегистрированы, ссылка для активации аккаунта и пароль отрправлены на указанный email'],
              english: ['You are registered, a link to activate your account and password have been sent to the specified email'],
              spanish: ['Estás registrado, se ha enviado un enlace para activar tu cuenta y contraseña al correo electrónico especificado'],
              turkish: ['Kayıt oldunuz, hesabınızı etkinleştirmeniz için bir bağlantı ve şifreniz belirtilen e-posta adresinize gönderildi'],
              сhinese: ['您已注册，激活您帐户的链接和密码已发送至指定电子邮件。'],
              hindi: ['आप पंजीकृत हैं, आपके खाते को सक्रिय करने के लिए एक लिंक और पासवर्ड निर्दिष्ट ईमेल पर भेज दिया गया है।'],
            }
          )
        }])
      }


      fetching()
      // localStorage.setItem('cookies_accepted', JSON.stringify({ total: true, auth: true, main: true }))
      user.setIsAuth(true)
      fetcher.setCustomLoading(false)
      if (parent === 'navBar') {
        if (user.user.role === 'carrier' || user.user.role === 'customer') { navigate(USER_ROUTE) }
        else if (user.user.role === 'manager') { navigate(MANAGER_ROUTE) }
        else if (user.user.role === 'admin') { navigate(MAIN_ROUTE) }
        else { navigate(MAIN_ROUTE) }
      }
      setModalActive(false)
    } catch (e) {
      Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
      fetcher.setCustomLoading(false)
    }
  }

  function onRecaptchaChange() {
    setReCapchaChecked(true)
  }

  return (
    <div className='auth_container'>
      {/* {isLogin ? <title>{SetNativeTranslate(Translate.language, {}, 'authorization')}</title> : isRegister ? <title>{SetNativeTranslate(Translate.language, {}, 'registration')}</title> : isRecovery ? <title>{SetNativeTranslate(Translate.language, {}, 'password_recovery')}</title> : <></>} */}

      <Form>
        <Name>{isLogin ? SetNativeTranslate(Translate.language, {}, 'authorization') : isRegister ? SetNativeTranslate(Translate.language, {}, 'registration') : isRecovery ? SetNativeTranslate(Translate.language, {}, 'password_recovery') : ''} </Name>

        {/* {isRegister && <Country setFormData={setFormData} formData={formData} parent='auth' />} */}

        {isRegister &&
          <div className='fast_sign_up_section'>
            <City parent={'fast_sign_up'} formData={formData} setFormData={setFormData} id={'city_1'} />
          </div>}

        {isRegister &&
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetNativeTranslate(Translate.language, {
              russian: ['Ваш телефон'],
              english: ['Your phone'],
              spanish: ['Su teléfono'],
              turkish: ['Telefonunuz'],
              сhinese: ['您的手机'],
              hindi: ['अपने फोन को'],
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
        }

        {(isRecovery && !codeSend) || isLogin || isRegister ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'your_email')}
              value={formData.email.value}
              style={{ borderLeft: (formData.email.notValid || formData.email.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
              onChange={(e) => formData.email.onChange(e)}
              onBlur={e => formData.email.onBlur(e)}
              type="text" name="email"
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

        {isLogin || (isRecovery && codeSend) ?
          <VerticalContainer
            style={{ gap: '0px' }}
          >
            <Input placeholder={SetNativeTranslate(Translate.language, {}, 'your_password')}
              style={{ borderLeft: formData.password.notValid || formData.password.isEmpty ? 'solid 1px rgb(254, 111, 103,0.8)' : '' }}
              value={formData.password.value}
              onChange={(e) => formData.password.onChange(e)} onBlur={e => formData.password.onBlur(e)} type="password" name="password"
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
            {!isRegister &&
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
            }


            {isRegister && !role ? <>
              {!link.after_actions.add_transport_form ?
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
                </VerticalContainer> : <></>}

              {formData.role.value === 'carrier' && !link.after_actions.add_transport_form ?
                <div className='fast_sign_up_section'>
                  <TransportFormSection parent={'fast_sign_up'} formData={formData} setFormData={setFormData} />
                </div>
                : <></>
              }
            </>
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

        {isRegister || (isLogin && link.after_actions.driver_activation) ?
          <div className='auth_check_box_list_section'>
            <div className='auth_check_box_list_container'>
              {Adress.country.value === 'russia' &&
                <>
                  <CheckBoxContainer >
                    <CheckBoxSection >
                      <input type='checkbox' className='auth_checkbox' checked={agreements && 'checked'} value={agreements} onChange={() => {
                        !agreements ? setAgreements(true) :
                          setAgreements(false)
                      }}></input>
                      <label className='auth_check_box_label' >
                        <div className='auth_checkbox_text'>
                          <div>
                            {SetNativeTranslate(Translate.language, {
                              russian: [`подтвердите согласие с`],
                              english: [`confirm your agreement with`],
                              spanish: [`confirma tu acuerdo con`],
                              turkish: [`ile anlaşmanızı onaylayın`],
                              сhinese: ['确认您同意'],
                              hindi: ['के साथ अपने समझौते की पुष्टि करें'],
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
                              english: [`user agremeent`],
                              spanish: [`acuerdo del usuario`],
                              turkish: [`kullanıcı sözleşmesi`],
                              сhinese: ['用户协议'],
                              hindi: ['用户协议'],
                            })}
                          </div>
                          ,
                          <div className='auth_agreement_link'
                            onClick={() => {
                              ComponentFunction.setAgreement('PrivacyPolicy')
                              ComponentFunction.setAgreementModal(true)
                            }}
                          >
                            {SetNativeTranslate(Translate.language, {
                              russian: [`политикой конфиденциальности`],
                              english: [`privacy policy`],
                              spanish: [`política de privacidad`],
                              turkish: [`gizlilik politikası`],
                              сhinese: ['隐私政策'],
                              hindi: ['गोपनीयता नीति'],
                            })}
                          </div>
                          ,
                          <div className='auth_agreement_link'
                            onClick={() => {
                              ComponentFunction.setAgreement('PersonalDataAgreement')
                              ComponentFunction.setAgreementModal(true)
                            }}
                          >
                            {SetNativeTranslate(Translate.language, {
                              russian: [`согласие на обработку персональных данных`],
                              english: [`consent to the processing of personal data`],
                              spanish: [`consentimiento para el tratamiento de datos personales`],
                              turkish: [`kişisel verilerin işlenmesine onay vermek`],
                              сhinese: ['同意处理个人数据'],
                              hindi: ['व्यक्तिगत डेटा के प्रसंस्करण के लिए सहमति'],
                            })}
                          </div>
                          ,
                          <div>
                            {SetNativeTranslate(Translate.language, {
                              russian: [`согласие на сбор cookies`],
                              english: [`consent to the collection of cookies`],
                              spanish: [`consentimiento para la recopilación de cookies`],
                              turkish: [`çerezlerin toplanmasına izin ver`],
                              сhinese: ['同意收集 cookie'],
                              hindi: ['कुकीज़ के संग्रह के लिए सहमति'],
                            })}
                          </div>
                          ,
                          <div>
                            {SetNativeTranslate(Translate.language, {
                              russian: [`а также, что вам исполнилось 18 лет`],
                              english: [`and also that you are over 18 years old`],
                              spanish: [`y además que seas mayor de 18 años`],
                              turkish: [`ve ayrıca 18 yaşın üzerinde olduğunuzu`],
                              сhinese: ['并且您已年满 18 岁'],
                              hindi: ['और यह भी कि आपकी उम्र 18 वर्ष से अधिक है'],
                            })}
                          </div>

                        </div>
                      </label>
                    </CheckBoxSection>
                  </CheckBoxContainer>

                </>}

            </div>
          </div>
          : <></>
        }

        <ReCAPTCHA
          sitekey="6LclICciAAAAALsvyUMJwZq8Rk2GJOL3YQqN4syk"
          onChange={onRecaptchaChange}
        />

        {isRegister ?
          <PromoCodeComponent formData={formData} setFormData={setFormData} />
          : <></>
        }

        <HorizontalContainer>
          <Button
            disabled={
              formData.email.notValid ||
              formData.phone.notValid && isRegister ||
              (formData.password.notValid && (isLogin || (isRecovery && codeSend))) ||
              (formData.role.notValid && isRegister) ||
              (formData.password.value !== comparePassword && ((isRecovery && codeSend))) ||
              !reCapchaChecked ||
              (isRecovery && codeSend && formData.code.isEmpty) ||
              (isRegister && !formData.user_agreement_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.privacy_policy_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.age_accepted && Adress.country.value === 'russia') ||
              (isRegister && !formData.cookies_accepted.total) ||
              (isRegister && !formData.personal_data_agreement_accepted)
              ||
              (isRegister && formData.role.value === 'carrier' && formData.type.isEmpty && !link.after_actions.add_transport_form)
              || (formData.load_capacity.isEmpty && formData.type.value === 'truck' && !link.after_actions.add_transport_form)
              || (formData.load_capacity.isEmpty && formData.type.value === 'minibus' && !link.after_actions.add_transport_form)
              || (formData.side_type.isEmpty && formData.type.value === 'truck' && !link.after_actions.add_transport_form)

              || (isLogin && link.after_actions.driver_activation && !formData.user_agreement_accepted && Adress.country.value === 'russia')
              || (isLogin && link.after_actions.driver_activation && !formData.age_accepted && Adress.country.value === 'russia')
              || (isLogin && link.after_actions.driver_activation && !formData.cookies_accepted.total && Adress.country.value === 'russia')
              || (isLogin && link.after_actions.driver_activation && !formData.personal_data_agreement_accepted && Adress.country.value === 'russia')
              || (isLogin && link.after_actions.driver_activation && !formData.privacy_policy_accepted && Adress.country.value === 'russia')
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

            <div className='auth_link' onClick={() =>
              enterAction('isRegister')}>{SetNativeTranslate(Translate.language, {}, 'registration')}</div>
            <div className='auth_link' onClick={() =>
              enterAction('isRecovery')}>{SetNativeTranslate(Translate.language, {}, 'password_recovery')}</div>
          </div>
          : isRegister ?
            <Comment>{SetNativeTranslate(Translate.language, {}, 'have_an_account')}<div className='auth_link' onClick={() =>
              enterAction('isLogin')}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</div></Comment>
            : isRecovery ?
              <div
                style={{ display: 'flex', gap: '5px' }}>

                <div className='auth_link' onClick={() =>
                  enterAction('isRegister')}>{SetNativeTranslate(Translate.language, {}, 'registration')}</div>
                <div className='auth_link' onClick={() =>
                  enterAction('isRegister')}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</div>
              </div>
              : <></>
        }
      </Form>





    </div>
  )
})

export default Auth
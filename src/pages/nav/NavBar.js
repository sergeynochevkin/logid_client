import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, OrderContext, SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../..';
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, USER_ROUTE, ADMIN_ROUTE, MANAGER_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import NotificationComponent from '../../components/notification/NotificationComponent';
import { logout } from '../../http/userAPI';
import './NavBar.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import Modal from '../../components/ui/modal/Modal';
import CountrySelector from './CountrySelector';
import NotificationIcon from '../../components/notification/NotificationIcon';
import ServerNotificationList from '../../components/notification/ServerNotificationList';
import dark_mode from '../../assets/icons/dark_mode.png';
import light_mode from '../../assets/icons/light_mode.png';
import logo_light from '../../assets/logo_light.png';
import logo_dark from '../../assets/logo_dark.png';
import logo_russian_dark from '../../assets/logo_russian_dark.png';

import logo_russian_light from '../../assets/logo_russian_light.png';
import Auth from '../../components/auth/Auth';
import ShareModalContent from '../../components/share/ShareModalContent';
import ShareComponent from '../../components/share/ShareComponent';

const NavBar = observer(() => {
  const { user } = useContext(UserContext)
  const { order } = useContext(OrderContext)
  const { State } = useContext(StateContext)
  const navigate = useNavigate()
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const [modalActive, setModalActive] = useState(false)
  const [modalActive1, setModalActive1] = useState(false)
  const [modalActive2, setModalActive2] = useState(false)
  const [name, setName] = useState('')

  const setLanguage = (language) => {
    Translate.setLanguage(language)
    if (UserInfo.userInfo) {
      if (user && user.isAuth) {
        State.setUserStateField(language, 'language', UserInfo.userInfo.id)
      }
    }
  }

  // useEffect(() => {
  //   !Adress.country_detected && setModalActive(true)
  // }, [])

  useEffect(() => {
    if (order.link_order.id && !user.isAuth) {
      setModalActive1(true)
    }
  }, [])

  return (
    <>
      <div className={Setting.app_theme === 'light' ? 'nav_bar_container' : 'nav_bar_container nav_bar_container_dark'}>
        <NotificationComponent />

        <NotificationIcon
          modalActive={modalActive2}
          setModalActive={setModalActive2} />
        <Modal
          parent={'serverNotifications'}
          modalActive={modalActive2}
          setModalActive={setModalActive2}
        >
          <ServerNotificationList setModalActive={setModalActive2} />
        </Modal>

        <Modal setModalActive={setModalActive1} modalActive={modalActive1}>
          <Auth enterPoint={'isLogin'} setModalActive={setModalActive1} modalActive={modalActive1} parent={'navBar'} />
        </Modal>

        <div className='nav_bar_logo_container' onClick={() =>
          navigate(MAIN_ROUTE)}>

          <img src={Setting.app_theme === 'light' && Translate.language === 'russian' ? logo_russian_light :
            Setting.app_theme === 'light' && Translate.language !== 'russian' ? logo_light :
              Setting.app_theme === 'dark' && Translate.language === 'russian' ? logo_russian_dark :
                Setting.app_theme === 'dark' ? logo_dark : logo_light}
            className='nav_bar_logo' />

        </div>
        {/* <Item onClick={() =>
        navigate(MAIN_ROUTE)}>Main</Item> */}
        {user.user.role === "customer" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(USER_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'customers_office')}</div> :
          <></>
        }

        {user.user.role === "carrier" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(USER_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'carriers_office')}</div> :
          <></>
        }

        {user.user.role === "manager" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(MANAGER_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'managers_office')}</div> :
          <></>
        }

        {user.user.role === "admin" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(ADMIN_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'administrators_office')}</div> :
          <></>
        }

        {user.isAuth ?
          <div className='nav_bar_item' onClick={
            async () => {
              await logout()
              order.setOrders([]);
              user.setIsAuth(false);
              user.setUser({});
              UserInfo.setUserInfo({})
              localStorage.clear()
              localStorage.setItem('cookies_accepted', JSON.stringify({ total: false, auth: false, main: true }))
            }}>{SetNativeTranslate(Translate.language, {}, 'sign_out')}</div> :
          <div className='nav_bar_item' onClick={() =>
            setModalActive1(true)}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</div>
        }


        <div className="nav_bar_theme_icon"
          onClick={() => {
            if (Setting.app_theme === 'dark') {
              Setting.setAppTheme('light')
              if (user && user.isAuth) {
                State.setUserStateField('light', 'app_theme', UserInfo.userInfo.id)
              }
            } else {
              Setting.setAppTheme('dark')
              if (user && user.isAuth) {
                State.setUserStateField('dark', 'app_theme', UserInfo.userInfo.id)
              }
            }
          }}
        >
          {Setting.app_theme === 'light' ? <img src={dark_mode} className='nav_bar_theme_icon' /> : <img src={light_mode} className='nav_bar_theme_icon' />}
        </div>

        {!user.isAuth && <ShareComponent />}


        {/* language of my country + english if english is your language, no select, set language state when select if isAuth. Сheck such language for such country when loading!*/}
        <div className='nav_bar_item language_switch'
          onClick={() => {
            if (Translate.language === 'russian') {
              setLanguage('english')
            } else if (Translate.language === 'english' && Adress.country.sector === 'one') {
              setLanguage('russian')
            }
          }}
        >{Translate.language === 'russian' ? 'EN' : Translate.language === 'english' && Adress.country.sector === 'one' ? 'RU' : ''}</div>

        <div
          // className={!user.isAuth ? 'nav_bar_item' : 'nav_bar_item disabled'}
          className={'nav_bar_item disabled'}
          disabled={user.isAuth}
          onClick={() => {
            // if (!modalActive && !user.isAuth) {
            //   setModalActive(true)
            //   setName(SetNativeTranslate(Translate.language, {
            //     russian: ['Выберите страну из списка'],
            //     english: ['Select your country']
            //   }))
            // } else if (modalActive) {
            //   setModalActive(false)
            // }
          }
          }>{Translate.language && SetNativeTranslate(Translate.language, {}, Adress.country.value)}</div>


      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive} >
        <CountrySelector name={name} setModalActive={setModalActive} />
      </Modal>  
    </>

  )
})

export default NavBar
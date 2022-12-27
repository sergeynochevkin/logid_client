import React, { useContext, useEffect, useState } from 'react'
import { AdressContext, OrderContext, SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../../..';
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, CARRIER_ROUTE, CUSTOMER_ROUTE, ADMIN_ROUTE, MANAGER_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import NotificationComponent from '../../notification/NotificationComponent';
import { logout } from '../../../http/userAPI';
import './NavBar.css'
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate';
import Modal from '../modal/Modal';

const NavBar = observer(() => {
  const { user } = useContext(UserContext)
  const { order } = useContext(OrderContext)
  const { State } = useContext(StateContext)
  const navigate = useNavigate()
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)
  const [modalActive, setModalActive] = useState(null)
  const [country_detected, setCountryDetected] = useState()

  const setLanguage = (language) => {
    Translate.setLanguage(language)
    if (UserInfo.userInfo) {
      State.setUserStateField(language, 'language', UserInfo.userInfo.id)
    }
  }

  useEffect(() => {
    setCountryDetected(localStorage.getItem('country_detected'))
  }, [])

  useEffect(() => {
    if (!country_detected) {
      setModalActive(true)
    }
  }, [country_detected])


  return (
    <>
      <div className={Setting.app_theme === 'light' ? 'nav_bar_container' : 'nav_bar_container nav_bar_container_dark'}>
        <NotificationComponent />

        <div className='nav_bar_logo' onClick={() =>
          navigate(MAIN_ROUTE)}>logid</div>
        {/* <Item onClick={() =>
        navigate(MAIN_ROUTE)}>Главная</Item> */}
        {user.user.role === "customer" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(CUSTOMER_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'customers_office')}</div> :
          <></>
        }

        {user.user.role === "carrier" && user.isAuth ?
          <div className='nav_bar_item' onClick={() =>
            navigate(CARRIER_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'carriers_office')}</div> :
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
            }}>{SetNativeTranslate(Translate.language, {}, 'sign_out')}</div> :
          <div className='nav_bar_item' onClick={() =>
            navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language, {}, 'sign_in')}</div>
        }

        <span className="material-symbols-outlined nav_bar_theme_icon"
          onClick={() => {
            if (Setting.app_theme === 'dark') {
              Setting.setAppTheme('light')
              State.setUserStateField('light', 'app_theme', UserInfo.userInfo.id)
            } else {
              Setting.setAppTheme('dark')
              State.setUserStateField('dark', 'app_theme', UserInfo.userInfo.id)
            }
          }}
        >
          {Setting.app_theme === 'light' ? 'dark_mode' : 'light_mode'}
        </span>

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

        <div className='nav_bar_item'
          onClick={() => {
            if (!country_detected && !modalActive) {
              setModalActive(true)
            } else if (modalActive) {
              setModalActive(false)
            }
          }}>{Translate.language && SetNativeTranslate(Translate.language, {}, Adress.country.value)}</div>

      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}></Modal>
    </>

  )
})

export default NavBar
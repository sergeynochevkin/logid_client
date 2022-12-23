import React, { useContext } from 'react'
import { AdressContext, OrderContext, SettingContext, TranslateContext, UserContext, UserInfoContext } from '../../..';
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, CARRIER_ROUTE, CUSTOMER_ROUTE, ADMIN_ROUTE, MANAGER_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import NotificationComponent from '../../notification/NotificationComponent';
import { logout } from '../../../http/userAPI';

import './NavBar.css'
import dark_mode from '../../../assets/dark_mode.png';
import light_mode from '../../../assets/light_mode.png';
import country from '../../../assets/country.png';
import country_white from '../../../assets/country_white.png';
import { SetNativeTranslate } from '../../../modules/SetNativeTranslate';

const NavBar = observer(() => {
  const { user } = useContext(UserContext)
  const { order } = useContext(OrderContext)
  const navigate = useNavigate()
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)
  const { Adress } = useContext(AdressContext)


  return (

    <div className={Setting.app_theme === 'light' ? 'nav_bar_container' : 'nav_bar_container nav_bar_container_dark'}>
      <NotificationComponent />

      <div className='nav_bar_logo' onClick={() =>
        navigate(MAIN_ROUTE)}>logid</div>
      {/* <Item onClick={() =>
        navigate(MAIN_ROUTE)}>Главная</Item> */}
      {user.user.role === "customer" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(CUSTOMER_ROUTE)}>{SetNativeTranslate(Translate.language,{},'customers_office')}</div> :
        <></>
      }

      {user.user.role === "carrier" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(CARRIER_ROUTE)}>{SetNativeTranslate(Translate.language,{},'carriers_office')}</div> :
        <></>
      }

      {user.user.role === "manager" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(MANAGER_ROUTE)}>{SetNativeTranslate(Translate.language,{},'managers_office')}</div> :
        <></>
      }

      {user.user.role === "admin" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(ADMIN_ROUTE)}>{SetNativeTranslate(Translate.language,{},'administrators_office')}</div> :
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
          }}>{SetNativeTranslate(Translate.language,{},'sign_out')}</div> :
        <div className='nav_bar_item' onClick={() =>
          navigate(LOGIN_ROUTE)}>{SetNativeTranslate(Translate.language,{},'sign_in')}</div>
      }

      <img
        className='dark_mode_image'
        src={Setting.app_theme === 'light' ? dark_mode : light_mode}
        onClick={() => {
          if (Setting.app_theme === 'dark') {
            Setting.setAppTheme('light')
          } else {
            Setting.setAppTheme('dark')
          }
        }}
      />

      {/* language of my country + english if english is your language, no select, set language state when selec if isAuth */}
      <div className='nav_bar_item language_switch'
        onClick={() => {
          if (Translate.language === 'russian') {
            Translate.setLanguage('english')
          } else if (Translate.language === 'english' && Adress.country.value === 'russia') {
            Translate.setLanguage('russian')
          }
        }}

      >{Translate.language === 'russian' ? 'EN' : Translate.language === 'english' && Adress.country.value === 'russia' ? 'RU' : ''}</div>

      <div className='nav_bar_item' onClick={() => { }}>{Translate.language && SetNativeTranslate(Translate.language,{},Adress.country.value)}</div>
    </div>




  )
})

export default NavBar
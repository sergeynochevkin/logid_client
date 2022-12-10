import React, { useContext, useEffect } from 'react'
import { AdressContext, EquipmentTypeContext, OrderContext, SettingContext, StateContext, SubscriptionContext, TranslateContext, TransportTypeContext, UserContext, UserInfoContext } from '../../..';
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, CARRIER_ROUTE, CUSTOMER_ROUTE, ADMIN_ROUTE, MANAGER_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import NotificationComponent from '../../notification/NotificationComponent';
import { check, logout } from '../../../http/userAPI';
import { fetchUserInfo } from '../../../http/userInfoApi';
import { useFetching } from '../../../hooks/useFetching';
import { fetchDefaultData } from '../../../http/defaultDataApi';
import { fetchUserState } from '../../../http/stateApi';
import './NavBar.css'
import { SetTranslate } from '../../../modules/SetTranslate';
import dark_mode from '../../../assets/dark_mode.png';
import light_mode from '../../../assets/light_mode.png';

const NavBar = observer(() => {
  const { user } = useContext(UserContext)
  const { order } = useContext(OrderContext)
  const navigate = useNavigate()
  const { UserInfo } = useContext(UserInfoContext)
  const { Setting } = useContext(SettingContext)

  const { Subscription } = useContext(SubscriptionContext)
  const { State } = useContext(StateContext)
  const { Translate } = useContext(TranslateContext)
  const { TransportType } = useContext(TransportTypeContext)
  const { EquipmentType } = useContext(EquipmentTypeContext)
  const { Adress } = useContext(AdressContext)

  const [fetching, error] = useFetching(async () => {
    await fetchUserInfo(user.user.id).then(data => UserInfo.setUserInfo(data))
  })

  useEffect(() => {
    async function fetchData() {
      await fetchDefaultData().then(data => {
        Subscription.setPlans(data.subscripton_plans)
        Subscription.setOptions(data.subscripton_options)
        Subscription.setOptionsByPlans(data.subscripton_options_by_plans)
        // Translate.setTranslation(data.translation)
        TransportType.setTypes(data.transport_types)
        TransportType.setSideTypes(data.transport_side_types)
        TransportType.setLoadCapacities(data.transport_load_capacities)
        EquipmentType.setTypes(data.equipment_types)
        Adress.setCountries(data.countries)
      })
    }
    fetchData();
    UserInfo.setUserInfo({})
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      try {
        async function fetchData() {
          let data = await check()
          user.setUser(data)
          await fetching()
          user.setIsAuth(true)          
          await fetchUserState(UserInfo.userInfo.id).then(data => State.setUserState(JSON.parse(data.state)))
          if (user.user.role === "carrier") {            
            navigate(CARRIER_ROUTE)
          }
          if (user.user.role === "customer") {
            navigate(CUSTOMER_ROUTE)
          }
        }
        fetchData();
      } catch (e) {
        console.log(e.data.message);
      }
    }
  }, [])

  return (

    <div className={Setting.app_theme === 'light' ? 'nav_bar_container' : 'nav_bar_container nav_bar_container_dark'}>
      <NotificationComponent />

      <div className='nav_bar_logo' onClick={() =>
        navigate(MAIN_ROUTE)}>logid</div>
      {/* <Item onClick={() =>
        navigate(MAIN_ROUTE)}>Главная</Item> */}

      {user.user.role === "customer" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(CUSTOMER_ROUTE)}>{SetTranslate(Translate.language,'customers_office')}</div> :
        <></>
      }

      {user.user.role === "carrier" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(CARRIER_ROUTE)}>{SetTranslate(Translate.language,'carriers_office')}</div> :
        <></>
      }

      {user.user.role === "manager" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(MANAGER_ROUTE)}>{SetTranslate(Translate.language,'managers_office')}</div> :
        <></>
      }

      {user.user.role === "admin" && user.isAuth ?
        <div className='nav_bar_item' onClick={() =>
          navigate(ADMIN_ROUTE)}>{SetTranslate(Translate.language,'administrators_office')}</div> :
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
          }}>{SetTranslate(Translate.language,'sign_out')}</div> :
        <div className='nav_bar_item' onClick={() =>
          navigate(LOGIN_ROUTE)}>{SetTranslate(Translate.language,'sign_in')}</div>
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
      <div className='nav_bar_item language_switch'
        onClick={() => {
          if (Translate.language === 'russian') {
            Translate.setLanguage('english')
          } else {
            Translate.setLanguage('russian')
          }
        }}
      >{Translate.language === 'russian' ? 'EN' : 'RU'}</div>
    </div>

  )
})

export default NavBar
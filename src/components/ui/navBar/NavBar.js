import React, { useContext, useEffect } from 'react'
import styled from 'styled-components';
import { AdressContext, EquipmentTypeContext, OrderContext, StateContext, SubscriptionContext, TranslateContext, TransportTypeContext, UserContext, UserInfoContext } from '../../..';
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTE, CARRIER_ROUTE, CUSTOMER_ROUTE, ADMIN_ROUTE, MANAGER_ROUTE, LOGIN_ROUTE } from '../../../utils/consts';
import { observer } from 'mobx-react-lite';
import NotificationComponent from '../../notification/NotificationComponent';
import { check, logout } from '../../../http/userAPI';
import { fetchUserInfo } from '../../../http/userInfoApi';
import { useFetching } from '../../../hooks/useFetching';
import { fetchDefaultData } from '../../../http/defaultDataApi';
import { fetchUserState } from '../../../http/stateApi';

const Container = styled.div`
width:100%;
min-height:50px;
background-color:rgb(245, 245, 245, 0.8);
display:flex;
gap:10px;
align-items:center;
justify-content:center;
flex-wrap:wrap;
position:fixed;
`
const Logo = styled.div`
font-weight:bold;
padding-right:20px;
padding-left:20px;
cursor:pointer;
`
const Item = styled.div`
cursor:pointer;
text-align:center;
font-size:14px;
&:hover{
  color:grey;
}
`
const NavBar = observer(() => {
  const { user } = useContext(UserContext)
  const { order } = useContext(OrderContext)
  const navigate = useNavigate()
  const { UserInfo } = useContext(UserInfoContext)

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
        Translate.setTranslation(data.translation)
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

    <Container>
      <NotificationComponent />
      <Logo onClick={() =>
        navigate(MAIN_ROUTE)}>logid</Logo>
      {/* <Item onClick={() =>
        navigate(MAIN_ROUTE)}>Главная</Item> */}

      {user.user.role === "customer" && user.isAuth ?
        <Item onClick={() =>
          navigate(CUSTOMER_ROUTE)}>Кабинет заказчика</Item> :
        <></>
      }

      {user.user.role === "carrier" && user.isAuth ?
        <Item onClick={() =>
          navigate(CARRIER_ROUTE)}>Кабинет перевозчика</Item> :
        <></>
      }

      {user.user.role === "manager" && user.isAuth ?
        <Item onClick={() =>
          navigate(MANAGER_ROUTE)}>Кабинет менеджера</Item> :
        <></>
      }

      {user.user.role === "admin" && user.isAuth ?
        <Item onClick={() =>
          navigate(ADMIN_ROUTE)}>Кабинет администратора</Item> :
        <></>
      }

      {user.isAuth ?
        <Item onClick={
          async () => {
            await logout()
            order.setOrders([]);
            user.setIsAuth(false);
            user.setUser({});
            UserInfo.setUserInfo({})
            localStorage.clear()
          }}>Выйти</Item> :
        <Item onClick={() =>
          navigate(LOGIN_ROUTE)}>Войти</Item>
      }
    </Container>

  )
})

export default NavBar
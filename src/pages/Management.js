import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, SettingContext } from '..'
import { BookMark } from '../components/ui/button/BookMark'
import PageContainer from '../components/ui/page/PageContainer'
import Users from '../components/management/Users'
import Managers from '../components/management/Managers'
import Orders from '../components/management/Orders'
import Settings from '../components/management/Settings'
import Statistics from '../components/management/Statistics'
import Account from '../components/management/Account'

const Admin = observer(() => {
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Setting } = useContext(SettingContext)

  return (
    <PageContainer>
      <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
        <div className='scroll_content_container'>

          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_users')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_users' && 'grey',
          }}>Users</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('managers')
          }} style={{
            color: ComponentFunction.PageFunction === 'managers' && 'grey',
          }}>Managers</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_orders')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_orders' && 'grey',
          }}>Orders</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_statistics')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_statistics' && 'grey',
          }}>Statistics</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_settings')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_settings' && 'grey',
          }}>Settings</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_account')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_account' && 'grey',
          }}>Account</BookMark>

        </div>
      </div>

      {
        ComponentFunction.PageFunction === 'admin_users' ? <Users /> :
        ComponentFunction.PageFunction === 'managers' ? <Managers /> :
        ComponentFunction.PageFunction === 'admin_statistics' ? <Statistics /> :
        ComponentFunction.PageFunction === 'admin_settings' ? <Settings /> :
        ComponentFunction.PageFunction === 'admin_account' ? <Account /> :
        ComponentFunction.PageFunction === 'admin_orders' ? <Orders />         
         : <></>
      }

    </PageContainer>
  )
})

export default Admin
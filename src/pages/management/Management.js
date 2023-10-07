import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ComponentFunctionContext, SettingContext, TranslateContext } from '../..'
import { BookMark } from '../../components/ui/button/BookMark'
import Users from '../../components/management/users/Users'
import Managers from '../../components/management/Managers'
import Orders from '../../components/management/Orders'
import Settings from '../../components/management/Settings'
import Statistics from '../../components/management/Statistics'
import Account from '../../components/management/Account'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import ManagementTransportComponent from '../../components/management/transports/ManagementTransportComponent'
import './Management.css'

const Admin = observer(() => {
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { Setting } = useContext(SettingContext)
  const { Translate } = useContext(TranslateContext)

  return (
    <div className={`page_container ${Setting.app_theme}`}>
      <div className={Setting.app_theme === 'light' ? 'scroll_bar_container' : 'scroll_bar_container_dark'}>
        <div className='scroll_content_container'>

          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_users')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_users' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Пользователи'],
            english: ['Users']
          })}</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('managers')
          }} style={{
            color: ComponentFunction.PageFunction === 'managers' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Менеджеры'],
            english: ['Managers']
          })}</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_orders')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_orders' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Заказы'],
            english: ['Orders']
          })}</BookMark>

          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_transports')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_transports' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Транспорт'],
            english: ['Transports']
          })}</BookMark>

          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_statistics')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_statistics' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Статистика'],
            english: ['Statistics']
          })}</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_settings')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_settings' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Настройки'],
            english: ['Settings']
          })}</BookMark>
          <BookMark onClick={() => {
            ComponentFunction.setPageFunction('admin_account')
          }} style={{
            color: ComponentFunction.PageFunction === 'admin_account' && 'grey',
          }}>{SetNativeTranslate(Translate.language, {
            russian: ['Аккаунт'],
            english: ['Account']
          })}</BookMark>

        </div>
      </div>

      {
        ComponentFunction.PageFunction === 'admin_users' ? <Users /> :
          ComponentFunction.PageFunction === 'managers' ? <Managers /> :
            ComponentFunction.PageFunction === 'admin_statistics' ? <Statistics /> :
              ComponentFunction.PageFunction === 'admin_settings' ? <Settings /> :
                ComponentFunction.PageFunction === 'admin_account' ? <Account /> :
                  ComponentFunction.PageFunction === 'admin_orders' ? <Orders /> :
                    ComponentFunction.PageFunction === 'admin_transports' ? <ManagementTransportComponent />
                      : <></>
      }

    </div>
  )
})

export default Admin
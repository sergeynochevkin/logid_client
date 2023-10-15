import React, { useContext } from 'react'
import AdminConsoleItem from '../../pages/main/AdminConsoleItem'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { ManagementContext, SettingContext, TranslateContext } from '../..'
import { observer } from 'mobx-react-lite'
import '../../App.css'
import AnaliticsList from './Analitics/AnaliticsReport'


const Statistics = observer(() => {

  const { Management } = useContext(ManagementContext)
  const { Translate } = useContext(TranslateContext)
  const { Setting } = useContext(SettingContext)
  

  return (

    <div className={`page_container ${Setting.app_theme}`}>

      {!Management.statistics_component_function ?
        <div className={`admin_console_container ${Setting.app_theme}`}>

          {Management.visits.month > 0 ?
            <>
              <AdminConsoleItem plan={70} currentRate={Management.visits.toDay} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Визиты сегодня'],
                    english: ['Today visits']
                  }, '')} />
              <AdminConsoleItem plan={490} currentRate={Management.visits.week} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Визиты за неделю'],
                    english: ['Visits per week']
                  }, '')
              } />
              <AdminConsoleItem plan={2170} currentRate={Management.visits.month} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Визиты за месяц'],
                    english: ['Visits per month']
                  }, '')
              } />
            </> : <></>
          }

          {Management.registrations.month > 0 ?
            <>
              <AdminConsoleItem plan={5} currentRate={Management.registrations.toDay} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Регистрации сегодня'],
                    english: ['Today registrationss']
                  }, '')} />
              <AdminConsoleItem plan={35} currentRate={Management.registrations.week} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Регистрации за неделю'],
                    english: ['Registrationss per week']
                  }, '')
              } />
              <AdminConsoleItem plan={150} currentRate={Management.registrations.month} comment={
                SetNativeTranslate(Translate.language,
                  {
                    russian: ['Регистрации за месяц'],
                    english: ['Registrationss per month']
                  }, '')
              } />
            </> : <></>}


          <AdminConsoleItem plan={510} active={true} component_function={'user'} currentRate={Management.users.length} comment={
            SetNativeTranslate(Translate.language,
              {
                russian: ['Пользователи'],
                english: ['Users']
              }, '')} />
          <AdminConsoleItem active={true} component_function={'carrier'} plan={500} currentRate={Management.users.filter(el => el.role === 'carrier').length} comment={
            SetNativeTranslate(Translate.language,
              {
                russian: ['Перевозчики'],
                english: ['Carriers']
              }, '')
          } />
          <AdminConsoleItem active={true} component_function={'customer'} plan={10} currentRate={Management.users.filter(el => el.role === 'customer').length} comment={
            SetNativeTranslate(Translate.language,
              {
                russian: ['Заказчики'],
                english: ['Customers']
              }, '')
          } />
          <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.transports.length} currentRate={Management.transports.length} comment={
            SetNativeTranslate(Translate.language,
              {
                russian: ['Транспорт'],
                english: ['Transports']
              }, '')
          } />
          <AdminConsoleItem type={'value'} influence={'negative'} plan={Management.users.length} currentRate={Management.users.filter(el => Object.keys(el.user_info).length === 0).length} comment={
            SetNativeTranslate(Translate.language,
              {
                russian: ['Пользователи без профиля'],
                english: ['Users without info']
              }, '')
          } />
          <AdminConsoleItem type={'value'} influence={'negative'} plan={Management.users.filter(el => el.role === 'carrier').length} currentRate={Management.users.filter(el => el.role === 'carrier' && el.transports.length === 0).length} comment={SetNativeTranslate(Translate.language,
            {
              russian: ['Перевозчики без транспорта'],
              english: ['Carriers without transport']
            }, '')} />
          <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'new').length} currentRate={Management.orders.filter(el => el.order_status === 'new').length} comment={SetNativeTranslate(Translate.language,
            {
              russian: ['Новые заказы'],
              english: ['New orders']
            }, '')} />
          <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'inWork').length} currentRate={Management.orders.filter(el => el.order_status === 'inWork').length} comment={SetNativeTranslate(Translate.language,
            {
              russian: ['Заказы в работе'],
              english: ['In work orders']
            }, '')} />
          <AdminConsoleItem type={'value'} influence={'positive'} plan={Management.orders.filter(el => el.order_status === 'completed').length} currentRate={Management.orders.filter(el => el.order_status === 'completed').length} comment={SetNativeTranslate(Translate.language,
            {
              russian: ['Завершенные заказы'],
              english: ['Completed orders']
            }, '')} />
        </div> : Management.statistics_component_function === 'user' || Management.statistics_component_function === 'carrier' || Management.statistics_component_function === 'customer'  ? <AnaliticsList /> : <></>}

    </div>

  )
})

export default Statistics
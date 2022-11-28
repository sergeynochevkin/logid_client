import React from 'react'
import OrderList from '../components/order/OrderList'
import { Area50 } from '../components/ui/area/Area50'
import { PageContainer } from '../components/ui/page/PageContainer'

const Admin = () => {
  return (
    <PageContainer>
      <Area50></Area50>
      <OrderList></OrderList>
      <Area50></Area50>
    </PageContainer>
  )
}

export default Admin
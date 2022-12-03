import React, { useContext } from 'react'
import { ComponentFunctionContext, OrderContext, SettingContext, StateContext } from '../../..'
import './Card.css'
import { useColor } from '../../../hooks/useColor'
import '../../../hooks/useColor'

const CardContainer = ({ children, thisOrder, ...props }) => {
  const { Setting } = useContext(SettingContext)
  const { State } = useContext(StateContext)
  const { ComponentFunction } = useContext(ComponentFunctionContext)
  const { order } = useContext(OrderContext)

  const color = useColor(thisOrder.order_status)


  return (
    <div className={Setting.app_theme === 'light' ? 'card_container' : 'card_container card_container_dark'}
      style={{
        boxShadow: `0px 5px 10px 0px ${order.group.includes(thisOrder.id) ? 'grey' : color}`,
        minWidth: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '200px' : '',
        marginTop: ComponentFunction.OrdersComponentFunction === 'orderItem' ? '10px' : '',
        cursor: ComponentFunction.OrdersComponentFunction === 'orderItem' ? 'default' : 'pointer',
        backgroundColor: State.user_state.favorite_order_state && State.user_state.favorite_order_state.includes(thisOrder.id) ? 'rgb(255, 253, 231, 0.8)' : ''
      }}
      {...props}

    >{children}</div>
  )
}

export { CardContainer }
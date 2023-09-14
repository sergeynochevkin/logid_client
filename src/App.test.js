import { render, screen } from '@testing-library/react'
import App from './App'
import NavBar from './pages/nav/NavBar'
import OrderItem from './components/order/OrderItem'

test('First react test', () => {
 
  render(
    <OrderItem/>
  )
  const elem = screen.getByRole('button')
  expect(elem).toBeInTheDocument()
})
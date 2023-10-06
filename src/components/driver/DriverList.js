import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { DriverContext } from '../..'
import DriverItem from './DriverItem'
import './Driver.css'

const DriverList = observer(() => {
  const { Driver } = useContext(DriverContext)



  return (
    <div className='driver_list_container'>
      {Driver.drivers.map(driver => <DriverItem key={driver.id} driver={driver} />)}
    </div>
  )
})

export default DriverList
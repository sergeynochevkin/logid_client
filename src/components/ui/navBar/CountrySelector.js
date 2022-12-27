import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdressContext } from '../../..'

const CountrySelector = observer(() => {
  const { Adress } = useContext(AdressContext)

  return (
    <div>CountrySelector</div>
  )
})

export default CountrySelector
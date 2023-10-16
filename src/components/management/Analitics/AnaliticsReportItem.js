import React, { useContext } from 'react'
import '../../../App.css'
import { observer } from 'mobx-react-lite'
import { ManagementContext } from '../../..'


const AnaliticsReportItem = observer(({ oneItem }) => {
  const { Management } = useContext(ManagementContext)

  console.log(JSON.stringify(oneItem));

  return (
    <div className='row'>
      {Object.entries(oneItem).map((([k, v]) => <div>{k}: {v}</div>))}
    </div>
  )
})

export default AnaliticsReportItem
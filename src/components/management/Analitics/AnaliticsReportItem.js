import React from 'react'
import '../../../App.css'


const AnaliticsReportItem = ({ oneItem }) => {
  
  
  return (
    <div className='row'>
      <div>{oneItem.name}</div>
      <div>{oneItem.count}</div>
    </div>
  )
}

export default AnaliticsReportItem
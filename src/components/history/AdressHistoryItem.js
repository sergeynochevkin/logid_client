import React from 'react'
import './History.css'

const AdressHistoryItem = ({ setShowHistory, item, selectFromHistoryAction, setCustomInput }) => {
    return (
        <div className='adress_history_item'
            onClick={() => {
                selectFromHistoryAction(item)
                setShowHistory(false)
            }}
        >{item.value}</div>
    )
}

export default AdressHistoryItem
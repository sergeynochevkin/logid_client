import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdContext } from '../..'
import BoardItem from './BoardItem'

const BoardList = observer(() => {
  const { Ad } = useContext(AdContext)

  console.log(JSON.stringify(Ad.transports));

  return (
    <div className='board_items_container'>
      {Ad.transports.map(transport => <BoardItem key = {transport.id} transport={transport}/>)}
    </div>
  )
})

export default BoardList
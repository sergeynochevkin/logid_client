import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { AdContext } from '../..'
import BoardListItem from './BoardListItem'

const BoardList = observer(() => {
  const { Ad } = useContext(AdContext)

  return (
    <div className='board_items_container'>
      {Ad.transports.map(transport => <BoardListItem key = {transport.id} transport={transport}/>)}
    </div>
  )
})

export default BoardList
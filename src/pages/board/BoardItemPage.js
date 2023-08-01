import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AdContext } from '../..'
import BoardListItem from './BoardListItem'
import { observer } from 'mobx-react-lite'

const BoardItemPage = observer(() => {
    const { Ad } = useContext(AdContext)
    let { id } = useParams()
    const [transport, setTransport] = useState({})

    useEffect(() => {
        setTransport({ ...Ad.transports.find(el => el.id === parseInt(id)) })
    }, [])

    return (
        <>
            <div className='board_item_page_container'>
                <div className='board_item_ad_container'>
                    <div>{transport.id}</div>
                </div>
            </div>
        </>
    )
})

export default BoardItemPage
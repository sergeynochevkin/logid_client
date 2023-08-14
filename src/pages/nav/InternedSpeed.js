import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { LinkContext } from '../..'

const InternedSpeed = observer(() => {
    const { link } = useContext(LinkContext)

    return (
    <>
        <div className='internet_speed_container' style = {{backgroundColor:!link.internet ? 'grey' : link.internet_speed < 5 ? 'red' :  link.internet_speed < 20 ? 'orange' : 'green'  }}></div>
    </>
    )
})

export default InternedSpeed
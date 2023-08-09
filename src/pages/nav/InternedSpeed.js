import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { LinkContext } from '../..'

const InternedSpeed = observer(() => {
    const { Link } = useContext(LinkContext)

    return (
    <>
        <div className='internet_speed_container' style = {{backgroundColor:!Link.internet ? 'red' : Link.internet_speed < 5 ? 'yellow' :  Link.internet_speed < 20 ? 'orange' : 'green'  }}></div>
    </>
    )
})

export default InternedSpeed
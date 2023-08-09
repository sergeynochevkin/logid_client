import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { LinkContext } from '../..'

const InternedSpeed = observer(() => {
    const { Link } = useContext(LinkContext)

    return (
        <div className='internet_speed_container'>{Link.internet_speed}</div>
    )
})

export default InternedSpeed
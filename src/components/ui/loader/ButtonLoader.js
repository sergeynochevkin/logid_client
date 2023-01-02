import React from 'react'
import './Loader.css'

const ButtonLoader = ({ parent }) => {
    return (
        <div className={parent === 'button' ? 'loader_container' : 'loader_container card'}>
            <div className={parent === 'button' ? 'loader' : 'loader card'}></div>
        </div>
    )
}

export default ButtonLoader
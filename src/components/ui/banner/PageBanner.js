import React from 'react'
import './Banner.css'



const PageBanner = ({ children, ...props }) => {

    return (
        <div className='page_banner'>
            <div className='page_banner_slogan' {...props}>{children}</div>
        </div>
    )
}

export default PageBanner
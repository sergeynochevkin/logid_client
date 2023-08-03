import React, { useEffect, useState } from 'react'
import './Loader.css'

const PageLoader = () => {
    const [wait, setWait] = useState(true)

    const waitAction = () => {
        setTimeout(() => {
            setWait(false)
        }, 20000)
    }
    useEffect(() => {
        waitAction()
    }, [])

    let message = <>Something went wrong. Please clear your browser history and reopen the page. If this does not help, please let us know <a href="mailto:support@logid.app">support@logid.app</a></>

    return (
        <div className={'loader_container page'}>
            {wait ?
                <div className={'loader page'}></div> : <div className='page_loader_error_message'>{message}</div>}
        </div>
    )
}

export default PageLoader
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import ManagementActionMenu from './ManagementActionMenu'
import more from '../../../assets/icons/more.png'
import more_dark from '../../../assets/icons/more_dark.png'
import { SettingContext } from '../../..'
import useComponentVisible from '../../../hooks/useComponentVisible'

const ManagementActionMenuComponent = observer(({ formData, setFormData, initialValue, setModalActive, setActionIcons, setAction, actionIcons, item }) => {
    const { Setting } = useContext(SettingContext)
    const [actionMenuActive, setActionMenuActive] = useState(false)


    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setActionMenuActive(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='management_more_icon_container' ref={ref}>
                <img
                    onClick={(event) => {
                        event.stopPropagation()
                        if (actionMenuActive) {
                            setActionMenuActive(false)
                            setFormData(initialValue)
                            setIsComponentVisible(false)
                        }
                        if (!actionMenuActive) {
                            setActionMenuActive(true)
                            setFormData(initialValue)
                            // setFormData({ ...formData, members: [oneUser.id] })
                            setIsComponentVisible(true)
                        }
                    }}

                    className='management_more_icon' src={Setting.app_theme === 'light' ? more : more_dark} />
                {actionMenuActive && isComponentVisible ?
                    <ManagementActionMenu formData={formData} setFormData={setFormData} setModalActive={setModalActive} setActionMenuActive={setActionMenuActive} item={item}
                        setActionIcons={setActionIcons} setAction={setAction} actionIcons={actionIcons} 
                    /> : <></>
                }
            </div>
        </>
    )
})

export default ManagementActionMenuComponent
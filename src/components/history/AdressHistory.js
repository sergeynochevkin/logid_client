import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { SettingContext } from '../..'
import useComponentVisible from '../../hooks/useComponentVisible'
import AdressHistoryItem from './AdressHistoryItem'
import './History.css'

const AdressHistory = observer(({ showHistory, setShowHistory, selectFromHistoryAction, setCustomInput }) => {
    const { Setting } = useContext(SettingContext)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(() => {
        if (!isComponentVisible) {
            setShowHistory(false)
        }
    }, [isComponentVisible])

    return (
        <>
            <div className='adress_history_container'>

                {Setting.adress_history.length > 0 &&
                    <span className="material-symbols-outlined adress_history_icon"
                        onClick={() => {
                            if (showHistory) {
                                setShowHistory(false)
                                // setCustomInput(false)
                            }
                            if (!showHistory) {
                                setIsComponentVisible(true)
                                setShowHistory(true)
                                setCustomInput(true)
                            }
                        }}
                    >
                        history
                    </span>
                }
            </div>

            <div className='adress_history_list_container' ref={ref}>
                {isComponentVisible &&
                    <div className={`adress_history_list ${showHistory && 'active'}`}>
                        {/* <AdressHistoryItem /> */}
                        {Setting.adress_history.map(item => <AdressHistoryItem selectFromHistoryAction={selectFromHistoryAction} key={item.id} item={item} setShowHistory={setShowHistory} />)}
                    </div>
                }
            </div>

        </>

    )
})

export default AdressHistory
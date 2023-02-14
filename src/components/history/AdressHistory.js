import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { SettingContext } from '../..'
import useComponentVisible from '../../hooks/useComponentVisible'
import AdressHistoryItem from './AdressHistoryItem'
import './History.css'
import history from '../../assets/icons/history.png';
import history_dark from '../../assets/icons/history_dark.png';

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
                    <img src={Setting.app_theme === 'light' ? history : history_dark} className="adress_history_icon"
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
                    />                     
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
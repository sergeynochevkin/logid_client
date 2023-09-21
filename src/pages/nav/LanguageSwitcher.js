import React, { useContext, useEffect, useState } from 'react'
import { SettingContext, StateContext, TranslateContext, UserContext, UserInfoContext } from '../..';
import useComponentVisible from '../../hooks/useComponentVisible';

const LanguageSwitcher = () => {
    const { Translate } = useContext(TranslateContext)
    const { State } = useContext(StateContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { user } = useContext(UserContext)
    const { Setting } = useContext(SettingContext)

    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    const languageList = [
        { id: 1, name: 'RU', value: 'russian' },
        { id: 2, name: 'EN', value: 'english' },
        { id: 3, name: 'TR', value: 'turkish' },
        { id: 4, name: 'ES', value: 'spanish' },
        { id: 5, name: 'CN', value: 'сhinese' },
        { id: 6, name: 'HI', value: 'hindi' },
    ]
    useEffect(() => {
        !isComponentVisible && setVisible(false)
    }, [isComponentVisible])

    const [visible, setVisible] = useState(false);

    const setLanguage = (language) => {
        Translate.setLanguage(language)
        if (UserInfo.userInfo) {
            if (user && user.isAuth) {
                State.setUserStateField(language, 'language', UserInfo.userInfo.id)
            }
        }
    }
    return (
        <div className='language_switcher_anchor'>
            <div className={`language_switcher_container ${Setting.app_theme}`}>
                <div className='nav_bar_item language_switch active'
                    onClick={() => {

                        if (!visible) {
                            setVisible(true)
                            setIsComponentVisible(true)
                        } else {
                            setVisible(false)
                            setIsComponentVisible(false)
                        }
                        visible ? setVisible(false) : (setVisible(true))
                        !visible && setIsComponentVisible(true)
                    }}
                >{languageList.find(el => el.value === Translate.language).name}</div>

                {!user || (user && (user.user.role !== 'nmanager' && user.user.role !== 'admin')) ?
                    <div ref={ref}>
                        {visible && isComponentVisible ?
                            languageList.filter(el => el.value !== Translate.language).map(item => <div
                                onClick={() => {
                                    setLanguage(item.value)
                                    setVisible(false)
                                }}
                                className='nav_bar_item language_switch' key={item.id}>{item.name}</div>) : <></>}
                    </div>
                    : 
                    <div ref={ref}>
                        {visible && isComponentVisible ?
                            languageList.slice(0,2).filter(el => el.value !== Translate.language).map(item => <div
                                onClick={() => {
                                    setLanguage(item.value)
                                    setVisible(false)
                                }}
                                className='nav_bar_item language_switch' key={item.id}>{item.name}</div>) : <></>}
                    </div>
                }
            </div>

        </div>
    )
}

export default LanguageSwitcher
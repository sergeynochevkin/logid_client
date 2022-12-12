import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import styled from 'styled-components'
import { SettingContext, TranslateContext } from '../../..';
import image from '../../../assets/busNavi.jpg';
import image_dark from '../../../assets/busNavi_dark.jpg';
import { SetTranslate } from '../../../modules/SetTranslate';


const MainBanner = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className={'main_banner_container'}>
            <div className={'main_nbanner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ? 'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetTranslate( 'main_slogan')}</div>
            </div>
            <div className={'main_nbanner_half_2_container'}>
            <img className='main_banner_image' src={Setting.app_theme === 'light' ? image : image_dark}></img>
            </div>
        </div>
    )
})

export default MainBanner
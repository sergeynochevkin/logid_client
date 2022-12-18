import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { SettingContext, TranslateContext } from '../..';
import image from '../../assets/logistics.jpg';
import { SetTranslate } from '../../modules/SetTranslate';
import BannerActionContent from './BannerActionContent';


const MainBanner = observer(() => {
    const { Setting } = useContext(SettingContext)

    return (
        <div className={'main_banner_container'} style={{ backgroundImage: `url(${image})`, width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: 'center' }}>
            <div className={'main_nbanner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ? 'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetTranslate('main_slogan')}</div>
            </div>
            <div className={Setting.app_theme === 'light' ? 'main_nbanner_half_2_container' : 'main_nbanner_half_2_container dark'}>
                <BannerActionContent />
            </div>
        </div>
    )
})

export default MainBanner
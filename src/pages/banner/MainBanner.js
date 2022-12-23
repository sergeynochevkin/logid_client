import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { SettingContext, TranslateContext } from '../..';
import image from '../../assets/logistics.jpg';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import BannerActionContent from './BannerActionContent';


const MainBanner = observer(() => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div className={'main_banner_container'} style={{ backgroundImage: `url(${image})`, width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: 'center' }}>
            <div className={'main_banner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ? 'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetNativeTranslate(Translate.language, {}, 'main_slogan')}</div>
            </div>
            <div className={Setting.app_theme === 'light' ? 'main_banner_half_2_container' : 'main_banner_half_2_container dark'}>
                <BannerActionContent />
            </div>
        </div>
    )
})

export default MainBanner
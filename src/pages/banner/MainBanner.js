import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { SettingContext, TranslateContext } from '../..';
import logistics from '../../assets/logistics.jpg';
import courier from '../../assets/courier.jpg';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import BannerActionContent from './BannerActionContent';

const MainBanner = observer(({ callRequested, setCallRequested }) => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)

    const queryParams = new URLSearchParams(window.location.search)
    const target = queryParams.get("target")

    return (
        <div className={'main_banner_container'} style={{ backgroundImage: `url(${target !== 'courier' ? logistics : courier})`, width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: 'center' }}>
            <div className={'main_banner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ? 'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetNativeTranslate(Translate.language, {}, 'main_slogan')}</div>
            </div>
            <div className={Setting.app_theme === 'light' ? 'main_banner_half_2_container' : 'main_banner_half_2_container dark'}>
                <BannerActionContent callRequested={callRequested} setCallRequested={setCallRequested} />
            </div>
        </div>
    )
})

export default MainBanner
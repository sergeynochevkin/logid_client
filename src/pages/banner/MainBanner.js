import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react'
import { ComponentFunctionContext, LinkContext, SettingContext, TranslateContext, UserContext } from '../..';
import logistics from '../../assets/logistics.webp';
import courier from '../../assets/courier.webp';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';
import BannerActionContent from './BannerActionContent';
import { Button } from '../../components/ui/button/Button';
import { AdButton } from '../../components/ui/button/AdButton';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../../utils/consts';
import Modal from '../../components/ui/modal/Modal';
import Auth from '../../components/auth/Auth';

const MainBanner = observer(({ callRequested, setCallRequested }) => {
    const { Setting } = useContext(SettingContext)
    const { Translate } = useContext(TranslateContext)
    const { link } = useContext(LinkContext)
    const { user } = useContext(UserContext)
    const { ComponentFunction } = useContext(ComponentFunctionContext)
    const navigate = useNavigate()
    const [modalActive1, setModalActive1] = useState(false)




    const queryParams = new URLSearchParams(window.location.search)
    const target = queryParams.get("target")
    const role = queryParams.get("role")


    const addAdAction = () => {
        link.setAfterActions(true, 'add_transport_form')
        if (user.isAuth) {
            ComponentFunction.setPageFunction('transport')
            navigate(USER_ROUTE)
        } else {
            setModalActive1(true)
        }
    }


    return (
        <div className={'main_banner_container'} style={{ backgroundImage: `url(${target !== 'courier' ? logistics : courier})`, width: '100%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: 'center' }}>
            <div className={'main_banner_half_1_container'}>
                <div className={Setting.app_theme === 'light' ? 'main_banner_slogan' : 'main_banner_slogan main_banner_slogan_dark'}>{SetNativeTranslate(Translate.language, {}, 'main_slogan')}</div>
            </div>


            {/* {role === 'customer' &&
                <AdButton>Добавить заказ</AdButton>
            } */}
            {role === 'carrier' &&
                <AdButton
                    onClick={() => {
                        addAdAction()
                    }}
                >
                    {SetNativeTranslate(Translate.language, {
                            russian: ['Добавить транспорт'],
                            english: ['Add transport'],
                            spanish: ['Añadir transporte'],
                            turkish: ['Taşıma ekle'],
                            сhinese: ['添加交通工具'],
                            hindi: ['परिवहन जोड़ें'],

                        })}
                </AdButton>
            }


            <div className={Setting.app_theme === 'light' ? 'main_banner_half_2_container' : 'main_banner_half_2_container dark'}>

                <BannerActionContent callRequested={callRequested} setCallRequested={setCallRequested} />
            </div>

            <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
                <Auth modalActive={modalActive1} setModalActive={setModalActive1} after_action={{ action: 'add_ad' }} />
            </Modal>

        </div>
    )
})

export default MainBanner
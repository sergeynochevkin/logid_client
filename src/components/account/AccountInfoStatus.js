import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { TranslateContext, UserContext, UserInfoContext } from '../..'
import { setColor } from '../../modules/setColor'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { Button } from '../ui/button/Button'
import Modal from '../ui/modal/Modal'
import AccountCompletionForm from './AccountCompletionForm'

const AccountInfoStatus = observer(({ containerClassName }) => {

    const { user } = useContext(UserContext)
    const { Translate } = useContext(TranslateContext)
    const { UserInfo } = useContext(UserInfoContext)
    const [modalActive, setModalActive] = useState(false)


    return (
        <div
            className={containerClassName}
            style={{ boxShadow: `0px 5px 10px 0 ${setColor(`not_activated`)}` }}
        >
            <div
                className='account_info_status_content_container'
            >
                {user.user.role === 'customer'
                    ? SetNativeTranslate(Translate.language,
                        {
                            russian: ['Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность отправлять заказы'],
                            english: ['The safety of all service participants is important to us, please fill out the profile to be able to send orders'],
                            spanish: ['La seguridad de todos los participantes del servicio es importante para nosotros, complete el perfil para poder enviar pedidos'],
                            turkish: ['Tüm hizmet katılımcılarının güvenliği bizim için önemlidir, sipariş gönderebilmek için lütfen profili doldurun'],
                            сhinese: ['所有服务参与者的安全对我们很重要，请填写个人资料以便能够发送订单'],
                            hindi: ['सभी सेवा प्रतिभागियों की सुरक्षा हमारे लिए महत्वपूर्ण है, ऑर्डर भेजने में सक्षम होने के लिए कृपया प्रोफ़ाइल भरें'],
                        }
                        , '') :
                    user.user.role === 'carrier' || user.user.role === 'driver' ?
                        SetNativeTranslate(Translate.language,
                            {
                                russian: ['Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность брать в работу заказы и делать предложения по аукционам'],
                                english: ['The safety of all participants of the service is important to us, please fill out the profile in order to be able to take orders and make offers for auctions'],
                                spanish: ['La seguridad de todos los participantes del servicio es importante para nosotros, complete el perfil para poder recibir pedidos y realizar ofertas para subastas'],
                                turkish: ['Hizmete katılan tüm katılımcıların güvenliği bizim için önemlidir, sipariş alabilmek ve açık artırma teklifinde bulunabilmek için lütfen profili doldurun'],
                                сhinese: ['所有服务参与者的安全对我们都很重要，请填写个人资料，以便能够接受订单并提出拍卖报价'],
                                hindi: ['सेवा के सभी प्रतिभागियों की सुरक्षा हमारे लिए महत्वपूर्ण है, ऑर्डर लेने और नीलामी के लिए प्रस्ताव देने में सक्षम होने के लिए कृपया प्रोफ़ाइल भरें'],
                            }
                            , '') : ''
                }
                <Button
                    onClick={() => {
                        setModalActive(true)
                    }}
                >
                    {
                        SetNativeTranslate(Translate.language,
                            {
                                russian: ['Заполнить'],
                                english: ['Fill'],
                                spanish: ['Llenar'],
                                turkish: ['Doldurmak'],
                                сhinese:['充满'],
                                hindi:['भरना'],
                            }
                            , '')
                    }
                </Button>
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <AccountCompletionForm setModalActive={setModalActive} />
            </Modal>
        </div>
    )
})

export default AccountInfoStatus
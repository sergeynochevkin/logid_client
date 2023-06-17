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
            style={{ boxShadow: `0px 5px 10px 0px ${setColor(`${!UserInfo.userInfo.legal ? 'not_activated' : ''}`)}` }}
        >
            <div
                className='account_info_status_content_container'
            >
                {user.user.role === 'customer'
                    ? SetNativeTranslate(Translate.language,
                        {
                            russian: ['Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность отправлять заказы'],
                            english: ['The safety of all service participants is important to us, please fill out the profile to be able to send orders']
                        }
                        , '') :
                    user.user.role === 'carrier' ?
                        SetNativeTranslate(Translate.language,
                            {
                                russian: ['Для нас важна безопасность всех участников сервиса, пожалуйста заполните профиль, чтобы иметь возможность брать в работу заказы и делать предложения по аукционам'],
                                english: ['The safety of all participants of the service is important to us, please fill out the profile in order to be able to take orders and make offers for auctions']
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
                                english: ['Fill']
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
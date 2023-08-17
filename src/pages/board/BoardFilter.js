import React, { useContext, useState } from 'react'
import FilterAndSortSeparateSearchAndSort from '../../components/filterAndSort/FilterAndSortSeparateSearchAndSort'
import { Button } from '../../components/ui/button/Button'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'
import { ComponentFunctionContext, LinkContext, SettingContext, TranslateContext, UserContext } from '../..'
import board_add from '../../assets/icons/board_add.png';
import board_add_dark from '../../assets/icons/board_add_dark.png';
import useWindowDimensions from '../../hooks/useWindowDimensions'
import Modal from '../../components/ui/modal/Modal'
import Auth from '../../components/auth/Auth'
import { useNavigate } from 'react-router-dom'
import { USER_ROUTE } from '../../utils/consts'

const BoardFilter = observer(({ modalActive, setModalActive }) => {
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)
    const { user } = useContext(UserContext)
    const { link } = useContext(LinkContext)
    const [modalActive1, setModalActive1] = useState(false)
    const navigate = useNavigate()
    const { ComponentFunction } = useContext(ComponentFunctionContext)

    const { height, width } = useWindowDimensions();

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
        <>
            <Modal modalActive={modalActive1} setModalActive={setModalActive1}>
                <Auth modalActive={modalActive1} setModalActive={setModalActive1} after_action={{ action: 'add_ad' }} />
            </Modal>

            <div className='board_filter_container'>
                <FilterAndSortSeparateSearchAndSort parent={'board'} modalActive={modalActive} setModalActive={setModalActive} />

                {!user || !user.isAuth || user.user.role === 'carrier' ? <>
                    {width > 770 ?
                        <Button
                            onClick={() => {
                                addAdAction()
                            }}
                        >{SetNativeTranslate(Translate.language, {
                            russian: ['Добавить объявление'],
                            english: ['Add ad']
                        })}</Button> :
                        <img
                            onClick={() => {
                                addAdAction()
                            }}
                            alt={SetNativeTranslate(Translate.language, {
                                russian: ['Добавить объявление'],
                                english: ['Add ad']
                            })} className='board_add_ad_icon' src={Setting.app_theme === 'light' ? board_add : board_add_dark}></img>}
                </> : <></>}

            </div>
        </>
    )
})

export default BoardFilter
import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { DriverContext, TranslateContext, UserContext } from '../..'
import RatingView from '../rating/RatingView'
import { CardButton } from '../ui/button/CardButton'
import { CardColName } from '../ui/card/CardColName'
import CardColValue from '../ui/card/CardColValue'
import { CardRow } from '../ui/card/CardRow'
import { HorizontalContainer } from '../ui/page/HorizontalContainer'
import './Partner.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const DriverModalContent = observer(({ setModalActive, onePartnerInfo }) => {
    const { user } = useContext(UserContext)
    const { Translate } = useContext(TranslateContext)
    const {Driver} = useContext(DriverContext)
    const [images, setImages] = useState([])

    useEffect(() => {
        if (Driver.images.find(el => el.id === onePartnerInfo.id)) {
            setImages(Driver.images.find(el => el.id === onePartnerInfo.id).urlsArray)
        }
    }, [])

    return (
        <div
            className='partner_modal_content_container'
        >
            <div className='partner_view_container'>

            {images[0] &&
                    <div className='patner_avatar_container' style={{ backgroundImage: `url(${images[0]})`, backgroundPosition: 'center', backgroundSize: 'contain' }}>
                    </div>
                }


                <CardRow>
                    <CardColValue>{onePartnerInfo.id}</CardColValue>
                    <CardColName>
                        {onePartnerInfo.legal === 'person' ?
                            <>{onePartnerInfo.name_surname_fathersname}</>
                            :
                            <>{onePartnerInfo.company_name}</>
                        }
                    </CardColName>
                    <CardColValue>{onePartnerInfo.phone}</CardColValue>
                </CardRow>
                {onePartnerInfo.type_of_customer ?
                    <CardRow>
                        <CardColName>{SetNativeTranslate(Translate.language, {}, 'type_of_customer_content')}</CardColName><CardColValue>{SetNativeTranslate(Translate.language, {}, onePartnerInfo.type_of_customer)}</CardColValue>
                    </CardRow>
                    : <></>}
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'city_content')}</CardColName><CardColValue> {onePartnerInfo.city}</CardColValue>
                </CardRow>
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'adress_field_name')}</CardColName><CardColValue>{onePartnerInfo.company_adress}</CardColValue>
                </CardRow>

                {onePartnerInfo.legal === 'entity' || onePartnerInfo.legal === 'sole_trader' ?
                    <>
                        {onePartnerInfo.website ?
                            <CardRow>
                                <CardColName>{SetNativeTranslate(Translate.language, {}, 'website_field_name')}</CardColName><CardColValue>{onePartnerInfo.website}</CardColValue>
                            </CardRow>
                            : <></>}
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'company_inn_content')}</CardColName><CardColValue>{onePartnerInfo.company_inn}</CardColValue>
                        </CardRow>
                    </>
                    : <></>}
                {onePartnerInfo.legal === 'person' ?
                    <>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_number_content')}</CardColName><CardColValue>{onePartnerInfo.passport_number}</CardColValue>
                        </CardRow>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_date_of_issue_content')}</CardColName><CardColValue>{onePartnerInfo.passport_date_of_issue}</CardColValue>
                        </CardRow>
                        <CardRow>
                            <CardColName>{SetNativeTranslate(Translate.language, {}, 'passport_issued_by_content')}</CardColName><CardColValue>{onePartnerInfo.passport_issued_by}</CardColValue>
                        </CardRow>
                    </>
                    : <></>}
                <CardRow>
                    <CardColName>{SetNativeTranslate(Translate.language, {}, 'legal_partner_info')}</CardColName><CardColValue>{SetNativeTranslate(Translate.language, {}, onePartnerInfo.legal)}</CardColValue>
                </CardRow>
                <RatingView onePartnerInfo={onePartnerInfo} user={user} parent={'account'} />
                <HorizontalContainer>
                    <CardButton
                        onClick={() => {
                            setModalActive(false)
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'close')}</CardButton>
                </HorizontalContainer>
            </div>
        </div>
    )
})

export default DriverModalContent
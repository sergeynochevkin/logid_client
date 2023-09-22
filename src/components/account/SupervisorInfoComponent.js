import React from 'react'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { FieldName } from '../ui/page/FieldName'
import { useContext } from 'react'
import { TranslateContext, UserContext } from '../..'
import { observer } from 'mobx-react-lite'
import AccountItem from './AccountItem'
import { Button } from '../ui/button/Button'

const SupervisorInfoComponent = observer(({ ...props }) => {
    const { containerClassName } = props
    const { Translate } = useContext(TranslateContext)
    const { user } = useContext(UserContext)

    return (
        <div className={containerClassName}>
            <FieldName>{SetNativeTranslate(Translate.language, {
                russian: ['Ваш автопарк'],
                english: ['Your fleet'],
                spanish: ['Tu flota'],
                turkish: ['Filonuz'],
                сhinese: ['您的舰队'],
                hindi: ['आपका बेड़ा'],
            }, '')}</FieldName>

            <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'transport_tag_field_name')} fieldValue={user.supervisor.legal === 'person' ? user.supervisor.name_surname_fathersname : user.supervisor.company_name} editable={false} />
            <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'phone')} fieldValue={user.supervisor.phone} editable={false} />
            <AccountItem fieldName={SetNativeTranslate(Translate.language, {}, 'email')} fieldValue={user.supervisor.email} editable={false} />
            <div className='driver_account_supervisor_buttons_container'>
                {/* <Button>{SetNativeTranslate(Translate.language, {
                russian: ['Изменить'],
                english: ['Change'],
                spanish: ['Cambiar'],
                turkish: ['Değiştirmek'],
                сhinese: ['改变'],
                hindi: ['परिवर्तन'],
            }, '')}</Button>
                <Button>{SetNativeTranslate(Translate.language, {
                russian: ['Отключиться'],
                english: ['Disconnect'],
                spanish: ['Desconectar'],
                turkish: ['Bağlantıyı kes'],
                сhinese: ['断开'],
                hindi: ['डिस्कनेक्ट'],
            }, '')}</Button> */}
            </div>
        </div>
    )
})

export default SupervisorInfoComponent
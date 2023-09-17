import React, { useContext } from 'react'
import { VerticalContainer } from '../ui/page/VerticalContainer'
import { Select } from '../ui/form/Select'
import { FieldName } from '../ui/page/FieldName'
import { DriverContext, TranslateContext, UserInfoContext } from '../..'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'
import { observer } from 'mobx-react-lite'

const DriverSelector = ({ formData, setFormData }) => {

    const { UserInfo } = useContext(UserInfoContext)
    const { Driver } = useContext(DriverContext)
    const { Translate } = useContext(TranslateContext)

    return (
        <div>

            <VerticalContainer
                style={{ gap: '0px' }}
            >
                <Select
                    value={formData.driver_id.value}
                    onChange={(e) => formData.driver_id.onChange(e)}
                    onBlur={e => formData.driver_id.onBlur(e)}
                    style={{ borderLeft: (formData.driver_id.isEmpty) ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    name="driver_id" id="driver_id"
                >
                    <option defaultValue hidden>{SetNativeTranslate(Translate.language, {
                        russian: ['Выберите водителя'],
                        english: ['Select driver'],
                        spanish: ['Seleccionar conductor'],
                        turkish: ['Sürücüyü seçin'],
                        сhinese: ['选择驱动程序'],
                        hindi: ['ड्राइवर का चयन करें'],

                    })}</option>
                    <option value={UserInfo.userInfo.userId}>{SetNativeTranslate(Translate.language, {
                        russian: ['Я'],
                        english: ['I am'],
                        spanish: ['I'],
                        turkish: ['Ben'],
                        сhinese: ['我是'],
                        hindi: ['मैं हूँ'],

                    })}</option>
                    {Driver.drivers.map(driver =>
                        <option value={driver.id} key={driver.id}>{driver.user_info.name_surname_fathersname}</option>
                    )}
                </Select>
                <FieldName
                    style={{
                        fontWeight: 'normal',
                        color: 'rgb(254, 111, 103,0.8)'
                    }}>
                    {(formData.driver_id.isEmpty && formData.driver_id.isDirty) ?
                        SetNativeTranslate(Translate.language, {
                            russian: ['Выберите водителя'],
                            english: ['Select driver'],
                            spanish: ['Seleccionar conductor'],
                            turkish: ['Sürücüyü seçin'],
                            сhinese: ['选择驱动程序'],
                            hindi: ['ड्राइवर का चयन करें'],
                        }) :
                        ''
                    }
                </FieldName>
            </VerticalContainer>

        </div>
    )
}

export default DriverSelector
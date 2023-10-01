import React, { useContext, useState } from 'react'
import DragDropUpload from '../dragDropUpload/DragDropUpload'
import { CardButton } from '../ui/button/CardButton'
import { v4 } from "uuid";
import { observer } from 'mobx-react-lite';
import { FetcherContext, NotificationContext, TranslateContext, UserInfoContext } from '../..';
import { uploadFiles } from '../../http/fileApi';
import { SetNativeTranslate } from '../../modules/SetNativeTranslate';


const AvatarModalContent = observer(({ files, pairs, setFiles, setPairs, formReset, setModalActive, option }) => {
    const { Translate } = useContext(TranslateContext)
    const { Notification } = useContext(NotificationContext)
    const { UserInfo } = useContext(UserInfoContext)
    const { fetcher } = useContext(FetcherContext)

    let dataTransfer = new DataTransfer();
    let fileList


    const dataInit = (files) => {
        files.forEach(file => {
            dataTransfer.items.add(file)
        })

        fileList = dataTransfer.files
    }

    const click = async (event) => {
        event.preventDefault()
        try {
            dataInit(files)

            await uploadFiles('avatar', UserInfo.userInfo.id, Translate.language, option, fileList).then(
                Notification.addNotification([{
                    id: v4(), type: 'success', message: SetNativeTranslate(Translate.language,
                        {
                            russian: ['Вы обновили фотографию в профиле'],
                            english: ['You updated your profile photo'],
                            spanish: ['Actualizaste tu foto de perfil'],
                            turkish: ['Profil fotoğrafınızı güncellediniz'],
                            сhinese: ['您更新了您的个人资料照片'],
                            hindi: ['आपने अपना प्रोफ़ाइल फ़ोटो अपडेट किया'],
                        })
                }])
            )
            formReset()
            fetcher.setUserInfo(true)
            setModalActive(false)

        } catch (e) {
            Notification.addNotification([{ id: v4(), type: 'error', message: e.response.data.message }])
        }
    }






    return (
        <div className='av_modal_conteiner'>
            <DragDropUpload
                // formData={formData} 
                // setFormData={setFormData}
                // filesFormData={filesFormData}
                files={files} pairs={pairs} setFiles={setFiles} setPairs={setPairs} min_length={1} length={1} extensions={['jpeg', 'png', 'jpg']} parent={'avatarForm'} />
            <CardButton disabled={files.length === 0} onClick={click}>{SetNativeTranslate(Translate.language,{}, 'send')}</CardButton>
        </div>
    )
})

export default AvatarModalContent
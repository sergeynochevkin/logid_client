import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { v4 } from "uuid";
import { NotificationContext, SettingContext, TranslateContext } from '../..';

import './DragDropUpload.css'
import { SetNativeTranslate } from '../../modules/SetNativeTranslate'

const DragDropUpload = observer(({ parent, length, extensions, filesFormData, files, setFiles, min_length, pairs, setPairs }) => {
    const { Notification } = useContext(NotificationContext)
    const { Translate } = useContext(TranslateContext)
    const { Setting } = useContext(SettingContext)
    const [drag, setDrag] = useState(false)

    const [errors, setErrors] = useState(
        {
            quantity: false,
            min_quantity: min_length === 0 ? false : true,
            type: false
        }
    )

    function getExtension(filename) {
        return filename.split('.').pop()
    }

    let notValidFiles = []
    let newFiles = []
    let doubleFiles = []


    // + compression + check limits when order or transport editing
    function validateFiles(allNewFiles, files, length) {
        allNewFiles.forEach(file => {
            let fileExtention = getExtension(file.name).toLowerCase()
            if (extensions.includes(fileExtention)) {
                if ([...newFiles, ...files].filter(el => el.name === file.name).length > 0) {
                    doubleFiles.push(file.name)
                } else
                    newFiles.push(file)
            }
            else {
                notValidFiles.push(file.name)
            }
        })
        if ((newFiles.length + files.length) > length) {
            setErrors({ ...errors, quantity: true })
        }
        if (notValidFiles.length > 0 && (allNewFiles.length + files.length) <= length) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${notValidFiles.toString()} ${notValidFiles.length === 1 ? SetNativeTranslate(Translate.language, {}, 'invalid_file_format') : SetNativeTranslate(Translate.language, {}, 'invalid_files_format')}` }])
        }
        if (doubleFiles.length > 0 && (allNewFiles.length + files.length) <= length) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${doubleFiles.toString()} ${SetNativeTranslate(Translate.language, {}, 'already_there')}` }])
        }
    }

    function dragStartHandler(e) {
        e.preventDefault()
        let dragItems = e.dataTransfer.items
        if (dragItems.length + files.length > length) {
            setErrors({ ...errors, quantity: true })
        }
        else {
            setDrag(true)
        }
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setErrors({ ...errors, quantity: false })
        setDrag(false)
    }

    function onDropHandler(e) {
        e.preventDefault()
        let allNewFiles = [...e.dataTransfer.files]
        validateFiles(allNewFiles, files, length)
        allNewFiles = []
        if (errors.quantity === false) {
            setFiles([...files, ...newFiles])
            let newPairs = []
            newFiles.forEach(file => {
                let newPair = { file: file, url: URL.createObjectURL(file) }
                newPairs.push(newPair)
            })
            setPairs([...pairs, ...newPairs])
            setDrag(false)
        }
        setDrag(false)
        setErrors({ ...errors, quantity: false })
    }

    function selectFiles(e) {
        let allNewFiles = [...e.target.files]
        if (allNewFiles.length + files.length > length) {
            setErrors({ ...errors, quantity: true })
        }
        else {
            validateFiles(allNewFiles, files, length)
            allNewFiles = []
            setFiles([...files, ...newFiles])
            let newPairs = []
            newFiles.forEach(file => {
                let newPair = { file: file, url: URL.createObjectURL(file) }
                newPairs.push(newPair)
            })
            setPairs([...pairs, ...newPairs])
            setErrors({ ...errors, quantity: false })
        }
    }

    useEffect(() => {
        files.length >= min_length && setErrors({ ...errors, min_quantity: false })
        files.length < min_length && setErrors({ ...errors, min_quantity: true })
    }, [files])

    return (
        <div className={'dragCotainer'}>
            {drag === false ?
                <div className={Setting.app_theme === 'light' ? 'dragZone' : 'dragZone dragZone_dark'}
                    style={{ borderLeft: files.length < min_length ? ' solid 1px rgb(254, 111, 103,0.8)' : '' }}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    {parent === 'transportForm' ? SetNativeTranslate(Translate.language, {}, 'drag_drop_transport') : parent === 'driver_form' ? SetNativeTranslate(Translate.language, {
                        russian: ['Добавьте фотографию водителя'],
                        english: ['Add drivers foto']
                    }) : SetNativeTranslate(Translate.language, {}, 'drag_drop_order')}
                    <label className={pairs.length === length ? 'dragLabel error' : 'dragLabel'}>{SetNativeTranslate(Translate.language, {}, 'select')}
                        <input onChange={selectFiles} className={'dragInput'} multiple type='file' name='files[]' disabled={pairs.length === length}></input>
                    </label>
                </div> :
                <div className={'dragZone drop'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >{SetNativeTranslate(Translate.language, {}, 'drop_to_upload')}
                </div>}
            <div className={'errorMessage'}>
                {(errors.quantity === true) ?
                    `${SetNativeTranslate(Translate.language, {}, 'maximum')} ${length} ${SetNativeTranslate(Translate.language, {}, 'images')}` :
                    ''
                }
                {(errors.min_quantity === true && errors.quantity === false ) ?
                    `${SetNativeTranslate(Translate.language, {
                        russian: [`Загрузите хотя бы ${min_length} фотографию`],
                        english: [`Upload at least ${min_length} photo`]
                    })} ` :
                    ''
                }
            </div>
            <div className={'previewContainer'}>
                {pairs.map(pair => <div key={pair.url} className={'imageContainer'}>
                    <img
                        alt=''
                        style={{ width: '50px', height: 'auto' }}
                        src={pair.url}></img>
                    <div className={Setting.app_theme === 'light' ? 'deletePreview' : 'deletePreview_dark'}
                        onClick={() => {
                            // filesFormData.delete(pair.file.name)
                            setFiles(files.filter(el => el.name !== pair.file.name))
                            setPairs(pairs.filter(el => el.file.name !== pair.file.name))
                            if (files.length <= length) {
                                setErrors({ ...errors, quantity: false })
                            }
                        }}
                    >{SetNativeTranslate(Translate.language, {}, 'delete')}</div>
                </div>)}
            </div>
        </div>

    )
}
)

export default DragDropUpload
import React, { useContext, useState } from 'react'
import { v4 } from "uuid";
import { NotificationContext } from '../..';

import './DragDropUpload.css'

const DragDropUpload = ({ parent, length, extensions, filesFormData }) => {
    const { Notification } = useContext(NotificationContext)
    const [drag, setDrag] = useState(false)
    const [files, setFiles] = useState([])
    const [pairs, setPairs] = useState([])
    const [errors, setErrors] = useState(
        {
            quantity: false,
            type: false
        }
    )

    function getExtension(filename) {
        return filename.split('.').pop()
    }

    let notValidFiles = []
    let newFiles = []
    let doubleFiles = []


    // + сжатие
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
            Notification.addNotification([{ id: v4(), type: 'error', message: `${notValidFiles.toString()} недопустимый формат ${notValidFiles.length === 1 ? 'файла' : 'файлов'}` }])
        }
        if (doubleFiles.length > 0 && (allNewFiles.length + files.length) <= length) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${doubleFiles.toString()} уже есть` }])
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
                filesFormData.append('images', file, file.name)
            })
            filesFormData.append('path', '/somepath')
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
                filesFormData.append('images', file, file.name)
            })
            filesFormData.append('path', '/somepath')
            setPairs([...pairs, ...newPairs])
            setErrors({ ...errors, quantity: false })
        }
    }
    return (
        <div className={'dragCotainer'}>
            {drag === false ?
                <div className={'dragZone'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    {parent === 'transportForm' ? 'Перетащите сюда или выберите фотографии транспорта и экипировки' : 'Перетащите сюда или выберите фотографии груза или ориентиры на местности'}
                    <label className={pairs.length === length ? 'dragLabel error' : 'dragLabel'}>Выбрать
                        <input onChange={selectFiles} className={'dragInput'} multiple type='file' name='images' disabled={pairs.length === length}></input>
                    </label>
                </div> :
                <div className={'dragZone drop'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >Отпустите файлы для загрузки
                </div>}
            <div className={'errorMessage'}>
                {(errors.quantity === true) ?
                    `Максимум ${length} изображений` :
                    ''
                }
            </div>
            <div className={'previewContainer'}>
                {pairs.map(pair => <div key={pair.url} className={'imageContainer'}>
                    <img
                        alt=''
                        style={{ width: '50px', height: 'auto' }}
                        src={pair.url}></img>
                    <div className={'deletePreview'}
                        onClick={() => {
                            filesFormData.delete(pair.file.name)
                            setFiles(files.filter(el => el.name !== pair.file.name))
                            setPairs(pairs.filter(el => el.file.name !== pair.file.name))
                            if (files.length <= length) {
                                setErrors({ ...errors, quantity: false })
                            }
                        }}
                    >удалить</div>
                </div>)}
            </div>
        </div>

    )
}

export default DragDropUpload
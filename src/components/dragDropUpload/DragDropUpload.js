import React, { useContext, useState } from 'react'
import { v4 } from "uuid";
import { NotificationContext, SettingContext } from '../..';
import { SetTranslate } from '../../modules/SetTranslate'
import './DragDropUpload.css'

const DragDropUpload = ({ parent, length, extensions, filesFormData }) => {
    const { Notification } = useContext(NotificationContext)
    const { Setting } = useContext(SettingContext)
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
            Notification.addNotification([{ id: v4(), type: 'error', message: `${notValidFiles.toString()} ${notValidFiles.length === 1 ? SetTranslate('invalid_file_format') : SetTranslate('invalid_files_format')}` }])
        }
        if (doubleFiles.length > 0 && (allNewFiles.length + files.length) <= length) {
            Notification.addNotification([{ id: v4(), type: 'error', message: `${doubleFiles.toString()} ${SetTranslate('already_there')}` }])
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
                <div className={Setting.app_theme === 'light' ? 'dragZone' : 'dragZone dragZone_dark'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >
                    {parent === 'transportForm' ? SetTranslate('drag_drop_transport') : SetTranslate('drag_drop_order')}
                    <label className={pairs.length === length ? 'dragLabel error' : 'dragLabel'}>{SetTranslate('select')}
                        <input onChange={selectFiles} className={'dragInput'} multiple type='file' name='images' disabled={pairs.length === length}></input>
                    </label>
                </div> :
                <div className={'dragZone drop'}
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    onDrop={e => onDropHandler(e)}
                >{SetTranslate('drop_to_upload')}
                </div>}
            <div className={'errorMessage'}>
                {(errors.quantity === true) ?
                    `${SetTranslate('maximum')} ${length} ${SetTranslate('images')}` :
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
                    >{SetTranslate('delete')}</div>
                </div>)}
            </div>
        </div>

    )
}

export default DragDropUpload
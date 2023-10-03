import React from 'react'
import '../../../App.css'
import { SettingContext } from '../../..'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import arrow_left from '../../../assets/icons/arrow_left.webp';
import arrow_left_dark from '../../../assets/icons/arrow_left_dark.webp';
import arrow_right from '../../../assets/icons/arrow_right.webp';
import arrow_right_dark from '../../../assets/icons/arrow_right_dark.webp';
import Modal from '../modal/Modal'



const Slider = observer(({ images }) => {
    const { Setting } = useContext(SettingContext)
    const [modalActive5, setModalActive5] = useState(false)


    const [image, setImage] = useState(images[0])
    const [image2, setImage2] = useState(images[0])

    const changeSlide = (action) => {
        let index
        if (action === 'forward') {
            if (image.id === images.length - 1) {
                index = 0
            } else {
                index = image.id + 1
            }
            setImage(images[index])
        }
        if (action === 'backward') {
            if (image.id === 0) {
                index = images.length - 1
            } else {
                index = image.id - 1
            }
        }
        setImage(images[index])
    }


    return (
        <>
            <div className='slider'>
                <img className='icon active'
                    onClick={() => {
                        changeSlide('backward')
                    }}
                    src={Setting.app_theme === 'light' ? arrow_left : arrow_left_dark} />

                <img src={require(`../../../assets/screenshots/${image.name}_${Setting.app_theme}.webp`)} className='slider_image' alt={image.alt} />
                <img className='icon active'
                    onClick={() => {
                        changeSlide('forward')
                    }}
                    src={Setting.app_theme === 'light' ? arrow_right : arrow_right_dark} />
            </div>           
        </>
    )
})

export default Slider
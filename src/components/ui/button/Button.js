import React from 'react'
import { useContext } from 'react'
import {  SettingContext } from '../../..';

const Button = ({ children, ...props }) => {

    const {Setting} = useContext(SettingContext)

    return (
        <button className={Setting.app_theme === 'light' ? 'custom_button' : 'custom_button_dark'} {...props}>{children}</button>
    )
}

export { Button }
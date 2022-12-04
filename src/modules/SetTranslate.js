import { useContext } from 'react'
import { SettingContext, TranslateContext } from '..'

export const SetTranslate = (value) => {
    const { Translate } = useContext(TranslateContext)

    if (value) {

        let translatedValue = Translate.translation.find(el => el.service === value)[Translate.language]

        if (translatedValue === '') {
            translatedValue = value
        }

        return translatedValue

    } else {
        return ''
    }

}
